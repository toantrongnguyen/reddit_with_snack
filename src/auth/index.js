const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = function auth(app) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    Promise.resolve({ email, password })
      .then((user) => {
        if (!user || email !== 'test@gmail.com') {
          return done(null, false, { message: 'Incorrect email or password.' })
        }
        return done(null, user, { message: 'Logged In Successfully' })
      })
      .catch((error) => {
        app.get('logger').error(error)
        done(error)
      })
  }))
}
