const { NotAuthenticated, Unprocessable } = require('@feathersjs/errors')
const passport = require('passport')

module.exports = function authenticationMiddleware(req, res, next) {
  passport.authenticate(
    'bearer',
    { session: true },
    (request, response) => {
      if (error) {
        return next(new Unprocessable('Error cant handle'))
      }
      if (!user) {
        return next(new NotAuthenticated('Incorrect email or password.'))
      }
      return next(req.user)
    },
  )(req, res)
}
