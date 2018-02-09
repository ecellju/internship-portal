const mongoose = require('mongoose');
const user = require('./user');

user.createUserModel();

const User = mongoose.model('User');

const options = { discriminatorKey: 'kind' };

const AdminSchema = new mongoose.Schema({
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
}, options);

module.exports.createAdminModel = () => {
  User.discriminator('Admin', AdminSchema);
};
