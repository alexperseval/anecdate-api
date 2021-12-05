const User = require('../models/user.model.js')
const moment = require('moment');

/*Fonction de création d'une categorie*/
exports.create = (req, res) => {

    // Create a User
    const user = new User({
        role: 2,
        status: "active",
        pseudo: req.body['pseudo'],
        mail: req.body['mail'],
        password: req.body['password'],
        creation_date: moment().format("YYYY-MM-DD"),
        mode_quiz: req.body['mode_quiz']
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else
            res.send(data);
    });
};

/*Fonction de modification d'un user en fonction de son ID*/
exports.update = (req, res) => {
    const user = new User({
        role: req.body['role'],
        status: req.body['status'],
        pseudo: req.body['pseudo'],
        mail: req.body['mail'],
        password: req.body['password'],
        creation_date: req.body['creation_date'],
        mode_quiz: req.body['mode_quiz']
    });
    User.update(req.params.userId, user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating User with id " + req.params.userId
            });
        } else res.sendStatus(200);
    });

};

/*Fonction de récupération d'un user en fonction de son ID*/
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de récupération de toutes les user*/
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

/*Fonction de récupération des commentaires d'un user*/
exports.getComments = (req, res) => {
    User.getComments(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de récupération des anecdates d'un user*/
exports.getAnecdates = (req, res) => {
    User.getAnecdates(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de récupération des reports d'un user*/
exports.getReports = (req, res) => {
    User.getReports(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de récupération des categories d'un user*/
exports.getCategories = (req, res) => {
    User.getCategories(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de suppression d'un user*/
exports.delete = (req, res) => {
    User.delete(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving category with id " + req.params.userId
            });
        else res.sendStatus(200);
    });
};