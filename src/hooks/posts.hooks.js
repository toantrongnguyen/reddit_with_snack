const { PostsChemas } = require('@schemas')
const { BadRequest } = require('@feathersjs/errors')

module.exports = {
  before: {
    all: [],
    get: [],
    find: [],
    create: [],
    update: [],
    async patch(context) {
      try {
        const data = await PostsChemas.patchPostSchema.validate(context.data)
        context.data = data
        return context
      } catch (errors) {
        throw new BadRequest(errors.message)
      }
    },
    remove: [],
  },
}
