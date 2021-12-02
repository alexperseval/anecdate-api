const User = require('../models/user.model.js')
var jwt = require('jsonwebtoken');
const config = require('../config')

exports.login = (req, result) => {
    let username = req.body["username"];
    let password = req.body["password"];

    if (username && password) {
        User.connect(username, password, (err,res) => {
            if(err) {
                result.status(403).json({
                    success: false,
                    message: err
                });
            }
            else if (res) {
                let token = jwt.sign({ username: username },
                    config.secret,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                result.send({
                    success: true,
                    message: 'Authentication successful!',
                    token: token,
                    id: res
                });
            } else {
                result.status(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        });
    } else {
        result.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }

}