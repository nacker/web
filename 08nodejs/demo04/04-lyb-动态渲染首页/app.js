// 导入包
const http = require('http')
const fs = require('fs')
const path = require('path')
const urlObj = require('url')
const querystring = require('querystring')

const mime = require('mime')
const template = require('art-template')
const moment = require('moment')

// 数据文件的路径
const dbPath = path.join(__dirname, 'data.json')
// 创建服务器
const server = http.createServer()

// 启动服务器
server.listen(9999, () => {
  console.log('服务器启动成功了, 请访问: http://localhost:9999')
})

// 处理用户的请求
/* 
  // 1. 安装art-template
  // 2. 导入模版引擎
  // 3. 准备数据
  // 4. 准备模版
  // 5. 结合可以生成动态渲染的数据
  // 6. 给浏览器响应
*/
// console.log(moment().format('YYYY年MM月DD日 HH:mm:ss'))
server.on('request', (req, res) => {
  const url = req.url
  // console.log(url)
  // 请求首页
  if (url === '/' || url === '/index') {
    const filePath = path.join(__dirname, 'views', 'index.html')
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log(err)
      // 把读取文件得到的json字符串变成JSON对象
      data = JSON.parse(data)
      const html = template(filePath, data)

      // 设置一个响应头
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(html)
    })
  } else if (url.startsWith('/delete')) {
    /* 
      删除功能
        1. 获取到id值
        2. 从json文件中把元素的数据给获取  转成对象
        3. 把对象中的list 根据id删除指定的数据， 并且让total -1
        4. 把删除后的数据重新写回到原来的文件
        5. 重新回到首页
    */
    // 参数1：需要解析的url地址
    // 参数2： 是否把query这个字符串解析成对象 默认是false
    const id = urlObj.parse(url, true).query.id
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log('读取数据库文件失败', err)
      data = JSON.parse(data)
      data.total--
      data.list = data.list.filter(item => item.id !== +id)

      // 写回去， 注意data必须是字符串
      fs.writeFile(dbPath, JSON.stringify(data, null, 4), err => {
        if (err) return console.log('写入文件失败', err)
        // 写回去成功，回到 首页
        // res.setHeader('content-type', 'text/html;charset=utf-8')
        // res.end(`<script>alert('删除数据成功了'); location.href="/"</script>`)
        // 状态码： 302  浏览器看到状态302  服务器让我跳页面
        // "Location": "/"
        // res.statusCode = 302
        // res.setHeader('Location', '/')
        res.writeHead(302, {
          Location: '/'
        })
        // 重定向也要结束请求
        res.end()
      })
    })
  } else if (url.startsWith('/fb') && req.method === 'GET') {
    /* 
      添加
        1. 获取到需要添加的数据
        2. 获取到data.json文件中的数据 对象
        3. 把需要添加的数据添加到对象中
        4. 把数据写回到data.json
        5. 重定向到首页
    */

    const query = urlObj.parse(url, true).query
    const temp = {
      ...query,
      id: +new Date(),
      time: moment().format('YYYY年MM月DD日 HH:mm:ss')
    }
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log(err)
      data = JSON.parse(data)
      data.total++
      data.list.unshift(temp)

      // 把data写回到文件
      fs.writeFile(dbPath, JSON.stringify(data, null, 2), err => {
        if (err) return console.log(err)
        // 数据写入成功，重定向到首页
        res.writeHead(302, {
          Location: '/'
        })
        res.end()
      })
    })
    // res.end('ok')
  } else if (url.startsWith('/fb') && req.method === 'POST') {
    // 如何获取post请求的参数
    // 1. 注册一个事件， 只要接收到请求体，就会触发,这个事件有可能会触发多次，根据请求的数据量有关
    let result = ''
    req.on('data', chunk => {
      // console.log('触发了data')
      result += chunk
    })
    // 当请求体接收结束了， 就触发end
    req.on('end', () => {
      // console.log('触发了end')
      console.log(result)
      // 先把result变成对象
      const query = querystring.parse(result)
      const temp = {
        ...query,
        id: +new Date(),
        time: moment().format('YYYY年MM月DD日 HH:mm:ss')
      }
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return console.log(err)
        data = JSON.parse(data)
        data.total++
        data.list.unshift(temp)

        // 把data写回到文件
        fs.writeFile(dbPath, JSON.stringify(data, null, 2), err => {
          if (err) return console.log(err)
          // 数据写入成功，重定向到首页
          res.writeHead(302, {
            Location: '/'
          })
          res.end()
        })
      })
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
