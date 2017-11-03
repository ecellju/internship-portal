const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../logger');

/**
 * Assigns a role to the user in the request object
 */
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    const isAdmin = decoded.admin;

    if (isAdmin) {
      req.user.role = 'admin';
    } else {
      req.user.role = 'user';
    }

    logger.log('info', 'Assigned to the role to the user in request', {
      role: req.user.role,
    });
    return next();
  });
};
