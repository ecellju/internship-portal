module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  dbUri: 'mongodb://localhost/internship_portal',
  jwtSecret: 'secret',
  serverUrl() {
    return `http://${this.host}:${this.port}`;
  },
};
