const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Assigns a role to the user in the request object
 */
module.exports = (req, res, next) => {
  console.log('---role-assign.js---');
  const token = req.headers.authorization.split(' ')[1];
  console.log(`token: ${JSON.stringify(token)}`);

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    const isAdmin = decoded.admin;
    console.log(`decoded: ${JSON.stringify(decoded)}`);

    if (isAdmin) {
      req.user.role = 'admin';
    } else {
      req.user.role = 'user';
    }

    console.log(`User: ${JSON.stringify(req.user)}`);
    return next();
  });
};
