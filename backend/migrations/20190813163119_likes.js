
exports.up = (knex) => {
  return knex.schema.createTable('likes', table => {
    table.increments('id').primary()
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.integer('id_giver').unsigned().notNull().references('id').inTable('user')
    table.integer('id_receiver').unsigned().notNull().references('id').inTable('user')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('likes')
}
