const { Model } = require('objection')
const Knex = require('knex')

module.exports = function objection(app) {
  const { connection, client } = app.get('mysql')
  const knex = Knex({
    client,
    useNullAsDefault: true,
    connection,
  })

  Model.knex(knex)

  app.set('knex', knex)
}
