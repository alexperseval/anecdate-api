const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cloudinary = require('cloudinary').v2

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

const routes = require('./routes/index.route');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes);

//set up api for the images
cloudinary.config({ 
    cloud_name: 'dxh0hktrw', 
    api_key: '788999128668244', 
    api_secret: 'EZ2FXKFJF4ew0C_aOeUVF82Lbng' 
  });

module.exports = {app};




