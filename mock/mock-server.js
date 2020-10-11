const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) { // 按照webpack-dev-server before提供的拦截方式， 将mock绑定上去
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length

  return {
    mocksForServer,
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  console.log(require.cache.length)
  Object.keys(require.cache).forEach((i, index) => {
    if (i.includes(mockDir)) {
      console.log(i, index)
      delete require.cache[require.resolve(i)]
    }
  })
}

const responseFake = (url, type, respond) => { // 对原始mock数据进行处理
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`), // 将原始url转为正则url
    type: type || 'get',
    response(req, res) {
      console.log('request invoke' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  const mockRoutes = registerRoutes(app)

  let mockRoutesLength = mockRoutes.mockRoutesLength
  let mockStartIndex = mockRoutes.mockStartIndex

  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // only remove mock route
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        unregisterRoutes()
        const mockRoutes = registerRoutes(app)

        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex
        
        console.log(chalk.rgb(255, 192, 203)(`\n > mock 热更新成功 ${path}`))
      } catch (err) {
        console.log(chalk.redBright(err))
      }
    }
  })
}
