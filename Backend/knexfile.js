// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,

    connection: {
      host: "127.0.0.1",
      port: 1234,
      user: "root",
      password: "root",
      database: "htmlfetcher",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg", // < heroku postgreS
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
