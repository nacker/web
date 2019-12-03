// 导入
const http = require('http')
const fs = require('fs')
const path = require('path')

// 创建服务器
const server = http.createServer()

// 启动服务器
server.listen(9999, () => {
  console.log('服务器启动成功了')
})

// 注册请求的事件
server.on('request', (req, res) => {
  const url = req.url
  console.log(url)

  // url地址仅仅是一个标识而且
  if (url === '/' || url === '/index.html') {
    // 响应首页
    // 读取index.html文件的内容
    res.setHeader('content-type', 'text/html;charset=utf-8')
    let filePath = path.join(__dirname, 'pages', 'index.html')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return console.log(err)
      res.end(data)
    })
  } else if (url === '/css/index.css') {
    res.setHeader('content-type', 'text/css;charset=utf-8')
    // 读取index.css文件，进行影响
    const filePath = path.join(__dirname, 'pages', 'css', 'index.css')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return console.log(err)
      // 响应读取到css内容
      res.end(data)
    })
  } else if (url === '/images/timg.jpg') {
    const filePath = path.join(__dirname, 'pages', 'images', 'timg.jpg')
    fs.readFile(filePath, (err, data) => {
      res.setHeader('content-type', 'image/jpeg')
      if (err) return console.log(err)
      res.end(data)
    })
  } else if (url === '/images/lj.jpg') {
    const filePath = path.join(__dirname, 'pages', 'images', 'lj.jpg')
    fs.readFile(filePath, (err, data) => {
      res.setHeader('content-type', 'image/jpeg')
      if (err) return console.log(err)
      res.end(data)
    })
  } else {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.statusCode = 404
    res.end('404')
  }
})
