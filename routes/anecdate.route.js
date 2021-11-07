const express = require('express');
const router = express.Router({ mergeParams: true });

const anecdoteController = require('../controllers/anecdate.controller');

router.route('/')
    .get(anecdoteController.getAll);

router.route('/:_id')
    .get(anecdoteController.get);

module.exports = router;