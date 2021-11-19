const express = require('express');
const anecdate = require('./anecdate.route');
const category = require('./category.route');
const user = require('./user.route');
const comment = require('./comment.route');
const report = require('./report.route');
const loginController = require('../controllers/login.controller');

const router = express.Router();

router.use('/api/anecdate', anecdate);

router.use('/api/category', category);

router.use('/api/user', user);

router.use('/api/comment', comment);

router.use('/api/report', report);

router.route('/api/login').post(loginController.login);

router.get('/', (req, res) => res.send('Anecdate API'));

module.exports = router;