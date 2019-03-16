const { Model } = require('objection')

class Users extends Model {
  static get tableName() {
    return 'users'
  }

  static async createSchema(app) {
    const knex = app.get('knex')
    const hasTable = await knex.schema.hasTable(Users.tableName)
    if (!hasTable) {
      knex.schema.createTable(Users.tableName, (table) => {
        table.increments('id').primary()
        table.string('email').unique()
        table.datetime('createdAt')
      })
        .then(() => console.log('Created messages table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating messages table', e)) // eslint-disable-line no-console
    }
  }
}

module.exports = Users
