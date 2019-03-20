const { Model } = require('objection')
const UsersModel = require('./users.model')

class AccessTokens extends Model {
  static get tableName() {
    return 'accessTokens'
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'accessTokens.userId',
          to: 'users.id',
        },
      },
    }
  }

  static async createSchema(app) {
    const knex = app.get('knex')
    const hasTable = await knex.schema.hasTable(AccessTokens.tableName)
    if (!hasTable) {
      knex.schema.createTable(AccessTokens.tableName, (table) => {
        table.increments('id').primary()
        table.integer('userId').unsigned()
        table.string('accessToken')
        table.datetime('createdAt')
      })
        .then(() => console.log('Created table', AccessTokens.tableName)) // eslint-disable-line no-console
        .catch(e => console.error('Error creating table', AccessTokens.tableName, e)) // eslint-disable-line no-console
    }
  }
}

module.exports = AccessTokens
