const express = require('express');
var middleware = require('../auth/middleware');
const router = express.Router({ mergeParams: true });

const categoryController = require('../controllers/category.controller');

router.route('/').post(middleware.checkToken, categoryController.create);

router.route('/').get(categoryController.findAll);

router.route('/:categoryId/').get(categoryController.findOne);

router.route('/:categoryId/').put(middleware.checkToken, categoryController.update);

router.route('/:categoryId/').delete(middleware.checkToken, categoryController.delete);

module.exports = router;