/* 
  1. express创建服务器的四个步骤
    const express = require("express")
    const app = express()
    app.listen(8888, ()=> {})
    app.get('/', (req, res) => {} )\

  2. express本身的功能
    express.static('static') 处理静态资源

    // 专门用来处理静态资源的中间件
    // 如果是以/static 开始，中间件能就够生效
    // 如果static中能够访问的内容，直接给响应
    app.use('/static', express.static('static'))

  2. app中的方法

    // 必须注册了引擎引擎  才能使用 res.render()
    app.engine(ext, callback)  注册模版引擎 
    app.engine('html',  require('express-art-template')) 

    app.get('/') 处理get请求
    app.post('/') 处理post请求
    app.use((req, res, next)=> {    next()})   配中间件使用  如果是自己定义的中间件，千万不要忘了next

    // 设置模版引擎默认的目录
    app.set('views', 'views')

  3. req中的属性
    req.ip : 获取ip
    req.url:  url地址
    req.query: 获取get请求的参数，，，不用任何处理
    req.body: 获取post请求的参数，默认是undefined，必须配合中间件

  4. res中常用属性和方法

    res.end()  结束响应
    res.send('11') 响应一段文本， 会自动设置响应头 
    res.sendFile( ) 响应一个文件 会自动设置响应头  他返回是静态的
    res.render()  配合模版引擎进行渲染
    res.redirect() 重定向 
    res.status() 设置状态码
*/
