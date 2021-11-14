const express = require('express');
const router = express.Router({ mergeParams: true });

const commentController = require('../controllers/comment.controller');

router.route('/').post(commentController.create);

router.route('/').get(commentController.findAll);

router.route('/:commentId/').get(commentController.findOne);

router.route('/update/:commentId/').get(commentController.update);

module.exports = router;