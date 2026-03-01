require('dotenv').config()

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

module.exports = { DB_URL, PORT, JWT_SECRET, REFRESH_TOKEN_SECRET }
