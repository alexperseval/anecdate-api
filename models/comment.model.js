const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.status = comment.status;
  this.idAuthor = comment.idAuthor;
  this.message = comment.message;
  this.date = comment.date;
  this.idAnecdate = comment.idAnecdate;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newComment });
  });
};

Comment.update = (id, comment, result) => {
  data = Object.keys(comment).map(
    key => {
      if (comment[key] != null) {
        return `${key}  = "${comment[key]}"`;
      }
    }).filter(i => i);

  if (data.length > 0) {
    sql.query(`UPDATE comment SET ${data.join(" ,")} WHERE id = ${id}`, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, result.affectedRows);
    });
  } else
    result('Fields to update dont match', null);
};

Comment.findById = (commentId, result) => {
  sql.query(`SELECT * FROM comment WHERE id = ${commentId}`, (err, res) => {
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

Comment.getAll = result => {
  sql.query("SELECT * FROM comment", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Comment;