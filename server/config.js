export default {
  port: process.env.PORT || 8080,
  host: process.env.HOST || '0.0.0.0',
  serverUrl () {
    return `http://${this.host}:${this.port}`
  }
}
