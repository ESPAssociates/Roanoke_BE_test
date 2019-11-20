// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './Database/roanokeDB.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './Database/migrations',
    },
    seeds: { directory: './Database/seeds' }
  },

};
