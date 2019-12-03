const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  res.end('ok 123 345 567')
})

server.listen(8888, () => {
  console.log('服务器启动成功了')
})
