const {
  UsersModel,
  AccessTokensModel,
} = require('.')

module.exports = function models(app) {
  app.configure(UsersModel.createSchema)
  app.configure(AccessTokensModel.createSchema)
}
