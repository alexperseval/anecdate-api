const Comment = require('../models/comment.model.js')
const moment = require('moment');

/*Fonction de création d'une categorie*/
exports.create = (req, res) => {

    // Create a Comment
    const comment = new Comment({
        status: "active",
        idAuthor: req.body['idAuthor'],
        message: req.body['message'],
        date: moment().format("YYYY-MM-DD"),
        idAnecdate: req.body['idAnecdate']
    });

    // Save Comment in the database
    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment."
            });
        else
            res.send(data);
    });
};

/*Fonction de modification d'un comment en fonction de son ID*/
exports.update = (req, res) => {
    const comment = new Comment({
        status: req.body['status'],
        idAuthor: req.body['idAuthor'],
        message: req.body['message'],
        date: req.body['date'],
        idAnecdate: req.body['idAnecdate']
    });
    Comment.update(req.params.commentId, comment, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating Comment with id " + req.params.commentId
            });
        } else res.send(data);
    });

};

/*Fonction de récupération d'un comment en fonction de son ID*/
exports.findOne = (req, res) => {
    Comment.findById(req.params.commentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Comment with id ${req.params.commentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Comment with id " + req.params.commentId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de récupération de toutes les comments*/
exports.findAll = (req, res) => {
    Comment.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};

/*Fonction de suppression d'un comment*/
exports.delete = (req, res) => {
    Comment.delete(req.params.commentId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comment with id " + req.params.commentId
            });
        else res.sendStatus(200);
    });
};