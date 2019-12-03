// 1. 导入http
const http = require('http')
// 2. 创建服务器
const server = http.createServer()
// 3. 启动服务器
// 端口： 8080  8888 9090 999
server.listen(6666, function() {
  console.log('服务器启动成功')
})
// 4. 处理用户的请求
server.on('request', (req, res) => {
  // 每次用户发送了请求，request事件就会触发
  // req: 获取本次请求相关的信息 的对象
  // res: 服务器给浏览器处理响应的对象
  res.end('gun')
})
