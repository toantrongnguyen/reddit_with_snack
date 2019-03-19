const hooks = require('@hooks/users.hooks')
const { UsersModel } = require('@models')
const { BadRequest, Unprocessable } = require('@feathersjs/errors')

class UsersService {
  constructor(app) {
    this.app = app
    this.UsersModel = UsersModel
  }

  async find(data) {
    try {
      return data
    } catch (e) {
      this.app.get('logger').error(e)
      return new Unprocessable()
    }
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

module.exports = function createService(app) {
  app.use('users', new UsersService(app))
  const service = app.service('users')
  service.hooks(hooks)
}
