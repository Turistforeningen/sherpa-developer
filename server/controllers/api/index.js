'use strict'

const { Router } = require('express')
const responseTime = require('response-time')

const version = require('../../version')
const librato = require('../../lib/librato')

const versionController = require('./version')
const userController = require('./user')
const schemaController = require('./schema')

const router = new Router()

// Log request count and response time to librato
router.use(responseTime((req, res, time) => {
  // General counts and meassurements
  librato.increment(null, 'count')
  librato.measure(null, 'response-time', time)

  // Path specific measurements
  librato.increment(req, 'count')
  librato.measure(req, 'response-time', time)
}))


// Add version header
router.use((req, res, next) => {
  res.header('APP-VERSION', version.tag)
  next()
})


// Add routes
router.use('/version', versionController)
router.use('/user', userController)
router.use('/schema', schemaController)


module.exports = router
