const { Model } = require('objection')
const AccessTokensModel = require('./accessTokens.model')

class Users extends Model {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    return {
      accessTokens: {
        relation: Model.HasManyRelation,
        modelClass: AccessTokensModel,
        join: {
          from: 'users.id',
          to: 'accessTokens.userId',
        },
      },
    }
  }

  static async createSchema(app) {
    const knex = app.get('knex')
    const hasTable = await knex.schema.hasTable(Users.tableName)
    if (!hasTable) {
      knex.schema.createTable(Users.tableName, (table) => {
        table.increments('id').primary()
        table.string('email').unique()
        table.string('password')
        table.datetime('createdAt')
      })
        .then(() => console.log('Created table', Users.tableName)) // eslint-disable-line no-console
        .catch(e => console.error('Error creating table', Users.tableName, e)) // eslint-disable-line no-console
    }
  }
}

module.exports = Users
