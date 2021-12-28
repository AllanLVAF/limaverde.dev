const cors = require('cors')
const throng = require('throng')
const express = require('express')
const createServer = require('./createServer')

const portLocal = 5005

const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

const start = () => {
  const app = express()
  const server = createServer(app, isProduction)

  app.use(cors())
  app.use(express.json({}))
  app.use(express.urlencoded({ extended: true }))

  app.use('/', express.static('./src/build'))

  const port = NODE_ENV === 'production' ? 80 : portLocal

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
