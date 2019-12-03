/* 
  express-session步骤：
    1. 下载  npm i express-session
    2. 导入  const session = require("express-session")
    3. 使用session中间件
      app.use(session({
        secret: 'itcast',
        // 设置浏览器端cookie的名字， 默认connect.sid
        name: 'itcast',
        resave: false,
        // 在浏览器和服务器连接的第一时间，分配session  给浏览器指定一个cookie
        saveUninitialized: true
      }))
      可以通过req.session访问到session
    4. 登录成功，把登录成功的用户信息存储到 req.session.xxx中
    5. 提供一个中间件，这个中间件在路由的前面，判断 req.session.xxx是否有值，有值，放走，没值，去登录，细节： 如果是/login 直接放走
    6. 退出功能：  把req.session.xxx 清空即可


    以后登录和退出
      1. 登录做什么  把用户名和密码给服务器
      2. 退出做什么， 1. 告诉服务器，要退出   2.（清缓存也行）

*/

// 创建服务器
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

// 导入路由对象
const router = require('./router')
const app = express()

app.listen(9999, () => {
  console.log('服务器启动成功了')
})

// express-session会在第一个请求服务器的时候，和浏览器分配一个cookie. session中没有个人信息
app.use(
  session({
    // 给cookie中存储的sessionid加密的， 可以随意指定一个字符串
    secret: 'itcast',
    // 设置浏览器端cookie的名字， 默认connect.sid
    name: 'itcast',
    resave: false,
    // 在浏览器和服务器连接的第一时间，分配session  给浏览器指定一个cookie
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
)

// 处理中间件
// 1. 静态资源
app.use('/static', express.static('static'))
// 2. 设置模版引擎
app.engine('html', require('express-art-template'))
// 设置模版的默认目录  views
// 3. post参数的中间件
app.use(bodyParser.json()) // 处理json数据
app.use(bodyParser.urlencoded({ extended: true })) // 处理表单数据

// 判断req.session中是否有user
app.use((req, res, next) => {
  // 判断req.session中是否有user前提，不访问登录，如果访问登录页，直接next()
  // if (req.url === '/login') {
  //   next()
  // }
  if (!req.session.user && req.url !== '/login') {
    // 没有
    res.redirect('/login')
  } else {
    // 有登录信息，继续给下一个中间件
    next()
  }
})

// 把router对象和app绑定了
app.use(router)
