const express = require('express');

const router = express.Router();
const globalSkillsController = require('../controllers/global-skills');
const globalSkillsValidator = require('../validators/global-skills');

router.get('/all-skills', globalSkillsValidator.getAllSkillsValidation, globalSkillsController.getAllSkills);
module.exports = router;
