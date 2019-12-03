/* 
  路由模块
*/
const handler = require('./handler')
module.exports = function(req, res) {
  let { url, method } = req
  if (url === '/' || url === '/index') {
    // 首页
    handler.renderIndex(req, res)
  } else if (url === '/add') {
    handler.renderAdd(req, res)
  } else if (url.startsWith('/delete') && method === 'GET') {
    // 删除
    handler.handleDelete(req, res)
  } else if (url.startsWith('/fb') && method === 'POST') {
    // 添加功能
    handler.handlePublish(req, res)
  } else if (url.startsWith('/static')) {
    handler.handleStatic(req, res)
  } else {
    // 404
    handler.handle404(req, res)
  }
}
