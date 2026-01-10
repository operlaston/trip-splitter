const usersRouter = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10

// get all users
usersRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query("\
      SELECT * FROM users \
    ")
    res.json(result.rows)
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// get user by id
usersRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await pool.query("\
      SELECT * FROM users WHERE id = $1\
    ", [id])
    if (result.rowCount === 0) {
      return res.status(404).send('id doesnt exist')
    }
    res.json(result.rows[0])
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// create a user
usersRouter.post('/', async (req, res) => {
  try {
    const { name, username, password } = req.body
    const password_hash = await bcrypt.hash(password, saltRounds)
    const result = await pool.query("\
      INSERT INTO users \
      (name, username, password_hash) \
      VALUES ($1, $2, $3) \
      RETURNING * \
    ", [name, username, password_hash])
    res.status(201).json(result.rows[0])
  }
  catch (err) {
    // 23505 is error code for uniqueness violation
    if (err.code === '23505') {
      res.status(409).send('username taken')
    }
    else {
      console.error(err)
      res.status(500).end()
    }
  }
})

// update a user
usersRouter.put('/:id', async (req, res) => {
  try {
    const { name, username } = req.body
    const result = await pool.query("\
      UPDATE users \
      SET name = $1, username = $2 \
      WHERE id = $3 \
      RETURNING * \
    ", [name, username, id])
    if (result.rowCount === 0) {
      return res.status(404).send('id doesnt exist')
    }
    res.json(result.rows[0])
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// delete a user
usersRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await pool.query("\
      DELETE FROM users WHERE user_id = $1 \
    ", [id])
    if (result.rowCount === 0) {
      return res.status(404).send('id doesnt exist')
    }
    res.status(204).end()
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// login
usersRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const result = await pool.query("\
      SELECT * FROM users \
      WHERE username = $1 \
    ", [username])
    if (result.rowCount === 0) {
      return res.status(404).send('username doesnt exist')
    }
    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      return res.status(401).send('incorrect password')
    }
    res.status(200).end()
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

module.exports = usersRouter
