module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/internship_portal',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  serverUrl() {
    return `http://${this.host}:${this.port}`;
  },
};
