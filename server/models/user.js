const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const options = { discriminatorKey: 'kind' };

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true },
  },
  password: String,
  firstName: String,
  lastName: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  postsApplied: [{ type: mongoose.Schema.Types.ObjectId }],
  postsFavourited: [{ type: mongoose.Schema.Types.ObjectId }],
  demo: [],
  profile: {
    firstName: String,
    middleName: String,
    lastName: String,
    DOB: String,
    gender: String,
    contactNo: String,
    branch: String,
    currentYear: String,
    Email: String,
    degree: String,
    cgpa: String,
    joiningYear: String,
    higherSecondaryMarks: String,
    higherSecondaryYear: String,
    secondaryMarks: String,
    secondaryYear: String,

  },
}, options);
/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports.createUserModel = () => {
  mongoose.model('User', UserSchema);
};
