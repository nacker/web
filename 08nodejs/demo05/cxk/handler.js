const fs = require('fs')
const path = require('path')
const urlObj = require('url')
const querystring = require('querystring')

const mime = require('mime')
const template = require('art-template')
const moment = require('moment')
const dataTool = require('./data')





module.exports = {
  renderIndex(req, res) {
    const filePath = path.join(__dirname, 'views', 'index.html')
    dataTool.readFile((data)=>{
      const html = template(filePath, data)
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(html)
    })
  },
  renderAdd(req, res) {
    const filePath = path.join(__dirname, 'views', 'add.html')
    fs.readFile(filePath, (err, data) => {
      if (err) return console.log(err)
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(data)
    })
  },
  handleDelete(req, res) {
    const id = urlObj.parse(req.url, true).query.id
    dataTool.readFile((data)=>{
      data.total--
      data.list = data.list.filter(item => item.id !== +id)
      dataTool.writeFile(data,()=>{
        res.writeHead(302, {
          Location: '/index'
        })
        res.end()
      })
    })
  },
  handleFb(req, res) {
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
      dataTool.readFile(data=> {
        data.total++
        data.list.unshift(temp)
        // 写回去
        dataTool.writeFile(data,()=>{
          // 重定向
          res.writeHead(302, {
            Location: '/index'
          })
          res.end()
        })
      })
    })
  },
  handleStatic(req, res) {
    const filePath = path.join(__dirname, req.url)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        this.handle404()
        return
      }

      // 给静态资源设置请求头
      res.setHeader('content-type', mime.getType(req.url))
      res.end(data)
    })
  },
  handle404(req, res) {
    res.writeHead(404, {
      'content-type': 'text/html;charset=utf-8'
    })
    res.end('404, 你请求的资源不存在')
  }
}