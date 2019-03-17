const { NotAuthenticated, Unprocessable } = require('@feathersjs/errors')
const passport = require('passport')

module.exports = function authenticationMiddleware(req, res, next) {
  passport.authenticate(
    'local',
    { session: false },
    (error, user, errorMessage) => {
      if (error) {
        return next(new Unprocessable('Error cant handle'))
      }
      if (!user) {
        return next(new NotAuthenticated(errorMessage))
      }
      return next()
    },
  )(req, res)
}
