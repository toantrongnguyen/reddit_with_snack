// const { NotAuthenticated, Unprocessable } = require('@feathersjs/errors')
const { UsersModel } = require('@models')
const jwt = require('jsonwebtoken')


class AuthenticationService {
  constructor(app) {
    this.app = app
    this.UsersModel = UsersModel
  }

  async create(data) {
    const refreshToken = jwt.sign(data, this.app.get('jwt').secret)
    return { refreshToken }
  }
}

AuthenticationService.ROUTE = '/authentication'

module.exports = function createService(app) {
  app.use(AuthenticationService.ROUTE, new AuthenticationService(app))
  // const service = app.service('/authentication')
}
