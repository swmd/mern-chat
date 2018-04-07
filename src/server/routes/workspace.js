const express = require('express')
const nodemailer = require('nodemailer')
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

router.post('/sendemail', (req, res) => {
  console.log('========= email request: =======', req.body.email)
  models.Workspace.find(
    { email: req.body.email },
    { fullName: 1, displayName: 1 },
    (err, workspaces) => {
      if (err || workspaces.length == 0) {
        return res.status(500).json({ error: true })
      }

      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: account.user, // generated ethereal user
            pass: account.pass, // generated ethereal password
          },
        })

        let html = ''
        workspaces.forEach(ws => {
          html += 'http://localhost:3000/' + ws.displayName + '<br />'
        })

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Slack Clone" <slack@example.com>', // sender address
          to: req.body.email, // list of receivers
          subject: 'Email Notiication', // Subject line
          html: html,
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json({ error: error })
          }
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
          return res.json(info)
        })
      })
    }
  )
})

module.exports = router
