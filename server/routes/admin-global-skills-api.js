const express = require('express');

const router = express.Router();
const globalSkillsController = require('../controllers/global-skills');
const globalSkillsValidator = require('../validators/global-skills');

router.post('/add-skills', globalSkillsValidator.addSkillsValidation, globalSkillsController.addSkills);
module.exports = router;
