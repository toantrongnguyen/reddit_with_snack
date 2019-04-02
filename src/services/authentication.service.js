const { Unprocessable, NotAuthenticated } = require('@feathersjs/errors')
const { UsersModel, AccessTokensModel } = require('@models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class AuthenticationService {
  constructor() {
    this.UsersModel = UsersModel
    this.AccessTokensModel = AccessTokensModel
  }

  setup(app) {
    this.app = app
  }

  async create(data) {
    const { email, password } = data
    try {
      const users = await this.UsersModel
        .query()
        .where('email', email)
      if (!users.length) return new NotAuthenticated()
      const user = users[0]
      const hashedPassword = user.password
      const isMatchedPassword = await bcrypt.compare(password, hashedPassword)
      if (!isMatchedPassword) return new NotAuthenticated()
      return this.generateJWTToken(user)
    } catch (e) {
      this.app.get('log')(e)
      return new Unprocessable()
    }
  }

  async generateJWTToken(payload) {
    const { email, id } = payload
    const accessToken = jwt.sign({ email, id }, this.app.get('jwt').secret)
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

AuthenticationService.ROUTE = '/login'

module.exports = AuthenticationService
