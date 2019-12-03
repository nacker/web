// 1. 导入express
const express = require('express')

// 2. 创建一个服务器，  app
const app = express()

//3. 启动服务器
app.listen(8888, () => {
  console.log('服务器启动成功')
})

// express如何处理路由
// app.method(路径, 处理程序)
// method可以是get或者post
// 处理get请求  url是  /
app.get('/', (req, res) => {
  res.end('ok')
})

app.get('/index', (req, res) => {
  res.send('哈哈哈')
})
// 处理post
// app.post()

/* 
  1 const express = require('express')
  2. const app = express()
  3. app.listen(8888, () => {})
  4. app.get()  app.post()
      app.get('路径', (req, res) => { })
*/
