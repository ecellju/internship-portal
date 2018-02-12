// Acts as an accumulator of all api routes
const express = require('express');
const user = require('../authorisation');

const router = express.Router();

const accessControlApi = require('./access-control');
const adminApi = require('./admin');
const userApi = require('./user');

router.use('/super-admin', user.is('super-admin'), accessControlApi);
router.use('/admin', user.is('admin'), adminApi);
router.use('/user', userApi);

module.exports = router;
