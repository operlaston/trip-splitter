const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log('server has started on port ' + config.PORT)
})
