const sql = require("./db.js");

// constructor
const Anecdate = function (anecdate) {
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
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newAnecdate });
  });
};

Anecdate.update = (id, anecdate, result) => {
  data = Object.keys(anecdate).map(
    key => {
      if (anecdate[key] != null) {
        return `${key}  = "${anecdate[key]}"`;
      }
    }).filter(i => i);

  if (data.length > 0) {
    sql.query(`UPDATE anecdate SET ${data.join(" ,")} WHERE id = ${id}`, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res.affectedRows);
    });
  } else
    result('Fields to update dont match', null);
};

Anecdate.findById = (anecdateId, result) => {
  sql.query(`SELECT * FROM anecdate WHERE id = ${anecdateId}`, (err, res) => {
    if (err) {
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

Anecdate.findByDate = (date, result) => {
  sql.query(`SELECT * FROM anecdate WHERE DATE_FORMAT(date, "%m-%d") = DATE_FORMAT(?, "%m-%d")`, date, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Anecdate.getComments = (anecdateId, result) => {
  sql.query(`SELECT * FROM comment WHERE idAnecdate = ${anecdateId} ORDER BY date DESC`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Anecdate.getQuiz = (anecdateId, result) => {
  sql.query(`SELECT * FROM quiz WHERE id = (SELECT idQuiz FROM anecdate WHERE id = ${anecdateId} )`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
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

Anecdate.like = (anecdateId, result) => {
  sql.query(`UPDATE anecdate SET likes = likes + 1 WHERE id = ${anecdateId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Anecdate.dislike = (anecdateId, result) => {
  sql.query(`UPDATE anecdate SET dislikes = dislikes + 1 WHERE id = ${anecdateId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Anecdate.delete = (anecdateId, result) => {
  sql.query(`UPDATE anecdate SET status="inactive" WHERE id = ${anecdateId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Anecdate;