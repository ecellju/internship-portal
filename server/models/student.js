const mongoose = require('mongoose');
const user = require('./user');

user.createUserModel();

const User = mongoose.model('User');

const options = { discriminatorKey: 'kind' };

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  postsApplied: [{ type: mongoose.Schema.Types.ObjectId }],
  postsFavourited: [{ type: mongoose.Schema.Types.ObjectId }],
}, options);

module.exports.createStudentModel = () => {
  User.discriminator('Student', StudentSchema);
};
