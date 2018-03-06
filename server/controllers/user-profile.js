const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');
const mongoose = require('mongoose');

const StudentModel = mongoose.model('Student');
const SkillModel = mongoose.model('Skill');

exports.uploadCV = (req, res) => {
  console.log('Upload cv end point');
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename) => {
    const saveTo = path.join('.', filename);
    console.log(`Uploading: ${saveTo}`);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', () => {
    console.log('Upload complete');
    res.writeHead(200, { Connection: 'close' });
    res.end('Upload Done!');
  });
  return req.pipe(busboy);
};

exports.saveProfile = (req, res) => {
  console.log('Profile Save ', req.body.profile);
  StudentModel.findByIdAndUpdate(
    req.body.userId, {
      $set: {
        profile: req.body.profile, firstName: req.body.profile.firstName, lastName: req.body.profile.lastName, email: req.body.profile.Email,
      },
    },
    (err, docs) => {
      if (err || !docs) return res.status(200).json({ message: docs });
      return res.status(200).json({ message: docs });
    },
  );
};

exports.getProfile = (req, res) => {
  console.log(req.query);
  StudentModel.findById({ _id: req.query.userId }, (err, docs) => {
    if (err || !docs) return res.status(200).json({ message: 'database error' });
    const { profile } = docs;
    profile.firstName = docs.firstName;
    profile.lastName = docs.lastName;
    profile.Email = docs.email;
    console.log('get profile ', docs);
    return res.status(200).json(profile);
  });
};

exports.addSkill = (req, res) => {
  console.log('hi');
  console.log(req.body);
  StudentModel.findByIdAndUpdate(
    req.body.userId, {
      $set: {
        featuredSkills: req.body.skills,
      },
    },
    (err, docs) => {
      if (err || !docs) return res.status(200).json({ message: docs });
      console.log(docs);
      return res.status(200).json({ message: docs.featuredSkills });
    },
  );
};

exports.getSkills = (req, res) => {
  console.log(req.query);
  StudentModel.findById({ _id: req.query.userId }, (err, docs) => {
    if (err || !docs) return res.status(200).json({ message: 'database error' });
    console.log('get profile ', docs);
    return res.status(200).json(docs.featuredSkills[1]);
  });
};

exports.getUnselectedSkills = (req, res) => {
  console.log(req.query.userId);
  let userSkills = [];
  const allSkills = [];
  StudentModel.findById({ _id: req.query.userId }, (err, docs) => {
    if (err || !docs) res.status(200).json({ message: 'database error' });
    else {
      userSkills = docs.featuredSkills;
      SkillModel.find({ }, (error, data) => {
        if (error) res.status(500).json({ message: 'database error' });
        else {
          data.forEach((skill) => {
            allSkills.push(skill.name);
          });
          const unselectedSkills = [];
          allSkills.forEach((skill) => {
            let found = false;
            userSkills.forEach((userSkill) => {
              // console.log(skill, userSkill);
              if (skill === userSkill) found = true;
            });
            if (!found)unselectedSkills.push(skill);
          });
          res.status(200).json({ unselectedSkills });
        }
      });
    }
  });
};
