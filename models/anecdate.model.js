const sql = require("./db.js");

// constructor
const Anecdate = function(anecdate) {
  this.status = anecdate.status;
  this.title = anecdate.title;
  this.date = anecdate.date;
  this.idCategory = anecdate.idCategory;
  this.description = anecdate.description;
  this.sources = anecdate.sources;
  this.idQuiz = anecdate.idQuiz;
  this.creation_date = anecdate.creation_date;
  this.likes = anecdate.likes;
  this.dislikes = anecdate.dislikes;
  this.idAuthor = anecdate.idAuthor;
  this.image = anecdate.image;
};

Anecdate.create = (newAnecdate, result) => {
  sql.query("INSERT INTO anecdate SET ?", newAnecdate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newAnecdate });
  });
};

Anecdate.findById = (anecdateId, result) => {
  sql.query(`SELECT * FROM anecdate WHERE id = ${anecdateId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Anecdate.getAll = result => {
  sql.query("SELECT * FROM anecdate", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Anecdate;