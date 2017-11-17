const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PostModel = require('../models/postSchema');
const config = require('../config');
const _ = require('lodash');

const User = mongoose.model('User');

exports.me = (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }
    const userId = decoded.sub;
    return res.status(200).send({ userId });
  });
};

exports.getAllPost = (req, res) => {
  PostModel.find({ }, (err, docs) => {
    if (err) res.status(200).json({ message: 'database error' });
    else res.status(200).json(docs);
  });
};

exports.getPost = (req, res) => {
  PostModel.findById({ _id: req.params.id }, (err, docs) => {
    if (err || !docs) res.status(200).json({ message: 'database error' });
    else { res.status(200).json(docs); }
  });
};

exports.addStudentToPost = (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { postsApplied: postId } },
    (err2, docs2) => {
      if (err2 || !docs2) res.status(200).json({ message: 'database error' });
      PostModel.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { studentsApplied: userId } },
        (err1, docs1) => {
          if (err1 || !docs1) res.status(200).json({ message: 'database error' });
          res.status(200).json({ message: 'update successful' });
        } // eslint-disable-line comma-dangle
      );
    } // eslint-disable-line comma-dangle
  );
};

exports.addFavouritePostToStudent = (req, res) => {
  const userId = req.params.id;
  const { postId } = req.body;

  User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { postsFavourited: postId } },
    (err2, docs2) => {
      if (err2 || !docs2) res.status(200).json({ message: 'database error' });
      res.status(200).json({ message: 'update successful' });
    } // eslint-disable-line comma-dangle
  );
};

exports.removeFavouritePostFromStudent = (req, res) => {
  const userId = req.params.id;
  const { postId } = req.body;

  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { postsFavourited: postId } },
    (err2, docs2) => {
      if (err2 || !docs2) res.status(200).json({ message: 'database error' });
      res.status(200).json({ message: 'update successful' });
    } // eslint-disable-line comma-dangle
  );
};

exports.getAllApplications = (req, res) => {
  const userId = req.params.id;

  User.findOne({ _id: userId }, (err1, docs1) => {
    if (err1 || !docs1) res.status(200).json({ message: 'database error' });
    const { postsApplied } = docs1;
    const postsAppliedObjs = postsApplied.map(id => mongoose.Types.ObjectId(id));
    PostModel.find({ _id: { $in: postsAppliedObjs } }, (err2, docs2) => {
      if (err2 || !docs2) res.status(200).json({ message: 'database error' });
      res.status(200).json(docs2);
    });
  });
};

exports.getAllFavourites = (req, res) => {
  const userId = req.params.id;

  User.findOne({ _id: userId }, (err1, docs1) => {
    if (err1 || !docs1) res.status(200).json({ message: 'database error' });
    const { postsFavourited } = docs1;
    const postsFavouritedObjs = postsFavourited.map(id => mongoose.Types.ObjectId(id));
    PostModel.find({ _id: { $in: postsFavouritedObjs } }, (err2, docs2) => {
      if (err2 || !docs2) res.status(200).json({ message: 'database error' });
      res.status(200).json(docs2);
    });
  });
};

exports.isFavourited = (req, res) => {
  const { userId, postId } = req.params;

  User.findOne({ _id: userId }, (err, docs) => {
    if (err || !docs) res.status(200).json({ message: 'database error' });

    const { postsFavourited } = docs;
    res.status(200).json({
      isFavourited: _.find(postsFavourited, id => id.equals(postId)) !== undefined,
    });
  });
};
