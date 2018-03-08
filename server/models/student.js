const mongoose = require('mongoose');
const user = require('./user');

user.createUserModel();

const User = mongoose.model('User');

const options = { discriminatorKey: 'kind' };

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  postsApplied: [{ type: mongoose.Schema.Types.ObjectId }],
  postsFavourited: [{ type: mongoose.Schema.Types.ObjectId }],
  featuredSkills: [{ type: String }],
  profile: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      firstName: '',
      middleName: '',
      lastName: '',
      DOB: '',
      gender: '',
      contactNo: '',
      branch: '',
      currentYear: '',
      Email: '',
      degree: '',
      cgpa: '',
      joiningYear: '',
      higherSecondaryMarks: '',
      higherSecondaryYear: '',
      secondaryMarks: '',
      secondaryYear: '',
      internships: '',
      projects: '',
      POR: '',
      workSamples: '',
      CCA: '',
      additinalDetails: '',
    },
  },
}, options);

module.exports.createStudentModel = () => {
  User.discriminator('Student', StudentSchema);
};
