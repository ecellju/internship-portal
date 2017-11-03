const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const postValidator = require('../validators/postValidator');

function isAdmin(req, res, next) {
  // assuming the request sender is Admin
  // TODO : Implement proper Role check here
  console.log('admin check');
  next();
}

// /post/123 will be the route

router.post('/posts', isAdmin, postValidator.createPostValidation, postController.createPost);
router.get('/posts', isAdmin, postValidator.getAllPostValidation, postController.getAllPost);
router.get('/posts/:id', isAdmin, postValidator.getPostValidation, postController.getPost);
router.put('/posts/:id', isAdmin, postValidator.updatePostValidation, postController.updatePost);
router.delete('/posts/:id', isAdmin, postValidator.deletePostValidation, postController.deletePost);
// TODO : router.post(/posts/:id/addStudent) : adds student id into the students applied array
// TODO : router.post(/posts/:id/:status) : toggles isActive boolean


module.exports = router;
