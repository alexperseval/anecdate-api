const express = require('express');
var multer  = require('multer')
var middleware = require('../auth/middleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

const router = express.Router({ mergeParams: true });

const anecdateController = require('../controllers/anecdate.controller');

router.route('/').post(middleware.checkToken, upload.single("image"), anecdateController.create);

router.route('/').get(anecdateController.findAll);

router.route('/:anecdateId/').get(anecdateController.findOne);

router.route('/:anecdateId/').put(middleware.checkToken, anecdateController.update);

router.route('/:anecdateId/like').put(middleware.checkToken, anecdateController.like);

router.route('/:anecdateId/dislike').put(middleware.checkToken, anecdateController.dislike);

router.route('/:anecdateId/').delete(middleware.checkToken, anecdateController.delete);

router.route('/:anecdateId/comments').get(anecdateController.getComments);

router.route('/:anecdateId/quiz').get(anecdateController.getQuiz);

router.route('/date/:date').get(anecdateController.findByDate);

module.exports = router;