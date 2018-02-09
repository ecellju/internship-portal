const Student = require('mongoose').model('Student');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const studentData = {
    email: email.trim(),
    password: password.trim(),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
  };

  const newStudent = new Student(studentData);
  newStudent.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});
