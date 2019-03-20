const { UsersModel } = require('@models')
const { BadRequest } = require('@feathersjs/errors')
const bcrypt = require('bcrypt')

class SignUp {
  constructor(app) {
    this.app = app
    this.UsersModel = UsersModel
  }

  async create(data) {
    const { email, password, createdAt } = data
    try {
      const hashedPassword = await bcrypt.hash(password, this.app.get('saltRounds'))
      await this.UsersModel
        .query()
        .insert({
          email,
          password: hashedPassword,
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
