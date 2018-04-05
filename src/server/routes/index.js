const express = require('express')

const router = express.Router()
const path = require('path')

const api = require('./api')
const workspace = require('./workspace')

router.use('/api', api)
router.use('/api', workspace)

module.exports = router
