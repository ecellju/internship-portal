const express = require('express');

const router = express.Router();

const postController = require('../controllers/adminPostController');
const postValidator = require('../validators/postValidator');

router.post('/posts', postValidator.createPostValidation, postController.createPost);
router.put('/posts/:id', postValidator.updatePostValidation, postController.updatePost);
router.delete('/posts/:id', postValidator.deletePostValidation, postController.deletePost);
// TODO : router.post(/posts/:id/:status) : toggles isActive boolean


module.exports = router;
