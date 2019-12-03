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
// 响应体

// res.write() : 表示服务器给浏览器响应内容
// res.write: 作用：给浏览器返回一块响应体， 可以调用多次

// res.end(): 表示结束本次的响应  每个响应都必须调用end表示结束

// res.setHeader(name, value) 设置响应头

// res.statusCode 设置状态码 默认是200， 如果将来服务器找不到某个资源，应该设置为404
server.on('request', (req, res) => {
  res.statusCode = 404
  res.setHeader('content-type', 'text/html;charset=utf-8')

  res.write('hello')
  res.write('world')
  res.end()
})

/* 
  res中的东西：  
  res.statusCode： 设置状态码  正常来说， 默认是200, 如果是404， 最好还是设置状态码

  res.setHeader(name, value) : content-type   一般来说，只要是一个响应，都应该设置content-type，有content-type,浏览器才知道如何去解析。不想中文乱码，还需charset

  res.write() 设置响应体， 可以调用多次


  res.end() 结束本次响应  res.end('ok')
*/
