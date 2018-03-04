const _ = require('lodash');
const PostModel = require('mongoose').model('Post');

exports.createPost = (req, res) => {
  req.body.startDate = new Date(parseInt(req.body.startDate, 10));
  req.body.duration = parseInt(req.body.duration, 10);
  req.body.stipend = parseInt(req.body.stipend, 10);
  req.body.applyBy = new Date(parseInt(req.body.applyBy, 10));

  const newPost = new PostModel(req.body);

  newPost.position = newPost.position.trim();
  newPost.company = newPost.company.trim();
  newPost.location = newPost.location.trim();
  if (_.has(newPost, 'description')) {
    newPost.description = newPost.description.trim();
  }

  newPost.postedOn = new Date();

  newPost.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'database error' });
    } else {
      console.log('A new post added');
      res.status(200).json({ message: 'post created' });
    }
  });
};

exports.getAllPost = (req, res) => {
  PostModel.find({ }, (err, docs) => {
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

exports.updatePost = (req, res) => {
  PostModel.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
    if (err || !docs) res.status(500).json({ message: 'database error' });
    else res.status(200).json({ message: 'post updated' });
  });
};

exports.deletePost = (req, res) => {
  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err || !docs) res.status(500).json({ message: 'database error' });
    else res.status(200).json({ message: 'post deleted' });
  });
};

