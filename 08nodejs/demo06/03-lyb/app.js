const express = require('express')

const moment = require('moment')
const bodyParser = require('body-parser')
const dataTool = require('./dataTool')

const app = express()

// 通用处理
// 1. 静态资源
app.use('/static', express.static('public'))
// 2. 模版引擎
app.engine('html', require('express-art-template'))
// 设置默认的路径
app.set('views', 'pages')
// body-parser中间件 保证后续所有的路由中通过req.body获取值
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(8888, () => {
  console.log('服务器启动成功了')
})

app.get('/', (req, res) => {
  // 渲染首页, 获取数据
  dataTool.readFile(data => {
    res.render('index.html', data)
  })
})

app.get('/add', (req, res) => {
  res.render('add.html')
})

app.get('/delete', (req, res) => {
  const id = req.query.id
  dataTool.readFile(data => {
    data.total--
    data.list = data.list.filter(item => item.id !== +id)

    dataTool.writeFile(data, () => {
      res.redirect('/')
    })
  })
})

app.post('/fb', (req, res) => {
  dataTool.readFile(data => {
    data.total++
    data.list.unshift({
      ...req.body,
      id: +new Date(),
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })

    dataTool.writeFile(data, () => {
      res.redirect('/')
    })
  })
})

// 通用的404
app.use((req, res) => {
  res.status(404).render('404.html')
})
