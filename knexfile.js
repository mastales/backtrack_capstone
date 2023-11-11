require('dotenv').config();

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  migrations: {
    tableName: "knex_migrations",
    directory: "./src/db/migrations",
  },

  seeds: {
    directory: "./src/db/seeds",
  },
};