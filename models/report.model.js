const sql = require("./db.js");

// constructor
const Report = function(report) {
  this.idAuthor = report.idAuthor;
  this.idAnecdate = report.idAnecdate;
  this.object = report.object;
  this.comment = report.comment;
  this.status = report.status;
  this.date = report.date;
};

Report.create = (newReport, result) => {
  sql.query("INSERT INTO report SET ?", newReport, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newReport });
  });
};

Report.update = (id, report, result) => {
  data = Object.keys(report).map(
    key => {
      if (report[key] != null) {
        return `${key}  = "${report[key]}"`;
      }
    }).filter(i => i);

  if (data.length > 0) {
    sql.query(`UPDATE report SET ${data.join(" ,")} WHERE id = ${id}`, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, result.affectedRows);
    });
  } else
    result('Fields to update dont match', null);
};

Report.findById = (reportId, result) => {
  sql.query(`SELECT * FROM report WHERE id = ${reportId}`, (err, res) => {
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

Report.getAll = result => {
  sql.query("SELECT * FROM report", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Report;