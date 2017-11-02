// Acts as an accumulator of all api routes
const express = require('express');

const app = express();
const postApi = require('../routes/postApi');

module.exports = () => {
  postApi(app);
  return app;
};
