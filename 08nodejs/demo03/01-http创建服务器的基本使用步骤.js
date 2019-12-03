/* 
  1. 导入这个http模块
  2. 通过http模块创建服务器
*/
// 1. 导入这个http模块
const http = require('http')

// 2. 创建服务器, 返回一个服务器对象
const server = http.createServer()

// 3. 启动服务器, 必须监听一个端口   0-65535之间
// 参数1：占用的端口
// 参数2：启动的回调函数
server.listen(8888, () => {
  console.log('恭喜你，服务器启动成功了')
})

// 4. 服务器需要处理用户的响应
// on表示注册事件
// 参数1： 注册一个用户请求的事件  只要用户发送了请求，request就会触发
server.on('request', (req, res) => {
  // console.log() 仅仅是在控制台打印了消息，，，，你还是没有给浏览器响应
  console.log('来了老弟')
  // end可以结束请求
  res.end('hello old brother')
})

/* 
  1. 导入http模块
  2. 创建服务器  http.createServer()
  3. 启动： server.listen(8888, () =>{ console.log('服务器启动成功') })
  4. 注册事件： server.on('request', ()=>{})
*/
