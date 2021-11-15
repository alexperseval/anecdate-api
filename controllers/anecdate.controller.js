const Anecdate = require('../models/anecdate.model.js')
const moment = require('moment');
const Quiz = require('../models/quiz.model.js');

/*Fonction de création d'une anecdote*/
exports.create = (req, res) => {

    // Create a Anecdate
    const anecdate = new Anecdate({
        status: req.query['status'],
        title: req.query['title'],
        date: req.query['date'],
        idCategory: req.query['idCategory'],
        description: req.query['description'],
        sources: req.query['sources'],
        idQuiz: null,
        creation_date: moment().format("YYYY-MM-DD"),
        likes: 0,
        dislikes: 0,
        idAuthor: req.query['idAuthor'],
        image: req.query['image']
    });

    // Save Anecdate in the database
    Anecdate.create(anecdate, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Anecdate."
            });
        else {
            //Ajout du quiz si il y a les champs associés
            if (req.query['question'] != null && req.query['true_answer'] != null && req.query['wrong_answer1'] != null && req.query['wrong_answer2'] != null && req.query['wrong_answer3'] != null) {

                const quiz = new Quiz({
                    id: data.id,
                    question: req.query['question'],
                    true_answer: req.query['true_answer'],
                    wrong_answer1: req.query['wrong_answer1'],
                    wrong_answer2: req.query['wrong_answer2'],
                    wrong_answer3: req.query['wrong_answer3'],
                })

                Quiz.create(quiz, (err, dataQuiz) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Anecdate quiz."
                        });
                    data.idQuiz = data.id;
                    Anecdate.update(data.id, data);
                    res.send({ data, quizz: { ...dataQuiz } });
                });
            } else
                res.send(data);
        }
    });
};

/*Fonction de modification d'une anecdote en fonction de son ID*/
exports.update = (req, res) => {
    const quiz = new Quiz({
        question: req.query['question'],
        true_answer: req.query['true_answer'],
        wrong_answer1: req.query['wrong_answer1'],
        wrong_answer2: req.query['wrong_answer2'],
        wrong_answer3: req.query['wrong_answer3'],
    })
    Quiz.update(req.params.anecdateId, quiz, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                message: "Error updating Anecdate with id " + req.params.anecdateId
            });
        }
    });

    const Anecdate = new Anecdate({
        status: req.query['status'],
        title: req.query['title'],
        date: req.query['date'],
        idCategory: req.query['idCategory'],
        description: req.query['description'],
        sources: req.query['sources'],
        likes: req.query['likes'],
        dislikes: req.query['dislikes'],
        idAuthor: req.query['idAuthor'],
        image: req.query['image']
    });
    Anecdate.update(req.params.anecdateId, anecdate, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                message: "Error updating Anecdate with id " + req.params.anecdateId
            });
        } else res.send(data);
    });
    
};

/*Fonction de récupération d'une anecdote en fonction de son ID*/
exports.findOne = (req, res) => {
    Anecdate.findById(req.params.anecdateId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Anecdate with id ${req.params.anecdateId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Anecdate with id " + req.params.anecdateId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de récupération de toutes les anecdotes*/
exports.findAll = (req, res) => {
    Anecdate.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdates."
            });
        else res.send(data);
    });
};

/*Fonction de récupération de toutes les anecdotes en fonction d'une date*/
exports.findByDate = (req, res) => {
    Anecdate.findByDate(req.params.date, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdates."
            });
        else res.send(data);
    });
};

/*Fonction de récupération de touts les commentaires d'une anecdate*/
exports.getComments = (req, res) => {
    Anecdate.getComments(req.params.anecdateId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdates."
            });
        else res.send(data);
    });
};