const { Model } = require('objection')
const { hashPassword } = require('@helpers')
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

  async $beforeInsert() {
    this.password = await hashPassword(this.password)
    const date = new Date()
    this.createdAt = date
    this.updatedAt = date
  }

  async $beforeUpdate() {
    this.password = await hashPassword(this.password)
    this.updatedAt = new Date()
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
        table.datetime('updatedAt')
      })
        .then(async () => {
          console.log('Created table', Users.tableName) // eslint-disable-line no-console
          await knex(Users.tableName).insert({ email: 'admin@example.com', password: await hashPassword('12345678') })
        })
        .catch(e => console.error('Error creating table', Users.tableName, e)) // eslint-disable-line no-console
    }
  }
}

module.exports = Users
