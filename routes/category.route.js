const express = require('express');
const router = express.Router({ mergeParams: true });

const categoryController = require('../controllers/category.controller');

router.route('/').post(categoryController.create);

router.route('/').get(categoryController.findAll);

router.route('/:categoryId/').get(categoryController.findOne);

router.route('/update/:categoryId/').get(categoryController.update);

module.exports = router;