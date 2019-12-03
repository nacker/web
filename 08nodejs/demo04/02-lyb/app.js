// 导入包
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

// 创建服务器
const server = http.createServer()

// 启动服务器
server.listen(9999, () => {
  console.log('服务器启动成功了, 请访问: http://localhost:9999')
})

// 处理用户的请求
server.on('request', (req, res) => {
  const url = req.url
  // 请求首页
  if (url === '/' || url === '/index') {
    // 读取首页的文件
    const filePath = path.join(__dirname, 'views', 'index.html')
    fs.readFile(filePath, (err, data) => {
      if (err) return console.log(err)
      // 设置请求头
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(data)
    })
  } else if (url === '/add') {
    // 读取add的文件
    const filePath = path.join(__dirname, 'views', 'add.html')
    fs.readFile(filePath, (err, data) => {
      if (err) return console.log(err)
      // 设置请求头
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(data)
    })
  } else if (url.startsWith('/static')) {
    // console.log(url)
    // 如果请求的资源路径带了 /static 说明请求是静态资源
    // 路径已经有/static了，直接拼上__dirname
    const filePath = path.join(__dirname, url)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // 响应404
        res.statusCode = 404
        res.setHeader('content-type', 'text/html;charset=utf-8')
        res.end('404， 你请求的资源在服务器不存在')
        return
      }
      // 把用户请求的资源响应
      res.setHeader('content-type', mime.getType(url))
      res.end(data)
    })
  } else {
    res.statusCode = 404
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('404， 你请求的资源在服务器不存在')
  }
})
