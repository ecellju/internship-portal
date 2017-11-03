const mongoose = require('mongoose');
const logger = require('../logger');

const user = require('./user');

module.exports.connect = (uri) => {
  mongoose.connect(uri, {
    useMongoClient: true,
  });
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    logger.log('error', `Mongoose connection error: ${err}`);
    process.exit(1);
  });

  user.createUserModel();
};
