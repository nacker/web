const http = require('http')

const server = http.createServer()

// 需求根据用户的请求来处理响应
// req: 代表用户的请求信息，，，，通过req可以获取到所有的请求信息  请求头  请求行 请求体
// 请求行  请求方式   请求的地址
// 浏览器，只要发送请求，会自动去请求favicon.ico
server.on('request', (req, res) => {
  console.log('请求方式', req.method)
  console.log('请求地址', req.url)
  console.log('请求头', req.headers)
  res.end('hello')
})

server.listen(8888, () => {
  console.log('服务器启动成功')
})
