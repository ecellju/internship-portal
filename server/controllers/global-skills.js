const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config');


const SkillModel = mongoose.model('Skill');

exports.getAllSkills = (req, res) => {
  console.log(req.query);
  SkillModel.find({ }, (err, docs) => {
    if (err) res.status(500).json({ message: 'database error' });
    else {
      const temp = [];
      docs.forEach((item) => {
        temp.push(item.name);
      });
      res.status(200).json(temp);
    }
  });
};

exports.addSkills = (req, res) => {
  console.log('in Api', req.body);
  const newPost = new SkillModel(req.body);
  newPost.save((err) => {
    if (err) res.status(500).json({ message: 'database error' });
    else res.status(200).json({ message: 'skill list updated' });
  });
};

