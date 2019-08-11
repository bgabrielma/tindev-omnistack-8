// Update with your config settings.

module.exports = {
  client: 'mysql2',
  connection: {
    database: 'tindev_database',
    user: 'root',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
