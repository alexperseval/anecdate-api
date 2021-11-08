const express = require('express');
const router = express.Router({ mergeParams: true });

const anecdateController = require('../controllers/anecdate.controller');


router.route('/').post(anecdateController.create);

router.route('/').get(anecdateController.findAll);

router.route('/:anecdateId').get(anecdateController.findOne);

module.exports = router;