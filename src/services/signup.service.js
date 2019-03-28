const { UsersModel } = require('@models')
const { BadRequest } = require('@feathersjs/errors')

class SignUp {
  constructor(app) {
    this.app = app
    this.UsersModel = UsersModel
  }

  async create(data) {
    const { email, password, createdAt } = data
    try {
      await this.UsersModel
        .query()
        .insert({
          email,
          password,
          createdAt,
        })
      return true
    } catch (e) {
      this.app.get('logger').error(e)
      throw new BadRequest('Error create user')
    }
  }
}

SignUp.ROUTE = '/signup'

module.exports = SignUp
