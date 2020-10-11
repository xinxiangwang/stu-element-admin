const { run } = require('runjs')
const chalk = require('chalk')
const config = require('../vue.config.js')
const rawArgv = process.argv.slice(2)
// console.log(chalk.rgb(255, 192, 203)(JSON.stringify(rawArgv)))
const args = rawArgv.join(' ')

if (rawArgv.includes('--preview')) {
  run('vue-cli-service build')
  
  const connect = require('connect')
  const serveStatic = require('serve-static')

  const app = connect()

  app.use('/', serveStatic('./dist', {
    index: ['index.html', '/']
  }))

  app.listen('9999', function () {
    console.log(chalk.rgb(255, 192, 203)(`> Preview at http://localhost:9999/`))
  })
}