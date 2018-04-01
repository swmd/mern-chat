const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = (config, passport) => {
  passport.serializeUser((user, done) => done(null, user.local.email))

  passport.deserializeUser((username, done) => done(null, username))

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        console.log('email: ', email);
        User.findOne(
          { 'local.email': email },
          (err, user) => {
            if (err) {
              return done(err)
            }
            if (user) {
              return done(null, false)
            }
            const newUser = new User()

            newUser.local.email = email;
            newUser.local.username = req.body.username;
            newUser.local.password = newUser.generateHash(password)
            newUser.local.channels = [config.defaultChannel.toLowerCase()]
            newUser.save((err, user) => {
              if (err) {
                throw err
              }
              return done(null, newUser)
            })
          }
        )
      }
    )
  )

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        User.findOne(
          { 'local.email': email },
          (err, user) => {
            if (err) {
              return done(err)
            }
            if (!user) {
              return done(null, false)
            }
            if (!user.validPassword(password)) {
              return done(null, false)
            }
            return done(null, user)
          }
        )
      }
    )
  )
}
