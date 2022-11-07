import knex from 'knex'
const dotenv = require('dotenv')
dotenv.config()

export default function createKnexContext() {
  return {
    default: knex({
      client: 'mysql2',
      connection: process.env.MYSQL_DEFAULT,
      pool: { min: 3, max: 10 },
    }),
  }
}
