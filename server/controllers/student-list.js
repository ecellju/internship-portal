const UserModel = require('mongoose').model('User');
const StudentModel = require('mongoose').model('Student');

exports.getStudentList = (req, res) => {
  const numOfSkippedDocuments = (req.headers.page - 1) * 10;
  const limitOfDocumentsInPage = 10;
  const queryCriteria = { kind: 'Student' };
  if (req.headers.department !== '') {
    queryCriteria['profile.branch'] = req.headers.department;
  }
  if (req.headers.year !== '') {
    queryCriteria['profile.currentYear'] = req.headers.year;
  }
  console.log('skills', req.headers.skills);
  if (req.headers.skills.length !== 0) {
    const skills = req.headers.skills.split(',');
    queryCriteria['featuredSkills'] = { "$in": skills };
  }
  console.log('queryCriteria', queryCriteria);
  const query = UserModel.find(queryCriteria).skip(numOfSkippedDocuments).limit(limitOfDocumentsInPage);
  query.exec((err, docs) => {
    console.log('docs', docs);
    if (err) {
      res.status(500).json({ message: 'database error' });
    } else {
      res.status(200).json({ students: docs });
    }
  });
};

exports.getNumOfStudents = (req, res) => {
  const queryCriteria = { kind: 'Student' };
  if (req.headers.department !== '') {
    queryCriteria['profile.branch'] = req.headers.department;
  }
  if (req.headers.year !== '') {
    queryCriteria['profile.currentYear'] = req.headers.year;
  }
  if (req.headers.skills.length !== 0) {
    const skills = req.headers.skills.split(',');
    queryCriteria['featuredSkills'] = { "$in": skills };
  }
  console.log('queryCriteria', queryCriteria);
  const query = UserModel.find(queryCriteria).count();
  query.exec((error, count) => {
    if (error) {
      res.status(500).json({ message: 'database error' });
    } else {
      res.status(200).json({ count });
    }
  });
};

exports.getProfile = (req, res) => {
  StudentModel.findById({ _id: req.params.id }, (err, docs) => {
    if (err || !docs) res.status(500).json({ message: 'database error' });
    else { res.status(200).json(docs); }
  });
};
