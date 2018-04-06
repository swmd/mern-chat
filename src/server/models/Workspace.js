const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const workspaceSchema = mongoose.Schema({
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  fullName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  displayName: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
})

const saltRounds = 10

workspaceSchema.methods.generateHash = function generateHash (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds))
}

workspaceSchema.methods.validPassword = function isValidPassword (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('Workspace', workspaceSchema)
