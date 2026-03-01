const logoutRouter = require('express').Router()

// logout
logoutRouter.post('/', async (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  res.status(200).json({ message: 'logout successful' })
})

module.exports = logoutRouter
