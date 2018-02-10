const _ = require('lodash');
const validator = require('validator');

module.exports.getAdminListValidator = (req, res, next) => {
  next();
};

module.exports.createAdminValidator = (req, res, next) => {
  if (_.has(req, 'body') && _.has(req.body, 'email') && _.has(req.body, 'password')) {
    let isFormValid = true;
    const errors = {};
    if (typeof req.body.email !== 'string' || !validator.isEmail(req.body.email)) {
      isFormValid = false;
      errors.email = 'Please provide a correct email address.';
    }

    if (typeof req.body.password !== 'string' || req.body.password.trim().length < 8) {
      isFormValid = false;
      errors.password = 'Password must have at least 8 characters.';
    }

    if (!isFormValid) {
      errors.summary = 'validation error';
      res.status(400).json({
        errors,
      });
    } else {
      next();
    }
  } else {
    res.status(400).json({
      success: false,
      errors: {
        summary: 'validation error',
      },
    });
    console.log('validation error');
  }
};

module.exports.removeAdminValidator = (req, res, next) => {
  if (_.has(req.body, 'email')) {
    next();
  } else {
    res.status(400).json({
      success: false,
      message: 'validation error',
    });
    console.log('validation error');
  }
};
