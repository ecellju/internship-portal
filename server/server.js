const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const config = require('./config');

// connect to the database and load models
require('./models').connect(config.dbUri);

// Initialize the express App
const app = express();

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./middleware/auth-check');

app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(config.port, config.host, () => {
  console.info(`Express is running on: ${config.serverUrl()}`);
});

app.use('/admin', require('./routes/routes')());
