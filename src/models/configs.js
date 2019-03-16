const UsersModel = require('./users.model')

module.exports = function models(app) {
  app.configure(UsersModel.createSchema)
}
