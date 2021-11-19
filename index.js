const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cloudinary = require('cloudinary').v2
const config = require('./config')

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

const routes = require('./routes/index.route');

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




