/* 
  需求：
    如果用户访问： /  给用户响应： 这是首页
    如果用户访问：  /index.html   这个首页
    如果用户访问： /list.html   这是列表页
    如果用户访问:  /login.html   这是登录页
    其余的告诉：  404
*/
//1. 导入http
const http = require('http')

// 2.创建服务器
const server = http.createServer()

// 3. 启动
server.listen(8888, () => {
  console.log('服务器启动成功')
})

// 4. 监听用户的请求  注册事件
// 响应行 ： 200 404 500
// 响应头 ： content-type: text/html;charset=utf-8
// 响应体 ：
server.on('request', (req, res) => {
  let url = req.url
  if (url === '/' || url === '/index.html') {
    res.end('this is index')
  } else if (url === '/list.html') {
    res.end('this is list')
  } else if (url === '/login.html') {
    res.end('this is login')
  } else {
    res.end('404, your page has not found')
  }
})
