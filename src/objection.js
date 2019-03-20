const { Model } = require('objection')
const Knex = require('knex')

module.exports = function objection(app) {
  const { connection, client } = app.get('mysql')
  const knex = Knex({
    client,
    useNullAsDefault: true,
    connection,
  })
  knex.on('query', (data) => {
    // console.log('///// DATA')
    // console.log(data)
    // console.log('END DATA ///')
  })
  Model.knex(knex)

  app.set('knex', knex)
}
