const hooks = require('@hooks/users.hooks')
const { UsersModel } = require('@models')
const { BadRequest } = require('@feathersjs/errors')

class UsersService {
  constructor(app) {
    this.app = app
    this.UsersModel = UsersModel
  }

  find() {
    return this.UsersModel.query()
  }

  async create(data) {
    const { email, createdAt } = data
    try {
      await this.UsersModel
        .query()
        .insert({
          email,
          createdAt,
        })
      return true
    } catch (e) {
      throw new BadRequest('Error create user')
    }
  }
}

module.exports = function createService(app) {
  app.use('users', new UsersService(app))
  const service = app.service('users')
  service.hooks(hooks)
}
