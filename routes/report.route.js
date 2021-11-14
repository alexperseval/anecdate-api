const express = require('express');
const router = express.Router({ mergeParams: true });

const reportController = require('../controllers/report.controller');

router.route('/').post(reportController.create);

router.route('/').get(reportController.findAll);

router.route('/:reportId/').get(reportController.findOne);

router.route('/update/:reportId/').get(reportController.update);

module.exports = router;