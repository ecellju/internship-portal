const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const postValidator = require('../validators/postValidator');

// /post/123 will be the route

router.post('/posts', postValidator.createPostValidation, postController.createPost);
router.get('/posts', postValidator.getAllPostValidation, postController.getAllPost);
router.get('/posts/:id', postValidator.getPostValidation, postController.getPost);
router.put('/posts/:id', postValidator.updatePostValidation, postController.updatePost);
router.delete('/posts/:id', postValidator.deletePostValidation, postController.deletePost);
// TODO : router.post(/posts/:id/addStudent) : adds student id into the students applied array
// TODO : router.post(/posts/:id/:status) : toggles isActive boolean


module.exports = router;
