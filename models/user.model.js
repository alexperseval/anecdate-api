const sql = require("./db.js");

// constructor
const User = function (user) {
  this.role = user.role;
  this.status = user.status;
  this.pseudo = user.pseudo;
  this.mail = user.mail;
  this.password = user.password;
  this.creation_date = user.creation_date;
  this.mode_quiz = user.mode_quiz;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

User.update = (id, user, result) => {
  data = Object.keys(user).map(
    key => {
      if (user[key] != null) {
        return `${key}  = "${user[key]}"`;
      }
    }).filter(i => i);

  if (data.length > 0) {
    sql.query(`UPDATE user SET ${data.join(" ,")} WHERE id = ${id}`, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, result.affectedRows);
    });
  } else
    result('Fields to update dont match', null);
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
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

User.getAll = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

User.getComments = (userId, result) => {
  sql.query(`SELECT * FROM comment WHERE idAuthor = ${userId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

User.getAnecdates = (userId, result) => {
  sql.query(`SELECT * FROM anecdate WHERE idAuthor = ${userId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

User.getReports = (userId, result) => {
  sql.query(`SELECT * FROM report WHERE idAuthor = ${userId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

User.getCategories = (userId, result) => {
  sql.query(`SELECT idCategory FROM user_category WHERE idUser = ${userId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

User.delete = (userId, result) => {
  sql.query(`UPDATE user SET status="inactive" WHERE id = ${userId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

User.connect = (username, password, result) => {
  sql.query(`SELECT * FROM user WHERE (pseudo="${username}" OR mail="${username}") AND password="${password}"`, (err, res) => {
    if (res.length) {
      result(res[0].id);
      return;
    }

    result(null);
    return;

  });
}

module.exports = User;