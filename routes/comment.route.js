const express = require('express');
var middleware = require('../auth/middleware');
const router = express.Router({ mergeParams: true });

const commentController = require('../controllers/comment.controller');

router.route('/').post(middleware.checkToken, commentController.create);

router.route('/').get(commentController.findAll);

router.route('/:commentId/').get(commentController.findOne);

router.route('/:commentId/').put(middleware.checkToken, commentController.update);

router.route('/:commentId/').delete(middleware.checkToken, commentController.delete);

module.exports = router;