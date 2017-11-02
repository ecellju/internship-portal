const postController = require('../controllers/postController');
const postValidator = require('../validators/postValidator');

function isAdmin(req, res, next) {
  // assuming the request sender is Admin
  // TODO : Implement proper Role check here
  console.log('admin check');
  next();
}

// /post/123 will be the route
module.exports = (app) => {
  app.post('/posts', isAdmin, postValidator.createPostValidation, postController.createPost);
  app.get('/posts', isAdmin, postValidator.getAllPostValidation, postController.getAllPost);
  app.get('/posts/:id', isAdmin, postValidator.getPostValidation, postController.getPost);
  app.put('/posts/:id', isAdmin, postValidator.updatePostValidation, postController.updatePost);
  app.delete('/posts/:id', isAdmin, postValidator.deletePostValidation, postController.deletePost);
  // TODO : app.post(/posts/:id/addStudent) : adds student id into the students applied array
  // TODO : app.post(/posts/:id/:status) : toggles isActive boolean
};
