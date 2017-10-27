module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  serverUrl() {
    return `http://${this.host}:${this.port}`;
  },
};
