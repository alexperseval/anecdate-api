const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

const routes = require('./routes/index.route');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes);

module.exports = {app};




