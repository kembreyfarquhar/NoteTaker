// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/note-taker.db3"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations"
    }
  }
};
