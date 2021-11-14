const sql = require("./db.js");

// constructor
const Quiz = function(quiz) {
  this.id = quiz.id;
  this.question = quiz.question;
  this.true_answer = quiz.true_answer;
  this.wrong_answer1 = quiz.wrong_answer1;
  this.wrong_answer2 = quiz.wrong_answer2;
  this.wrong_answer3 = quiz.wrong_answer3;
};

Quiz.create = (newQuiz, result) => {
  sql.query("INSERT INTO quiz SET ?", newQuiz, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newQuiz });
  });
};

Quiz.update = (id, quiz, result) => {
  data = Object.keys(quiz).map(
    key => {
      if (quiz[key] != null) {
        return `${key}  = "${quiz[key]}"`;
      }
    }).filter(i => i);

  if (data.length > 0) {
    sql.query(`UPDATE quiz SET ${data.join(" ,")} WHERE id = ${id}`, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, result.affectedRows);
    });
  } else
    result('Fields to update dont match', null);
};

Quiz.findById = (quizId, result) => {
  sql.query(`SELECT * FROM quiz WHERE id = ${quizId}`, (err, res) => {
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

module.exports = Quiz;