// Acts as an accumulator of all admin routes
const express = require('express');

const router = express.Router();

const postApi = require('./postApi');

// all calls will be forwarded to postApi
// TODO: add different routers for different routes
router.use(postApi);

module.exports = router;
