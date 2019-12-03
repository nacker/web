// 启动服务器
const path = require('path')
const express = require('express')
const app = express()

app.listen(8888, () => {
  console.log('服务器启动成功了')
})

// 处理静态资源
// 把public设置为静态资源目录   /static 资源的路径中带了/static
app.use('/static', express.static('public'))

// 处理首页
app.get('/', (req, res) => {
  // 返回index.html页面
  const filePath = path.join(__dirname, 'views', 'index.html')
  res.sendFile(filePath)
})

app.get('/index', (req, res) => {
  res.redirect('/')
})

app.get('/add', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'add.html')
  res.sendFile(filePath)
})
