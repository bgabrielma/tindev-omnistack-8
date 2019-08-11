exports.up = function (knex) {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary()
    table.string('user').notNull().unique()
    table.text('bio')
    table.string('avatar').notNull()
    table.timestamps()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('user')
}
