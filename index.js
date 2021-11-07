const express = require('express')
const app = express()

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

const routes = require('./routes/index.route');
app.use(routes);

module.exports = {app};




