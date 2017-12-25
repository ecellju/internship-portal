const PostModel = require('../models/postSchema');

exports.createPost = (req, res) => {
  const newPost = new PostModel(req.body);
  newPost.save((err) => {
    if (err) res.status(200).json({ message: 'database error' });
    else res.status(200).json({ message: 'post created' });
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

exports.updatePost = (req, res) => {
  PostModel.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
    if (err || !docs) res.status(200).json({ message: 'database error' });
    else res.status(200).json({ message: 'post updated' });
  });
};

exports.deletePost = (req, res) => {
  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err || !docs) res.status(200).json({ message: 'database error' });
    else res.status(200).json({ message: 'post deleted' });
  });
};

