const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.')

} else {

  const redirect = {};

  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value

    User.find({
      where: {
        [Sequelize.Op.or]: [{ googleId }, { email }]
      }
    })
      .then(foundUser => {
        if (foundUser) {
          redirect['successRedirect'] = `/users/${foundUser.id}`
          redirect['failureRedirect'] = '/login'
          done(null, foundUser);
        } else {
          return User.create({ name, email, googleId })
            .then(createdUser => {
              redirect['successRedirect'] = `/users/${createdUser.id}`
              redirect['failureRedirect'] = '/login'
              done(null, createdUser);
            })
        }
      })
      .catch(done)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('google', { scope: 'email' }))

  router.get('/callback', passport.authenticate('google', redirect))

}
