const express = require('express');

// Import required modules
const serverConfig = require('./config');

// Initialize the express App
const app = express();

app.get('/api', (req, res) => {
  res.send('Hello world!');
});

app.listen(serverConfig.port, serverConfig.host, () => {
  console.info(`Express is running on: ${serverConfig.serverUrl()}`);
});
