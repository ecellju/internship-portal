exports.createPostValidation = (req, res, next) => {
  if (
    Object.prototype.hasOwnProperty.call(req.body, 'title') &&
    Object.prototype.hasOwnProperty.call(req.body, 'description')) { next(); } else {
    res.status(200).json({ message: 'validation error' });
  }
};
exports.getAllPostValidation = (req, res, next) => {
  next();
};
exports.getPostValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    next();
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};

exports.updatePostValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    const post = req.body;
    if (post && (post.title === '' || post.description === '')) {
      res.status(200).json({ message: 'validation error' });
    } else {
      next();
    }
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};

exports.deletePostValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    next();
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};

exports.addStudentValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    const post = req.body;
    if (post && post.userId === '') {
      res.status(200).json({ message: 'validation error' });
    } else {
      next();
    }
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};

exports.addFavouriteValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    const post = req.body;
    if (post && post.postId === '') {
      res.status(200).json({ message: 'validation error' });
    } else {
      next();
    }
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};

exports.removeFavouriteValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    const post = req.body;
    if (post && post.postId === '') {
      res.status(200).json({ message: 'validation error' });
    } else {
      next();
    }
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};

exports.applicationsValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    next();
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};

exports.favouritesValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'id')) {
    next();
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};

exports.isFavouritedValidation = (req, res, next) => {
  const hasUserId = Object.prototype.hasOwnProperty.call(req.params, 'userId');
  const hasPostId = Object.prototype.hasOwnProperty.call(req.params, 'postId');
  if (hasUserId && hasPostId) {
    next();
  } else {
    res.status(200).json({ message: 'validation error' });
  }
};
