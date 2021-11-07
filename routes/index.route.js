const express = require('express');
const anecdate = require('./anecdate.route');

const router = express.Router();

router.use('/anecdate', anecdate);

router.get('/', (req, res) => res.send('Anecdate API'));

module.exports = router;