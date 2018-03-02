const _ = require('lodash');
const Admin = require('mongoose').model('Admin');

module.exports.getAdminListController = (req, res) => {
  Admin.find({}, (err, admins) => {
    if (err) {
      res.status(500).json({
        success: false,
        errors: {
          summary: 'Database error',
        },
      });
      console.log('Database error');
      return;
    }
    const adminList = admins.map(admin => _.omit(admin.toObject(), ['password']));
    res.status(200).json({
      success: true,
      successMessage: 'Admin list sent',
      adminList,
    });
    console.log('Admin list sent');
  });
};

module.exports.createAdminController = (req, res) => {
  const AdminData = {
    email: req.body.email.trim(),
    password: req.body.password,
  };
  const newAdmin = new Admin(AdminData);
  newAdmin.save((err) => {
    if (err) {
      // Duplicate key error
      if (err.code === 11000) {
        res.status(409).json({
          success: false,
          emailAlreadyExists: true,
          errors: {
            email: 'A user with this email address already exists.',
          },
        });
        console.log('A user with this email address already exists.');
      } else {
        res.status(500).json({
          success: false,
          errors: {
            summary: 'Database error',
          },
        });
        console.log('Database error');
      }
      return;
    }
    res.status(200).json({
      success: true,
      successMessage: `New admin created with email: ${newAdmin.email}`,
    });
    console.log(`New admin created with email: ${newAdmin.email}`);
  });
};

module.exports.removeAdminController = (req, res) => {
  const adminEmail = req.body.email.trim();
  Admin.findOne({ email: adminEmail }, (err, admin) => {
    if (err) {
      res.status(500).json({
        success: false,
        errors: {
          summary: 'Database error',
        },
      });
      console.log('Database error');
      return;
    }

    if (!admin) {
      res.status(400).json({
        errors: {
          summary: `No admin with email ${adminEmail} found`,
        },
      });
      console.log(`No admin with email ${adminEmail} found`);
      return;
    }

    if (admin.isSuperAdmin) {
      res.status(400).json({
        errors: {
          summary: `Admin with email ${adminEmail} is a super admin and cannot be removed`,
        },
      });
      console.log(`Admin with email ${adminEmail} is a super admin and cannot be removed`);
    }

    admin.remove((removeErr) => {
      if (removeErr) {
        res.status(500).json({
          success: false,
          errors: {
            summary: 'Database error',
          },
        });
        console.log('Database error');
        return;
      }
      res.status(200).json({
        success: true,
        successMessage: `Admin with email: ${adminEmail} removed`,
      });
      console.log(`Admin with email: ${adminEmail} removed`);
    });
  });
};
