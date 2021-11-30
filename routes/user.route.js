const express = require('express');
var middleware = require('../auth/middleware');
const router = express.Router({ mergeParams: true });

const userController = require('../controllers/user.controller');

router.route('/').post(userController.create);

//router.route('/').get(userController.findAll);

router.route('/:userId/').get(userController.findOne);

router.route('/:userId/').put(middleware.checkToken, userController.update);

router.route('/:userId/').delete(middleware.checkToken, userController.delete);

router.route('/:userId/comments').get(userController.getComments);

router.route('/:userId/anecdates').get(userController.getAnecdates);

router.route('/:userId/reports').get(userController.getReports);

router.route('/:userId/categories').get(userController.getCategories);

module.exports = router;
