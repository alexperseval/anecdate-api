const express = require('express');
var multer  = require('multer')
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

router.route('/').post(upload.single("image"), anecdateController.create);

router.route('/').get(anecdateController.findAll);

router.route('/:anecdateId/').get(anecdateController.findOne);

router.route('/:anecdateId/').put(anecdateController.update);

router.route('/:anecdateId/').delete(anecdateController.delete);

router.route('/:anecdateId/comments').get(anecdateController.getComments);

router.route('/date/:date').get(anecdateController.findByDate);

module.exports = router;