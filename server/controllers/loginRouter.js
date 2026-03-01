const loginRouter = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = require('../utils/config')

// login
loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const result = await pool.query("\
    SELECT * FROM users \
    WHERE username = $1 \
    ", [username])
  if (result.rowCount === 0) {
    return res.status(404).send('username doesnt exist')
  }
  const user = result.rows[0]
  const passwordCorrect = await bcrypt.compare(password, user.password_hash)
  if (!passwordCorrect) {
    return res.status(401).send('incorrect password')
  }

  // token expires in an hour
  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: 3600 }
  )
  // refresh token expires in 7 days
  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      name: user.name
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  // send refresh token as HttpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 + 24 * 60 * 60 * 1000
  })

  // send access token to client
  res.status(200).json({ token: accessToken, username: user.username, name: user.name, id: user.id })
})

// refresh token
loginRouter.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return res.status(401).json({ message: 'no refresh token provided' })
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: 'invalid or expired refresh token' })
    }
    const newAccessToken = jwt.sign(
      {
        id: decodedUser.id,
        username: decodedUser.username,
        name: decodedUser.name
      },
      JWT_SECRET,
      { expiresIn: 3600 }
    )
    res.json({
      token: newAccessToken,
      username: decodedUser.username,
      name: decodedUser.name,
      id: decodedUser.id
    })
  })

})

module.exports = loginRouter
