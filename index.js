const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cloudinary = require('cloudinary').v2
const config = require('./config')

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

const routes = require('./routes/index.route');

app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes);

//set up api for the images
cloudinary.config({ 
    cloud_name: config.cloud_name, 
    api_key: config.api_key, 
    api_secret: config.api_secret
  });

module.exports = {app};




