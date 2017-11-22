'use strict'

const { Router } = require('express')

const version = require('../../version')


const router = new Router()


// Return version
router.get('/', (req, res, next) => {
  res.json({version: version.tag})
})


module.exports = router
