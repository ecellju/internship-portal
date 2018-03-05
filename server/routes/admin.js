// Acts as an accumulator of all admin routes
const express = require('express');

const router = express.Router();

const adminPostApi = require('./admin-post-api');
const commonPostApi = require('./common-post-api');
const studentListApi = require('./student-list-api');

// all calls will be forwarded to postApi
// TODO: add different routers for different routes
router.use(adminPostApi);
router.use(commonPostApi);
router.use(studentListApi);

module.exports = router;
