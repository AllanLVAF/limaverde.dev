const cors = require('cors')
const express = require('express')
const createServer = require('./createServer')

const portLocal = 5005
const portProd = 443

const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

const app = express()
const server = createServer(app, isProduction)

app.use(cors())
app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static('./src/build'))

const port = isProduction ? portProd : portLocal

server.listen(port, () => {
  console.log(`We are live on ${port}`)
})
