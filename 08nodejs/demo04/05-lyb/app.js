const http = require('http')
const fs = require('fs')
const path = require('path')
const urlObj = require('url')
const querystring = require('querystring')

const mime = require('mime')
const template = require('art-template')
const moment = require('moment')

const server = http.createServer()
const dbPath = path.join(__dirname, 'data.json')

server.listen(9999, () => {
  console.log('服务器启动成功')
})

server.on('request', (req, res) => {
  // 处理用户的请求
  let { url, method } = req

  /* 
    1. 获取数据
    2. 使用模版引擎渲染结构
    3. 返回渲染后的结构
  */
  if (url === '/' || url === '/index') {
    // 首页
    const filePath = path.join(__dirname, 'views', 'index.html')
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log(err)
      data = JSON.parse(data)
      const html = template(filePath, data)
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(html)
    })
  } else if (url === '/add') {
    // 渲染add.html
    const filePath = path.join(__dirname, 'views', 'add.html')
    fs.readFile(filePath, (err, data) => {
      if (err) return console.log(err)
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(data)
    })
  } else if (url.startsWith('/delete') && method === 'GET') {
    // 删除
    // 获取到id值
    const id = urlObj.parse(url, true).query.id
    fs.readFile(dbPath, (err, data) => {
      if (err) return console.log(err)
      data = JSON.parse(data)
      data.total--
      data.list = data.list.filter(item => item.id !== +id)
      // 写回去
      fs.writeFile(dbPath, JSON.stringify(data, null, 2), err => {
        if (err) return console.log(err)
        // 重定向
        res.writeHead(302, {
          Location: '/index'
        })
        res.end()
      })
    })
  } else if (url.startsWith('/fb') && method === 'POST') {
    // 添加功能
    // 获取参数
    let result = ''
    req.on('data', chunk => {
      result += chunk
    })
    req.on('end', () => {
      // 把result变成对象
      const query = querystring.parse(result)

      const temp = {
        ...query,
        id: +new Date(),
        time: moment().format('YYYY年MM月DD日 HH:mm:ss')
      }
      fs.readFile(dbPath, (err, data) => {
        if (err) return console.log(err)
        data = JSON.parse(data)
        data.total++
        data.list.unshift(temp)
        // 写回去
        fs.writeFile(dbPath, JSON.stringify(data, null, 2), err => {
          if (err) return console.log(err)
          // 重定向
          res.writeHead(302, {
            Location: '/index'
          })
          res.end()
        })
      })
    })
  } else if (url.startsWith('/static')) {
    // 处理静态资源
    const filePath = path.join(__dirname, url)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'content-type': 'text/html;charset=utf-8'
        })
        res.end('404, 你请求的资源不存在')
        return
      }

      // 给静态资源设置请求头
      res.setHeader('content-type', mime.getType(url))
      res.end(data)
    })
  } else {
    // 404
    res.writeHead(404, {
      'content-type': 'text/html;charset=utf-8'
    })
    res.end('404, 你请求的资源不存在')
  }
})
