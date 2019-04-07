const { Model } = require('objection')

class Posts extends Model {
  static get tableName() {
    return 'posts'
  }

  $beforeInsert() {
    this.vote = this.vote || 0
    this.publish = this.publish || true
    const date = new Date()
    this.createdAt = date
    this.updatedAt = date
  }


  $beforeUpdate() {
    this.updatedAt = new Date()
  }

  static get relationMappings() {
    return {
    }
  }

  static async createSchema(app) {
    const knex = app.get('knex')
    const hasTable = await knex.schema.hasTable(Posts.tableName)
    if (!hasTable) {
      knex.schema.createTable(Posts.tableName, (table) => {
        table.increments('id').primary()
        table.integer('userId').unsigned()
        table.string('title')
        table.text('body')
        table.boolean('publish').defaultTo(true)
        table.integer('vote').unsigned().defaultTo(0)
        table.datetime('createdAt')
        table.datetime('updatedAt')
      })
        .then(() => console.log('Created table', Posts.tableName)) // eslint-disable-line no-console
        .catch(e => console.error('Error creating table', Posts.tableName, e)) // eslint-disable-line no-console
    }
  }
}

module.exports = Posts
