const express = require('express');

const router = express.Router();

const postController = require('../controllers/userPostController');
const postValidator = require('../validators/postValidator');

router.get('/posts', postValidator.getAllPostValidation, postController.getAllPost);
router.get('/posts/:id', postValidator.getPostValidation, postController.getPost);
router.post('/posts/:id/addStudent', postValidator.addStudentValidation, postController.addStudentToPost);
router.get('/:id/applications', postValidator.applicationsValidation, postController.getAllApplications);
router.post('/:id/addFavourite', postValidator.addFavouriteValidation, postController.addFavouritePostToStudent);
router.post('/:id/removeFavourite', postValidator.removeFavouriteValidation, postController.removeFavouritePostFromStudent);
router.get('/:id/favourites', postValidator.favouritesValidation, postController.getAllFavourites);
router.get('/isFavourited/:userId/:postId', postValidator.isFavouritedValidation, postController.isFavourited);
router.get('/me', postController.me);

module.exports = router;
