const requestLogger = (req, res, next) => {
  console.log(req.method, req.path)
  console.log(req.body)
  console.log('----')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send('the endpoint requested doesnt exist')
}

module.exports = { requestLogger, unknownEndpoint }
