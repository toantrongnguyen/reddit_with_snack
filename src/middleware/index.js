const passport = require('passport')
// const authenticationMiddleware = require('./authentication.middleware')

const PUBLIC_PATH = ['/signup', '/login']

module.exports = function middleware(app) {
  app.use(
    '/',
    (req, res, next) => {
      if (PUBLIC_PATH.includes(req.url)) {
        next()
        return
      }
      passport.authenticate('bearer', { session: false })(req, res, next)
    },
    (req, res, next) => {
      req.feathers.user = req.user
      next()
    },
  )
}
