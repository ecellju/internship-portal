const express = require('express');

const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const userProfileValidator = require('../validators/userProfileValidator');

router.post('/profile/CV', userProfileValidator.uploadValidation, userProfileController.uploadCV);
router.post('/profile', userProfileValidator.saveProfileValidation, userProfileController.saveProfile);

module.exports = router;
