const { Model } = require('objection')

class Comments extends Model {
  static get tableName() {
    return 'comments'
  }

  async $beforeInsert() {
    const date = new Date()
    this.likes = this.likes || 0
    this.createdAt = date
    this.updatedAt = date
  }

  async $beforeUpdate() {
    this.updatedAt = new Date()
  }

  static async createSchema(app) {
    const knex = app.get('knex')
    const hasTable = await knex.schema.hasTable(Comments.tableName)
    if (!hasTable) {
      knex.schema.createTable(Comments.tableName, (table) => {
        table.increments('id').primary()
        table.integer('userId')
        table.integer('postId')
        table.integer('commentId')
        table.text('content')
        table.integer('likes')
        table.datetime('createdAt')
        table.datetime('updatedAt')
      })
        .then(async () => {
          console.log('Created table', Comments.tableName) // eslint-disable-line no-console
        })
        .catch(e => console.error('Error creating table', Comments.tableName, e)) // eslint-disable-line no-console
    }
  }
}

module.exports = Comments
