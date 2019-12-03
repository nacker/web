const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
http
  .createServer((req, res) => {
    // 只需要判断 url是否以 /www开始
    const url = req.url

    if (url.startsWith('/www')) {
      // 直接读取文件
      const filePath = path.join(__dirname, url)
      fs.readFile(filePath, (err, data) => {
        if (err) {
          // 响应404
          res.statusCode = 404
          res.end('404')
        } else {
          // 设置mime类型
          res.setHeader('content-type', mime.getType(url))
          // 响应数据
          res.end(data)
        }
      })
    } else {
      res.statusCode = 404
      res.end('404')
    }
  })
  .listen(9999, () => {
    console.log('服务器启动成功了')
  })
