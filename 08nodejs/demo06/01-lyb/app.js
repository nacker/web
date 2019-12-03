/* 
  express中如何使用art-template
    1. 安装  npm i art-template express-art-template
    2. 给app设置好模版  app.engine('html', require('express-art-template'))
    3. res.render(模版的路径, 数据)

  原生nodejs中使用模版引擎
    1. 安装  npm i art-template
    2. 导入  const template = require('art-template')
    3. 渲染页面  const html = template(模版的路径, 数据)
    4. 设置请求头 res.setHeader('content-type', 'text/html')
    5. 丢回去： res.end(html)




  body-parser中间件的使用说明
    1. 安装  npm i body-parser
    2. 导入  var bodyParser = require('body-parser')
    3. 使用
    app.use(bodyParser.urlencoded({ extended: true })); // 解析表单数据
    app.use(bodyParser.json());
*/
// 启动服务器
const path = require('path')
const querystring = require('querystring')
const moment = require('moment')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// 给app设置一个模版引擎
// art-tempalte: 模版文件默认后缀可以是html  也可以是 art
// 参数1： 指定模版文件的后缀名
// 参数2： 加载 express-art-template  会把模版引擎和express绑定好
app.engine('html', require('express-art-template'))
// 把模版引擎的默认路径改成 /pages
app.set('views', 'pages')
// 设置模板文件的后缀为 html
// app.set('view engine', 'html')

const dataTool = require('./dataTool')

app.listen(8888, () => {
  console.log('服务器启动成功了')
})

// 处理静态资源
// 把public设置为静态资源目录   /static 资源的路径中带了/static
app.use('/static', express.static('public'))

// 中间件的目的： 解析所有post请求中的请求体，添加给req.body
// app.use((req, res, next) => {
//   // req.body有post参数的值
//   let result = ''
//   req.on('data', chunk => {
//     result += chunk
//   })
//   req.on('end', () => {
//     req.body = querystring.parse(result)
//     next()
//   })
// })
// app.use(bodyParser.json()) // 处理json数据
app.use(bodyParser.urlencoded({ extended: false })) // 处理表单数据

// 处理首页
app.get('/', (req, res) => {
  // 返回index.html页面
  // 数据
  // 模板
  dataTool.readFile(data => {
    // const filePath = path.join(__dirname, 'views', 'index.html')
    // 使用模版引擎来渲染页面
    // 参数1：模版的地址
    // 模版引擎的路径，推荐使用绝对路径，也可以是相对路径，
    // 如果使用相对路径，会默认去当前目录的views的文件夹下面查找
    res.render('index.html', data)
  })
})

app.get('/index', (req, res) => {
  res.redirect('/')
})

app.get('/add', (req, res) => {
  res.render('add.html')
})

app.get('/delete', (req, res) => {
  // 获取到id
  // express直接给req增加了  req.query(get请求的参数)    req.body(post)
  const id = req.query.id
  // 读取数据
  dataTool.readFile(data => {
    // 删除data中的id对应的数据
    data.total--
    data.list = data.list.filter(item => item.id !== +id)
    // 写回去
    dataTool.writeFile(data, () => {
      // 成功了，重定向到 /
      res.redirect('/')
    })
  })
})

app.post('/fb', (req, res) => {
  // req.body
  // console.log(req.body)
  // res.send('ok')
  const newData = req.body
  dataTool.readFile(data => {
    data.total++
    data.list.unshift({
      ...newData,
      id: +new Date(),
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })

    dataTool.writeFile(data, () => {
      res.redirect('/')
    })
  })
})

/* 
  1. 安装 npm i art-template express-art-template
  2. 设置模版引擎  app.engine('html', require('express-art-template'))
  3. 如果模版的目录不在views  app.set('views', 'pages')
  4. 以后想要渲染页面，  res.render(相对路径, 数据)
*/

// 提供404
app.use((req, res) => {
  res.status(404).render('404.html')
})
