'use strict'

const { Router } = require('express')

const sherpa = require('../../lib/sherpa')


const router = new Router()


// Return version
router.get('/', (req, res, next) => {
  sherpa.client.get('schema/?format=json')
    .then((data) => {
      res.json({schema: data})
    })
    .catch((err) => {
      res.json({error: 'sherpa-api-error', err})
    })
})


module.exports = router
