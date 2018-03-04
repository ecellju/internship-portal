const _ = require('lodash');

exports.createPostValidation = (req, res, next) => {
  const errors = {};
  let hasErrors = false;
  if (!_.has(req.body, 'position') || req.body.position.trim().length === 0) {
    hasErrors = true;
    errors.position = 'The position field cannot be empty';
  }

  if (!_.has(req.body, 'company') || req.body.company.trim().length === 0) {
    hasErrors = true;
    errors.company = 'The company field cannot be empty';
  }

  if (!_.has(req.body, 'location') || req.body.location.trim().length === 0) {
    hasErrors = true;
    errors.location = 'The location field cannot be empty';
  }

  if (!_.has(req.body, 'startDate') || req.body.startDate.trim().length === 0) {
    hasErrors = true;
    errors.startDate = 'Start date field cannot be empty';
  } else if (new Date(parseInt(req.body.startDate, 10)) < Date.now()) {
    hasErrors = true;
    errors.startDate = 'Start date cannot be before now';
  }

  if (!_.has(req.body, 'duration') || req.body.duration.trim().length === 0) {
    hasErrors = true;
    errors.duration = 'Duration field cannot be empty';
  } else if (parseInt(req.body.duration, 10) <= 0) {
    hasErrors = true;
    errors.duration = 'Duration must be positive';
  }

  if (!_.has(req.body, 'stipend') || req.body.stipend.trim().length === 0) {
    hasErrors = true;
    errors.stipend = 'Stipend field cannot be empty';
  } else if (parseInt(req.body.stipend, 10) < 0) {
    hasErrors = true;
    errors.stipend = 'Stipend must be non-negative';
  }

  if (!_.has(req.body, 'applyBy') || req.body.applyBy.trim().length === 0) {
    hasErrors = true;
    errors.applyBy = 'Apply by field cannot be empty';
  } else if ((new Date(parseInt(req.body.applyBy, 10))) < Date.now()) {
    hasErrors = true;
    errors.applyBy = 'Apply by date cannot be before now';
  }

  if (hasErrors) {
    errors.summary = 'Check the form for errors';
    res.status(400).json({
      message: 'Validation error',
      errors,
    });
    console.log('Validation error for create post request');
  } else {
    next();
  }
};

exports.getAllPostValidation = (req, res, next) => {
  next();
};
exports.getPostValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    next();
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};

exports.updatePostValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    const post = req.body;
    if (post && (post.title === '' || post.description === '')) {
      res.status(400).json({ message: 'validation error' });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};

exports.deletePostValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    next();
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};

exports.addStudentValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    const post = req.body;
    if (post && post.userId === '') {
      res.status(400).json({ message: 'validation error' });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};

exports.addFavouriteValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    const post = req.body;
    if (post && post.postId === '') {
      res.status(400).json({ message: 'validation error' });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};

exports.removeFavouriteValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    const post = req.body;
    if (post && post.postId === '') {
      res.status(400).json({ message: 'validation error' });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};

exports.applicationsValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    next();
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};

exports.favouritesValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    next();
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};

exports.isFavouritedValidation = (req, res, next) => {
  const hasStudentId = Object.prototype.hasOwnProperty.call(req.params, 'studentId');
  const hasPostId = Object.prototype.hasOwnProperty.call(req.params, 'postId');
  if (hasStudentId && hasPostId) {
    next();
  } else {
    res.status(400).json({ message: 'validation error' });
  }
};
