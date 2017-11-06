// Acts as an accumulator of all api routes
const express = require('express');
const user = require('../authorisation');

const router = express.Router();

const adminApi = require('./admin');

router.use('/admin', user.is('admin'), adminApi);

module.exports = router;
