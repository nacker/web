const http = require('http')
const fs = require('fs')
const path = require('path')
const urlObj = require('url')
const querystring = require('querystring')

const mime = require('mime')
const template = require('art-template')
const moment = require('moment')

const dbPath = path.join(__dirname, 'data.json')

const server = http.createServer()

server.listen(7777, () => console.log('项目启动,请访问http://localhost:7777'))

server.on('request', (req, res) => {
  const url = req.url
  if (url === '/') {
    const filePath = path.join(__dirname, 'views', 'index.html')
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log(err)
      data = JSON.parse(data)
      const html = template(filePath, data)
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(html)
    })
  } else if (url.startsWith('/delete')) {
    const id = urlObj.parse(url, true).query.id
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log('读取文件库数据失败', err)
      data = JSON.parse(data)
      data.total--
      data.list = data.list.filter(item => item.id !== +id)

      fs.writeFile(dbPath, JSON.stringify(data, null, 2), err => {
        if (err) return console.log('文件写入失败', err)
        // res.setHeader('content-type','text/html;charset=utf-8')
        // res.end('删除成功')
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
      })
    })
   } /*else if (url.startsWith('/fb')) {
    const query = urlObj.parse(url, true).query
    const temp = {
      ...query,
      id: +new Date(),
      time: moment().format('YYYY年MM月DD日 HH:mm:ss')
    }
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log('err')
      data = JSON.parse(data)
      data.total++
      data.list.unshift(temp)

      fs.writeFile(dbPath, JSON.stringify(data, null, 2), err => {
        if (err) return console.log(err)
        res.writeHead(302, {
          Location: '/'
        })
        res.end()
      })
    })

  } */ else if (url.startsWith('/fb')) {
    let result = ''
    req.on('data', chunk => {
      result += chunk
    })
    req.on('end', () => {
      const query = querystring.parse(result)
      const temp = {
        ...query,
        id: +new Date(),
        time: moment().format('YYYY年MM月DD日 HH:mm:ss')
      }
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return console.log('err')
        data = JSON.parse(data)
        data.total++
        data.list.unshift(temp)

        fs.writeFile(dbPath, JSON.stringify(data, null, 2), err => {
          if (err) return console.log(err)
          res.writeHead(302, {
            Location: '/'
          })
          res.end()
        })
      })
    })
  } else if (url === '/add') {
    const filePath = path.join(__dirname, 'views', 'add.html')
    fs.readFile(filePath, (err, data) => {
      if (err) return console.log(err)
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(data)
    })
  } else if (url.startsWith('/static')) {
    const filePath = path.join(__dirname, url)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404
        res.setHeader('content-type', 'text/html;charset=utf-8')
        res.end('404，你请求的资源在服务器中不存在')
        return
      }
      res.end(data)
    })
  } else {
    res.statusCode = 404
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('404，你请求的资源在服务器中不存在')
  }
})