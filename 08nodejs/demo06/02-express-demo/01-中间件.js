const express = require('express')
const urlObj = require('url')
const querystring = require('querystring')

const app = express()

app.listen(9999, () => {
  console.log('服务启动成功')
})

// 不管get还是post都会经过use
// app.use一般配合中间件使用 app.use 可以匹配到所有的请求
app.use((req, res, next) => {
  console.log('哈哈')
  console.log('req.ip', req.ip)
  console.log('req.time', new Date().toLocaleString())
  next()
})

/* 
  需要记录每次用户访问的时间  用户访问的ip地址
*/

// 中间件，指的就是一个函数
// 参数1：代表 req
// 参数2： 代表 res
// 参数3： next   next() 表示把中间继续传给下一个中间件

// 中间件可以处理我们请求，可以继续传递给下一个请求  必须调用next()
// app.get('/', (req, res, next) => {
//   // res.send('ok2')
//   console.log('哈哈')
//   next()
// })
// app.use((req, res, next) => {
//   // 获取到所有的get请求的参数
//   console.log(req.url)
//   // 解析url中的query参数，给query2
//   req.query2 = urlObj.parse(req.url, true).query
//   next()
// })
app.use((req, res, next) => {
  // req.body有post参数的值
  let result = ''
  req.on('data', chunk => {
    result += chunk
  })
  req.on('end', () => {
    req.body = querystring.parse(result)
    next()
  })
})

// 处理路由
app.get('/', (req, res) => {
  console.log(req.query2.id)
  res.send('ok')
})

app.get('/index', (req, res) => {
  res.send('首页')
})

app.get('/login', (req, res) => {
  res.send('登录')
})
