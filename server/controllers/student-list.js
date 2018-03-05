const UserModel = require('mongoose').model('User');

exports.readStudentList = (req, res) => {
  UserModel.find({kind: "Student"}, (err, docs) => {
    if (err) {
      res.status(500).json({message: 'database error'});
    }
    else {
      res.status(200).json({students: docs});
    }
  });
};
