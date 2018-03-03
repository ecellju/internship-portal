const express = require('express');

const router = express.Router();
const userProfileController = require('../controllers/user-profile');
const userProfileValidator = require('../validators/user-profile');

router.post('/profile/CV', userProfileValidator.uploadValidation, userProfileController.uploadCV);
router.post('/profile', userProfileValidator.saveProfileValidation, userProfileController.saveProfile);
router.get('/profile', userProfileValidator.getProfileValidation, userProfileController.getProfile);
module.exports = router;
