let jwt = require('jsonwebtoken');
const config = require('../config.js');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if(token) {    
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    } else {
        return res.status(401).send({
            success: false,
            message: '"x-access-token" or "Authorization" fields missing in request header'
        });
    }
};

module.exports = {
    checkToken: checkToken
}