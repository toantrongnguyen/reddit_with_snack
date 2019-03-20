const { UsersModel } = require('@models')
const { Unprocessable } = require('@feathersjs/errors')

class UsersService {
  constructor(app) {
    this.app = app
    this.UsersModel = UsersModel
  }

  async find() {
    try {
      return this.UsersModel.query()
    } catch (e) {
      this.app.get('logger').error(e)
      return new Unprocessable()
    }
  }
}

UsersService.ROUTE = '/users'

module.exports = UsersService
