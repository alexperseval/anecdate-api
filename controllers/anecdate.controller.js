const Anecdate = require('../models/anecdate.model.js')
const moment = require('moment')

/*Fonction de création d'une anecdote*/
exports.create = (req, res) => {

    // Create a Anecdate
    const anecdate = new Anecdate({
        status: req.body['status'],
        title: req.body['title'],
        date: req.body['date'],
        idCategory: req.body['idCategory'],
        description: req.body['description'],
        sources: req.body['sources'],
        idQuiz: 0,
        creation_date: moment().format("YYYY-MM-DD"),
        likes: 0,
        dislikes: 0,
        idAuthor: req.body['idAuthor'],
        image: req.body['image']
    });

    // Save Anecdate in the database
    Anecdate.create(anecdate, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Anecdate."
            });
        else res.send(data);
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