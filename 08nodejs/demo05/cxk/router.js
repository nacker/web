const handler=require('./handler')
module.exports=function(req,res) {
  let { url, method } = req
  if (url === '/' || url === '/index') {
    // 首页
    handler.renderIndex(req,res)
  } else if (url === '/add') {
    // 渲染add.html
    handler.renderAdd(req,res)
  } else if (url.startsWith('/delete') && method === 'GET') {
    // 删除
    // 获取到id值
    handler.handleDelete(req,res)
  } else if (url.startsWith('/fb') && method === 'POST') {
    // 添加功能
    // 获取参数
    handler.handleFb(req,res)
  } else if (url.startsWith('/static')) {
    // 处理静态资源
    handler.handleStatic(req,res)
  } else {
    // 404
    handler.handle404(req,res)
  }
}