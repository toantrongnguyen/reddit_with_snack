const {
  UsersModel,
  PostsModel,
  AccessTokensModel,
} = require('.')

module.exports = function models(app) {
  app.configure(UsersModel.createSchema)
  app.configure(PostsModel.createSchema)
  app.configure(AccessTokensModel.createSchema)
}
