const { Unprocessable, NotAuthenticated } = require('@feathersjs/errors')
const { UsersModel, AccessTokensModel } = require('@models')
const jwt = require('jsonwebtoken')

class AuthenticationService {
  constructor(app) {
    this.app = app
    this.UsersModel = UsersModel
    this.AccessTokensModel = AccessTokensModel
  }

  async create(data) {
    const { email, password } = data
    try {
      const users = await this.UsersModel
        .query()
        .where('email', '=', email)
        .andWhere('password', '=', password)
      if (!users.length) return new NotAuthenticated()
      return this.generateJWTToken(users[0])
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }

  async generateJWTToken(payload) {
    const { email, password, id } = payload
    const accessToken = jwt.sign({ email, password }, this.app.get('jwt').secret)
    try {
      await this.AccessTokensModel
        .query()
        .insert({ accessToken, userId: id })
      return { accessToken }
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }
}

AuthenticationService.ROUTE = '/authentication'

module.exports = function createService(app) {
  app.use(AuthenticationService.ROUTE, new AuthenticationService(app))
  // const service = app.service('/authentication')
}
