const UserModel = require('mongoose').model('User');

exports.getStudentList = (req, res) => {
  const numOfSkippedDocuments = (req.headers.page - 1) * 2;
  const limitOfDocumentsInPage = 2;
  const queryCriteria = { kind: 'Student' };
  if (req.headers.department !== '') {
    queryCriteria['profile.branch'] = req.headers.department;
  }
  if (req.headers.year !== '') {
    queryCriteria['profile.currentYear'] = req.headers.year;
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
