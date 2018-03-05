// Acts as an accumulator of all user routes
const express = require('express');

const router = express.Router();

const commonPostApi = require('./common-post-api');
const userProfileApi = require('./user-profile-api');
const commonGlobalSkillsApi = require('./common-global-skills-api');

// all calls will be forwarded to postApi
// TODO: add different routers for different routes
router.use(userProfileApi);
router.use(commonPostApi);
router.use(commonGlobalSkillsApi);


module.exports = router;
