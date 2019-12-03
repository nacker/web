// 导入
const express = require('express')
const path = require('path')

// 创建服务器
const app = express()

// 启动服务器
app.listen(8888, () => {
  console.log('服务器启动成功了')
})

// 处理路由的方法
// use只要求路径中包含 static即可
// /static
// static/xxx
// static/xxx/xxx
// 表示匹配所有的路径
// app.use('/static', (req, res) => {
//   // console.log(req.url)
//   const filePath = path.join(__dirname, req.url)
//   res.sendFile(filePath)
// })
// 把static目的设置为了静态资源目录， static文件夹下面的资源可以直接访问
// app.use('/static', express.static('static'))
// app.use('/static', (req, res) => {
//   // console.log(req.url)
//   // res.send('ok')
//   const filePath = path.join(__dirname, 'static', req.url)
//   res.sendFile(filePath)
// })

// 处理静态资源目录
app.use('/static', express.static('static'))

// 处理路由
// 访问首页  /  或者 用 /index都行
app.get('/', (req, res) => {
  // 响应首页
  const filePath = path.join(__dirname, 'views', 'index.html')
  // 响应文件
  res.sendFile(filePath)
})

// 只能匹配  /index
// 不能匹配 /index/xxx
// 能匹配 /index?id=1
app.get('/index', (req, res) => {
  // 重定向到 /
  res.redirect('/')
})

app.get('/add', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'add.html')
  res.sendFile(filePath)
})
