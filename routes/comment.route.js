const express = require('express');
const router = express.Router({ mergeParams: true });

const commentController = require('../controllers/comment.controller');

router.route('/').post(commentController.create);

router.route('/').get(commentController.findAll);

router.route('/:commentId/').get(commentController.findOne);

router.route('/:commentId/').put(commentController.update);

router.route('/:commentId/').delete(commentController.delete);

module.exports = router;