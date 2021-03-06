exports.up = (knex) => {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary()
    table.string('avatar').notNull()
    table.text('bio')
    table.string('user').notNull().unique()
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('user')
}
