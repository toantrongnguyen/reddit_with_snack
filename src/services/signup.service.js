const { UsersModel } = require('@models')
const { BadRequest } = require('@feathersjs/errors')

class SignUp {
  constructor() {
    this.UsersModel = UsersModel
  }

  setup(app) {
    this.app = app
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
