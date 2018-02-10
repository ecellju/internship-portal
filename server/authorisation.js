const ConnectRoles = require('connect-roles');

const user = new ConnectRoles({
  failureHandler(req, res) {
    res.status(403).json({
      message: 'Access Denied',
    });
  },
});

user.use('admin', req => (
  req.user.role === 'admin' || req.user.role === 'super-admin'
));

user.use('super-admin', req => (
  req.user.role === 'super-admin'
));

module.exports = user;
