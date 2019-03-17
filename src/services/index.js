const UsersService = require('./users.service')
const AuthenticationService = require('./authentication.service')

module.exports = function services(app) {
  app.configure(UsersService)
  app.configure(AuthenticationService)
}
