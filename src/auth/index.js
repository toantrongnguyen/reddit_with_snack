const passport = require('passport')
const BearerStrategy = require('passport-http-bearer')
const { UsersModel, AccessTokensModel } = require('@models')
const { Unprocessable, NotAuthenticated } = require('@feathersjs/errors')

module.exports = function services(app) {
  passport.use(new BearerStrategy(
    ((token, done) => {
      AccessTokensModel
        .query()
        .select('users.*', 'accessTokens.*')
        .join('users', 'users.id', 'accessTokens.id')
        .where('accessToken', '=', token)
        .then((users) => {
          if (!users || !users.length) {
            return done(new NotAuthenticated(), false)
          }
          return done(null, users[0], { scope: 'all' })
        })
        .catch((error) => {
          app.get('logger').error(error)
          done(new Unprocessable())
        })
    }),
  ))
}
