const logger = require('../logger');

/**
 * Assigns a role to the user in the request object
 */
module.exports = (req, res, next) => {
  req.user = {};
  if (req.decoded.admin) {
    req.user.role = 'admin';
  } else {
    req.user.role = 'user';
  }

  logger.log('info', 'Assigned role to the user in request', {
    role: req.user.role,
  });

  return next();
};
