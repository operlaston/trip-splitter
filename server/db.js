const config = require('./utils/config')
const Pool = require('pg').Pool

const pool = new Pool({
  connectionString: config.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

console.log('connected to database')

module.exports = pool
