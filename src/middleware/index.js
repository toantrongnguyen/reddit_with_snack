const authenticationMiddleware = require('./authentication.middleware')

module.exports = function middleware(app) {
  app.use('authentication', authenticationMiddleware)
}
