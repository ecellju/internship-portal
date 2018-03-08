const mongoose = require('mongoose');

const user = require('./user');
const admin = require('./admin');
const student = require('./student');
const post = require('./post');
const skillList = require('./skill');

module.exports.connect = (uri) => {
  mongoose.connect(uri, {
    useMongoClient: true,
  });
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  user.createUserModel();
  admin.createAdminModel();
  student.createStudentModel();
  post.createPostModel();
  skillList.createSkillModel();
};
