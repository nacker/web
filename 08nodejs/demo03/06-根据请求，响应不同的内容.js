/* 
  需求：
    如果用户访问： /  给用户响应： 这是首页
    如果用户访问：  /index.html   这个首页
    如果用户访问： /list.html   这是列表页
    如果用户访问:  /login.html   这是登录页
    其余的告诉：  404
  1. 启动服务器
  2. 判断用户请求的路径
  3. 响应不同的内容
*/
// const http = require('http')

// 创建服务器的简写
// http
//   .createServer((req, res) => {
//     res.end('ok')
//   })
//   .listen(8888, function() {
//     console.log('启动成功了')
//   })

// 注册事件
// server.on('request', (req, res) => {

// })

// 1. 导入http
const http = require('http')

// 2. 创建服务器
const server = http.createServer()

// 3. 启动服务器
server.listen(9999, () => {
  console.log('服务器启动成功了')
})

// 4. 注册request事件
server.on('request', (req, res) => {
  let url = req.url
  res.setHeader('content-type', 'text/html;charset=utf-8')
  if (url === '/' || url === '/index.html') {
    res.end('这是首页')
  } else if (url === '/list.html') {
    res.end('这是列表页')
  } else if (url === '/login.html') {
    res.end('这是登录页')
  } else {
    res.statusCode = 404
    res.end('404 页面没找到')
  }
})
