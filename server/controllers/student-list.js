const UserModel = require('mongoose').model('User');

exports.getStudentList = (req, res) => {
  console.log('page', req.headers.page);
  const numOfSkippedDocuments = (req.headers.page - 1) * 10;
  const limitOfDocumentsInPage = 10;
  const query = UserModel.find({ kind: 'Student' }).skip(numOfSkippedDocuments).limit(limitOfDocumentsInPage);
  query.exec((err, docs) => {
    if (err) {
      res.status(500).json({ message: 'database error' });
    } else {
      res.status(200).json({ students: docs });
    }
  });
};

exports.getNumOfStudents = (req, res) => {
  const query = UserModel.find({ kind: 'Student' }).count();
  query.exec((error, count) => {
    if (error) {
      res.status(500).json({ message: 'database error' });
    } else {
      res.status(200).json({ count });
    }
  });
};
