const UsersServiceHooks = require('@hooks/users.hooks')

const UsersService = require('./users.service')
const PostsService = require('./posts.service')
const SignUpService = require('./signup.service')
const AuthenticationService = require('./authentication.service')


const injectService = (app, Service, hooks) => {
  app.use(Service.ROUTE, new Service(app))
  if (!hooks) return
  const service = app.service(Service.ROUTE)
  service.hooks(hooks)
}

module.exports = function services(app) {
  injectService(app, SignUpService)
  injectService(app, AuthenticationService)
  injectService(app, PostsService)
  injectService(app, UsersService, UsersServiceHooks)
}
