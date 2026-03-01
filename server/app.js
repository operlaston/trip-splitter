const express = require('express')
const app = express()
const cors = require('cors')
const tripsRouter = require('./controllers/tripsRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
const signupRouter = require('./controllers/signupRouter')
const middleware = require('./utils/middleware')
const cookieParser = require('cookie-parser')
const logoutRouter = require('./controllers/logoutRouter')

// middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
// app.use(middleware.requestLogger)

// login/signup (no jwt auth required)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)

app.use(middleware.verifyToken)

// jwt auth required endpoints
app.use('/logout', logoutRouter)
app.use('/trips', tripsRouter)
app.use('/users', usersRouter)

app.all(/.*/, middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
