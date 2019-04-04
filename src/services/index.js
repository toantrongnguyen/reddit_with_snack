const {
  UsersServiceHooks,
  PostsServiceHooks,
} = require('@hooks')

const UsersService = require('./users.service')
const PostsService = require('./posts.service')
const SignUpService = require('./signup.service')
const CommentsService = require('./comments.service')
const AuthenticationService = require('./authentication.service')


const injectService = (app, Service, hooks) => {
  app.use(Service.ROUTE, new Service())
  if (!hooks) return
  const service = app.service(Service.ROUTE)
  service.hooks(hooks)
}

module.exports = function services(app) {
  injectService(app, SignUpService)
  injectService(app, AuthenticationService)
  injectService(app, PostsService, PostsServiceHooks)
  injectService(app, UsersService, UsersServiceHooks)
  injectService(app, CommentsService)
}
