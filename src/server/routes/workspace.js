const express = require('express')
const router = express.Router()

const models = require('../models')

router.post('/workspace', (req, res) => {
  models.Workspace.findOne(
    { displayName: req.displayName },
    (err, workspace) => {
      if (err) {
        return done(err)
      }
      if (workspace) {
        return done(null, false)
      }
      const newWorkspace = new models.Workspace()

      newWorkspace.fullName = req.body.fullName
      newWorkspace.displayName = req.body.displayName.toLowerCase()
      newWorkspace.email = req.body.email
      newWorkspace.password = req.body.password
      newWorkspace.save((err, ws) => {
        if (err) {
          throw err
        }
        return done(null, ws)
      })
    }
  )
})

router.get('/workspaces', (req, res) => {
  models.Workspace.find(
    {},
    { fullName: 1, displayName: 1 },
    (err, workspaces) => {
      if (err) {
        return res.status(500).json({ error: true })
      }

      res.json(workspaces)
    }
  )
})

module.exports = router
