const UsersService = require('./users.service')

module.exports = function services(app) {
  app.configure(UsersService)
}
