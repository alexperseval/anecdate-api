const Category = require('../models/category.model.js')
const moment = require('moment');
const util = require('util')

/*Fonction de création d'une categorie*/
exports.create = (req, res) => {

    // Create a Category
    const category = new Category({
        name: req.body['name'],
        creation_date: moment().format("YYYY-MM-DD"),
        status: "active"
    });

    // Save Category in the database
    Category.create(category, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        else
            res.send(data);
    });
};

/*Fonction de modification d'une categorie en fonction de son ID*/
exports.update = (req, res) => {
    const category = new Category({
        name: req.query['name'],
        creation_date: req.query['creation_date'],
        status: req.query['status']
    });
    Category.update(req.params.categoryId, category, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating Category with id " + req.params.categoryId
            });
        } else res.sendStatus(200);
    });

};

/*Fonction de récupération d'une categorie en fonction de son ID*/
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Category with id " + req.params.categoryId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de récupération de toutes les categories*/
exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categorys."
            });
        else res.send(data);
    });
};

/*Fonction de suppression d'une catégorie*/
exports.delete = (req, res) => {
    Category.delete(req.params.categoryId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving category."
            });
        else res.sendStatus(200);
    });
};