const http = require('http')

// 导入了路由模块
const router = require('./router')

const server = http.createServer()

server.listen(9999, () => {
  console.log('服务器启动成功')
})

server.on('request', (req, res) => {
  router(req, res)
})
