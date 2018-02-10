const express = require('express');

const router = express.Router();

const accessControlControllers = require('../controllers/access-control');
const accessControlValidators = require('../validators/access-control');

router.get(
  '/admin-list',
  accessControlValidators.getAdminListValidator,
  accessControlControllers.getAdminListController,
);

router.post(
  '/create-admin',
  accessControlValidators.createAdminValidator,
  accessControlControllers.createAdminController,
);

router.post(
  '/remove-admin',
  accessControlValidators.removeAdminValidator,
  accessControlControllers.removeAdminController,
);

module.exports = router;
