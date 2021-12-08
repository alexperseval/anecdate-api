const Anecdate = require('../models/anecdate.model.js');
const moment = require('moment');
const Quiz = require('../models/quiz.model.js');
var cloudinary = require('cloudinary').v2;
var fs = require('fs');

function sendImage(id, path) {
    cloudinary.uploader.upload(path + "", function (error, result) {
        if (error) {
            return error;
        } else {
            /*Suppression de l'image locale*/
            fs.stat(path, function (err, stats) {
                if (err) {
                    console.error(err);
                }

                fs.unlink(path, function (err) {
                    //if (err) return console.log(err);
                    //console.log('file deleted successfully');
                });
            });

            // Modification de l'URL de l'image dans la db
            const anecdate = new Anecdate({
                image: result.url
            });

            Anecdate.update(id, anecdate, err => {
                return err ? err : null
            });
        }
    });
}

/*Fonction de création d'une anecdote*/
exports.create = (req, res) => {
    var idGenerated;
    var error;
    //Traitement de l'image
    if (!req.file) {
        res.status(500).send({
            message: "Some error occurred whith the image."
        });
        return;
    }

    // Create a Anecdate
    const anecdate = new Anecdate({
        status: "waiting",
        title: req.body['title'],
        date: req.body['date'],
        idCategory: req.body['idCategory'],
        description: req.body['description'],
        sources: req.body['sources'],
        idQuiz: null,
        creation_date: moment().format("YYYY-MM-DD"),
        likes: 0,
        dislikes: 0,
        idAuthor: req.body['idAuthor'],
        image: "Uploadinq..."
    });

    // Save Anecdate in the database
    Anecdate.create(anecdate, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Anecdate."
            });
        else {
            idGenerated = data.id

            //Ajout du quiz si il y a les champs associés
            if (req.body['question'] != null && req.body['true_answer'] != null && req.body['wrong_answer1'] != null && req.body['wrong_answer2'] != null && req.body['wrong_answer3'] != null
                && req.body['question'] != "" && req.body['true_answer'] != "" && req.body['wrong_answer1'] != "" && req.body['wrong_answer2'] != "" && req.body['wrong_answer3'] != "") {
                const quiz = new Quiz({
                    id: idGenerated,
                    question: req.body['question'],
                    true_answer: req.body['true_answer'],
                    wrong_answer1: req.body['wrong_answer1'],
                    wrong_answer2: req.body['wrong_answer2'],
                    wrong_answer3: req.body['wrong_answer3'],
                })

                Quiz.create(quiz, (err, dataQuiz) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Anecdate quiz."
                        });

                    //Mise à jour de l'idQuiz de l'anecdate
                    data.idQuiz = idGenerated;
                    Anecdate.update(idGenerated, data, (err, data) => {
                        if (err) {
                            res.status(500).send({
                                message: "Error updating Anecdate with id " + id
                            });
                        }
                    });

                    error = sendImage(idGenerated, req.file.path);
                    if (error)
                        res.status(500).send({
                            message: error + " : Some error occurred whith the image."
                        });
                    res.send({ data, quizz: { ...dataQuiz } });
                });
            } else {
                error = sendImage(idGenerated, req.file.path);
                if (error)
                    res.status(500).send({
                        message: error + " : Some error occurred whith the image."
                    });
                res.send(data);
            }
        }
    });
};

/*Fonction de modification d'une anecdote en fonction de son ID*/
exports.update = (req, res) => {
    error = 0;

    if (req.body['question'] != null && req.body['true_answer'] && req.body['wrong_answer1'] && req.body['wrong_answer2'] && req.body['wrong_answer3']) {
        const quiz = new Quiz({
            question: req.body['question'],
            true_answer: req.body['true_answer'],
            wrong_answer1: req.body['wrong_answer1'],
            wrong_answer2: req.body['wrong_answer2'],
            wrong_answer3: req.body['wrong_answer3'],
        })
        Quiz.update(req.params.anecdateId, quiz, (err, data) => {
            if (err)
                error++;
        });
    }

    if (req.body['title'] != null && req.body['date'] != null && req.body['idCategory'] != null && req.body['description'] != null) {
        const anecdate = new Anecdate({
            status: req.body['status'],
            title: req.body['title'],
            date: req.body['date'],
            idCategory: req.body['idCategory'],
            description: req.body['description'],
            sources: req.body['sources'],
            likes: req.body['likes'],
            dislikes: req.body['dislikes'],
            idAuthor: req.body['idAuthor'],
            image: req.body['image']
        });
        Anecdate.update(req.params.anecdateId, anecdate, (err, data) => {
            if (err)
                error++;
        });
    }

    if (error > 0)
        res.status(500).send({
            message: "Error updating Anecdate with id " + req.params.anecdateId + " : " + err
        });
    else
        res.sendStatus(200);

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

/*Fonction de récupération du quiz d'une anecdate*/
exports.getQuiz = (req, res) => {
    Anecdate.getQuiz(req.params.anecdateId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdates."
            });
        else res.send(data);
    });
};

/*Fonction de like d'une anecdate*/
exports.like = (req, res) => {
    Anecdate.like(req.params.anecdateId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdate with id " + req.params.anecdateId
            });
        else res.sendStatus(200);
    });
};

/*Fonction de dislike d'une anecdate*/
exports.dislike = (req, res) => {
    Anecdate.dislike(req.params.anecdateId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdate with id " + req.params.anecdateId
            });
        else res.sendStatus(200);
    });
};

/*Fonction de unlike d'une anecdate*/
exports.unlike = (req, res) => {
    Anecdate.unlike(req.params.anecdateId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdate with id " + req.params.anecdateId
            });
        else res.sendStatus(200);
    });
};

/*Fonction de undislike d'une anecdate*/
exports.undislike = (req, res) => {
    Anecdate.undislike(req.params.anecdateId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdate with id " + req.params.anecdateId
            });
        else res.sendStatus(200);
    });
};

/*Fonction de suppression d'une anecdate*/
exports.delete = (req, res) => {
    Anecdate.delete(req.params.anecdateId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving anecdate with id " + req.params.anecdateId
            });
        else res.sendStatus(200);
    });
};