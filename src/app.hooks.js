// Application hooks that run for every service
const log = require('./hooks/log')

module.exports = {
  before: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all(context) {
      console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack) // eslint-disable-line
    },
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
