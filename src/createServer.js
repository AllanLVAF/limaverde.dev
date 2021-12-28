const createServer = (app, isProduction) => {
  if (!isProduction) {
    const http = require('http')
    return http.createServer(app)
  }

  const https = require('https')
  const fs = require('fs')

  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/limaverde.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/limaverde.dev/fullchain.pem')
  }

  return https.createServer(options, app)
}

module.exports = createServer
