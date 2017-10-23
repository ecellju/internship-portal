import Express from 'express'

// Import required modules
import serverConfig from './config'

// Initialize the Express App
const app = new Express()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(serverConfig.port, serverConfig.host, () => {
  console.info(`Express is running on: ${serverConfig.serverUrl()}`)
})
