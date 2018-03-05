const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config');


const SkillModel = mongoose.model('Skill');
const skillList = [
  'Database Management', 'C++', 'Machine Learning', 'People Skills', 'Python', 'Full stack development',
  'C#', 'Java', 'Data Science', 'Leadership',
];

exports.getAllSkills = (req, res) => {
  console.log(req.query);
  SkillModel.find({ }, (err, docs) => {
    if (err) res.status(500).json({ message: 'database error' });
    else res.status(200).json(docs);
  });
};

exports.addSkills = (req, res) => {
  let isError = false;
  skillList.forEach((skill) => {
    console.log(skill);
    const item = { name: skill };
    const newPost = new SkillModel(item);
    newPost.save((err) => {
      if (err) isError = true;
    });
  });
  if (isError) return res.status(500).json({ message: 'database error' });
  return res.status(500).json({ message: 'doc created' });
};

