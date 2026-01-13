const signupRouter = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10

// create a user (signup)
signupRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body
  const password_hash = await bcrypt.hash(password, saltRounds)
  const result = await pool.query("\
    INSERT INTO users \
    (name, username, password_hash) \
    VALUES ($1, $2, $3) \
    RETURNING * \
    ", [name, username, password_hash])
  res.status(201).json(result.rows[0])
})

module.exports = signupRouter
