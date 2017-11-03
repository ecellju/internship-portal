const express = require('express');

const router = express.Router();

const postApi = require('./postApi');
const api = require('./api');

router.use('', api);
router.use('/admin', postApi);
module.exports = router;
