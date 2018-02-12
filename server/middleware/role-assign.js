const logger = require('../logger');

/**
 * Assigns a role to the user in the request object
 */
module.exports = (req, res, next) => {
  req.user = {};
  if (req.decoded.isSuperAdmin) {
    req.user.role = 'super-admin';
  } else if (req.decoded.isAdmin) {
    req.user.role = 'admin';
  } else {
    req.user.role = 'user';
  }

  logger.log('info', 'Assigned role to the user in request', {
    role: req.user.role,
  });

  return next();
};
