const { BadRequest } = require('@feathersjs/errors')
const { UsersChemas } = require('@schemas')

module.exports = {
  before: {
    all: [],
    get: [],
    find(context) {
      context.data = context.params.user
      return context
    },
    async create(context) {
      try {
        const data = await UsersChemas.createUserSchema.validate(context.data)
        context.data = data
        return context
      } catch (errors) {
        throw new BadRequest(errors.message)
      }
    },
    update: [],
    patch: [],
    remove: [],
  },
}
