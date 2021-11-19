const express = require('express');
var middleware = require('../auth/middleware');
const router = express.Router({ mergeParams: true });

const reportController = require('../controllers/report.controller');

router.route('/').post(middleware.checkToken, reportController.create);

router.route('/').get(reportController.findAll);

router.route('/:reportId/').get(reportController.findOne);

router.route('/:reportId/').put(middleware.checkToken, reportController.update);

router.route('/:reportId/').delete(middleware.checkToken, reportController.delete);

module.exports = router;