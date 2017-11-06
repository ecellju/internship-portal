const ConnectRoles = require('connect-roles');

const user = new ConnectRoles({
  failureHandler(req, res) {
    res.status(403).json({
      message: 'Access Denied',
    });
  },
});

user.use('admin', req => (
  req.user.role === 'admin'
));

module.exports = user;
