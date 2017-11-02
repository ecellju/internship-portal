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

