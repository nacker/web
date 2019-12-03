const http = require('http')


const router= require('./router')

const server = http.createServer()


server.listen(7777, () => {
  console.log('服务器启动成功')
})

server.on('request', (req, res) => {
  router(req,res)
})
