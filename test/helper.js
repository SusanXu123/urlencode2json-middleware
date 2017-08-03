const express = require('express')
const bodyParser = require('body-parser')
const urlencode2json = require('../src/index')

exports.createServer = () => {
  const app = express()
  app.use(bodyParser.json()) // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  app.use(urlencode2json)
  return app.use('/', (req, res) => {
    res.send(JSON.stringify(req.body))
  })
}
