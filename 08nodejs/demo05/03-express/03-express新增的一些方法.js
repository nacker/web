/* 
  res.send() 发送一段文本  可以是字符串 数组 对象 都自动设置content-type
  res.sendFile(path) 发送一个文件的，  都自动设置content-type
  res.redirect('/')  重定向 


  app.use(path, (req, res) => {})  :处理路由, 只要求路径 包含path

  express.static('static') : 把某个文件夹设置成静态资源目录   把static设置为静态资源目录

  // 只有所有的访问静态资源的路径会匹配到静态
  app.use('/static',express.static('static'))
 */
