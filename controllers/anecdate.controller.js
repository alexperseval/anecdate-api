const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "anecdate-db"
});

/*Fonction de récupération de toutes les anecdotes*/
const getAll = function (req, res) {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM anecdate", function (err, result) {
            if (err) res.send("Data unavailable");
            console.log(result);
            res.send(result)
        });
    });
}


/*Fonction de récupération d'une anecdote selon son id*/
const get = function (req, res) {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM anecdate WHERE id = ?", [req.params._id], function (err, result) {
            if (err) res.send("Anecdate doesn't exist");
            console.log(result);
            res.send(result)
        });
    });
}


module.exports = {
    get,
    getAll
};