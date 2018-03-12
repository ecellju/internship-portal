const _ = require('lodash');
const PostModel = require('mongoose').model('Post');

exports.createPost = (req, res) => {
  const postDetails = _.cloneDeep(req.body);
  postDetails.startDate = new Date(parseInt(postDetails.startDate, 10));
  postDetails.duration = parseInt(postDetails.duration, 10);
  postDetails.stipend = parseInt(postDetails.stipend, 10);
  postDetails.applyBy = new Date(parseInt(postDetails.applyBy, 10));

  const newPost = new PostModel(postDetails);

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
  const postDetails = _.cloneDeep(req.body);
  postDetails.startDate = new Date(parseInt(postDetails.startDate, 10));
  postDetails.duration = parseInt(postDetails.duration, 10);
  postDetails.stipend = parseInt(postDetails.stipend, 10);
  postDetails.applyBy = new Date(parseInt(postDetails.applyBy, 10));

  postDetails.position.trim();
  postDetails.company.trim();
  postDetails.location.trim();


  postDetails.postedOn = new Date();

  PostModel.findByIdAndUpdate({ _id: req.params.id }, postDetails, (err, docs) => {
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

