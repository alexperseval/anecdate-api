const sql = require("./db.js");

// constructor
const Category = function(category) {
  this.name = category.name;
  this.creation_date = category.creation_date;
  this.status = category.status;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.update = (id, category, result) => {
  data = Object.keys(category).map(
    key => {
      if (category[key] != null) {
        return `${key}  = "${category[key]}"`;
      }
    }).filter(i => i);

  if (data.length > 0) {
    sql.query(`UPDATE category SET ${data.join(" ,")} WHERE id = ${id}`, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, result.affectedRows);
    });
  } else
    result('Fields to update dont match', null);
};

Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM category WHERE id = ${categoryId}`, (err, res) => {
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

Category.getAll = result => {
  sql.query("SELECT * FROM category", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Category;