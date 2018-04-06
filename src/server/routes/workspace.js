const express = require('express')
const router = express.Router()
const CONSTS = require('../../common/constants')
const models = require('../models')
const config = require('../config')

router.post('/workspace', (req, res) => {
  models.Workspace.findOne(
    { displayName: req.displayName },
    (err, workspace) => {
      if (err) {
        return res
          .status(500)
          .json({ code: CONSTS.WS_CREATE_STATUS.ERROR, error: err })
      }
      if (workspace) {
        return res.status(400).json({ code: CONSTS.WS_CREATE_STATUS.EXIST })
      }

      const newWorkspace = new models.Workspace()
      const passwordHash = newWorkspace.generateHash(req.body.password)
      newWorkspace.fullName = req.body.fullName
      newWorkspace.displayName = req.body.displayName.toLowerCase()
      newWorkspace.email = req.body.email
      newWorkspace.password = passwordHash
      newWorkspace.save((err, ws) => {
        if (err) {
          return res
            .status(500)
            .json({ code: CONSTS.WS_CREATE_STATUS.ERROR, error: err })
        }
        let savedWs = { ...ws }
        delete savedWs.password

        const newUser = new models.User()
        newUser.local.email = req.body.email
        newUser.local.username = req.body.displayName
        newUser.local.password = passwordHash
        newUser.local.workspace = ws._id
        newUser.local.channels = [config.defaultChannel.toLowerCase()]
        newUser.save((err, user) => {
          if (err) {
            return res
              .status(500)
              .json({ code: CONSTS.WS_CREATE_STATUS.ERROR, error: err })
          }
          let savedUser = { ...user }
          delete savedUser.password
          return res.json({
            code: CONSTS.WS_CREATE_STATUS.SUCCESS,
            workspace: savedWs,
            user: savedUser,
          })
        })
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
