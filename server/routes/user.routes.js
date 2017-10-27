import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Users
router.route('/users').get(UserController.getUsers);

// Get one user by username
router.route('/users/:username').get(UserController.getUser);

// Update a user by username
router.route('/users/:username').put(UserController.updateUser);

// Add a new User
router.route('/users').post(UserController.addUser);

// Delete a user by username
router.route('/users/:username').delete(UserController.deleteUser);

export default router;
