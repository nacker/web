// 用户访问pages中任何的东西，直接响应
// 静态服务器： 只要你的页面是放到 www目录， 你就值可以直接去访问
const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {
  // console.log(req.url)
  // 只需要判断你的路径是否是 /www开头的
  let url = req.url
  if (url.startsWith('/www')) {
    // 不管请求的资源是谁，直接读取这个文件
    const filePath = path.join(__dirname, url)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404
        res.setHeader('content-type', 'text/html')
        res.end('404')
        return
      }
      res.end(data)
    })
  } else {
    res.statusCode = 404
    res.setHeader('content-type', 'text/html')
    res.end('404')
  }
})

server.listen(9999, () => {
  console.log('服务器启动成功了')
})

/* 
  静态资源服务器： 不需要对于资源进行任何的处理  
    要什么给什么？ 如果没有的就返回404

  1. 判断路径是否是 /www开始 如果不是，404找不到
  2. 如果是/www开始， 直接根据你的请求路径， 直接读取这个文件 （文件如果不存在，也要404）
*/
