const throng = require('throng')
const PORT = 5005

const start = () => {
  const http = require('http')
  const express = require('express')
  const cors = require('cors')

  const app = express()
  const server = http.createServer(app)

  // @ts-ignore
  app.use(cors('*'))
  app.use(express.json({}))
  app.use(express.urlencoded({ extended: true }))

  app.use('/', express.static('./src/build'))

  const port = PORT || 5005

  server.listen(port, () => {
    console.log(`We are live on ${port}`)
  })

  const shutdown = (signal) => {
    const shutdownTimeout = 1000
    console.log(`[shutdown] shutting down in ${shutdownTimeout}ms | signal: ${signal}`)

    setTimeout(() => {
      console.log(`waited ${shutdownTimeout}ms, exiting.`)
      process.exit(0)
    }, shutdownTimeout)
  }

  process.on('SIGTERM', shutdown).on('SIGINT', shutdown)
}

throng({ worker: start, lifetime: Infinity, count: 3 })
