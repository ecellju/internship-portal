const express = require('express');

const router = express.Router();
const globalSkillsController = require('../controllers/global-skills');
const globalSkillsValidator = require('../validators/global-skills');

// router.post('/profile/CV', globalSkillsValidator.uploadValidation, globalSkillsController.uploadCV);
const postController = require('../controllers/post');
const postValidator = require('../validators/post');

router.post('/posts', postValidator.createPostValidation, postController.createPost);
router.put('/posts/:id', postValidator.updatePostValidation, postController.updatePost);
router.delete('/posts/:id', postValidator.deletePostValidation, postController.deletePost);
// TODO : router.post(/posts/:id/:status) : toggles isActive boolean


module.exports = router;
