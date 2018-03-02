const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config');
const _ = require('lodash');

const PostModel = mongoose.model('Post');
const Student = mongoose.model('Student');

exports.me = (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }
    const studentId = decoded.sub;
    return res.status(200).send({ studentId });
  });
};

exports.getAllPost = (req, res) => {
  PostModel.find({ }, null, { sort: { _id: -1 } }, (err, docs) => {
    if (err) res.status(500).json({ message: 'database error' });
    else res.status(200).json(docs);
  });
};

exports.getPost = (req, res) => {
  PostModel.findById({ _id: req.params.id }, (err, docs) => {
    if (err || !docs) res.status(500).json({ message: 'database error' });
    else { res.status(200).json(docs); }
  });
};

exports.addStudentToPost = (req, res) => {
  const postId = req.params.id;
  const studentId = req.body.userId;

  Student.findOneAndUpdate(
    { _id: studentId },
    { $addToSet: { postsApplied: postId } },
    (err2, docs2) => {
      if (err2 || !docs2) {
        res.status(500).json({ message: 'database error' });
        return;
      }
      PostModel.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { studentsApplied: studentId } },
        (err1, docs1) => {
          if (err1 || !docs1) {
            res.status(500).json({ message: 'database error' });
            return;
          }
          res.status(200).json({ message: 'update successful' });
        } // eslint-disable-line comma-dangle
      );
    } // eslint-disable-line comma-dangle
  );
};

exports.addFavouritePostToStudent = (req, res) => {
  const studentId = req.params.id;
  const { postId } = req.body;

  Student.findOneAndUpdate(
    { _id: studentId },
    { $addToSet: { postsFavourited: postId } },
    (err2, docs2) => {
      if (err2 || !docs2) {
        res.status(500).json({ message: 'database error' });
        return;
      }
      res.status(200).json({ message: 'update successful' });
    } // eslint-disable-line comma-dangle
  );
};

exports.removeFavouritePostFromStudent = (req, res) => {
  const studentId = req.params.id;
  const { postId } = req.body;

  Student.findOneAndUpdate(
    { _id: studentId },
    { $pull: { postsFavourited: postId } },
    (err2, docs2) => {
      if (err2 || !docs2) {
        res.status(500).json({ message: 'database error' });
        return;
      }
      res.status(200).json({ message: 'update successful' });
    } // eslint-disable-line comma-dangle
  );
};

exports.getAllApplications = (req, res) => {
  const studentId = req.params.id;

  Student.findOne({ _id: studentId }, (err1, docs1) => {
    if (err1 || !docs1) {
      res.status(500).json({ message: 'database error' });
      return;
    }
    const { postsApplied } = docs1;
    const postsAppliedObjs = postsApplied.map(id => mongoose.Types.ObjectId(id));
    PostModel.find({ _id: { $in: postsAppliedObjs } }, (err2, docs2) => {
      if (err2 || !docs2) res.status(200).json({ message: 'database error' });
      res.status(200).json(docs2);
    });
  });
};

exports.getAllFavourites = (req, res) => {
  const studentId = req.params.id;

  Student.findOne({ _id: studentId }, (err1, docs1) => {
    if (err1 || !docs1) {
      res.status(500).json({ message: 'database error' });
      return;
    }
    const { postsFavourited } = docs1;
    const postsFavouritedObjs = postsFavourited.map(id => mongoose.Types.ObjectId(id));
    PostModel.find({ _id: { $in: postsFavouritedObjs } }, (err2, docs2) => {
      if (err2 || !docs2) res.status(200).json({ message: 'database error' });
      res.status(200).json(docs2);
    });
  });
};

exports.isFavourited = (req, res) => {
  const { studentId, postId } = req.params;

  Student.findOne({ _id: studentId }, (err, docs) => {
    if (err || !docs) {
      res.status(500).json({ message: 'database error' });
      return;
    }

    const { postsFavourited } = docs;
    res.status(200).json({
      isFavourited: _.find(postsFavourited, id => id.equals(postId)) !== undefined,
    });
  });
};
