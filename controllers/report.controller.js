const Report = require('../models/report.model.js')
const moment = require('moment');

/*Fonction de création d'une categorie*/
exports.create = (req, res) => {

    // Create a Report
    const report = new Report({
        idAuthor: req.query['idAuthor'],
        idAnecdate: req.query['idAnecdate'],
        object: req.query['object'],
        comment: req.query['comment'],
        object: req.query['object'],
        status: "active",
        date: moment().format("YYYY-MM-DD")
    });

    // Save Report in the database
    Report.create(report, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Report."
            });
        else
            res.send(data);
    });
};

/*Fonction de modification d'une categorie en fonction de son ID*/
exports.update = (req, res) => {
    const report = new Report({
        idAuthor: req.query['idAuthor'],
        idAnecdate: req.query['idAnecdate'],
        object: req.query['object'],
        comment: req.query['comment'],
        object: req.query['object'],
        status: req.query['status'],
        date: req.query['date']
    });
    Report.update(req.params.reportId, report, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                message: "Error updating Report with id " + req.params.reportId
            });
        } else res.sendStatus(200);
    });

};

/*Fonction de récupération d'une categorie en fonction de son ID*/
exports.findOne = (req, res) => {
    Report.findById(req.params.reportId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Report with id ${req.params.reportId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Report with id " + req.params.reportId
                });
            }
        } else res.send(data);
    });
};

/*Fonction de récupération de toutes les categories*/
exports.findAll = (req, res) => {
    Report.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving reports."
            });
        else res.send(data);
    });
};

/*Fonction de suppression d'un report*/
exports.delete = (req, res) => {
    Report.delete(req.params.reportId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving report with id " + req.params.reportId
            });
        else res.sendStatus(200);
    });
};