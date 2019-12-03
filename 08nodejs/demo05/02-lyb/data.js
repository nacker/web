const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, 'data.json')

// mvc 架构   mvc
// model: 处理数据
// view: 视图
// controller: 控制业务逻辑
module.exports = {
  // 读取文件， 成功了调用回调函数，并且读取成功的结果传给回调
  readFile(callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log('读取文件失败了', err)
      // 成功了
      data = JSON.parse(data)
      callback && callback(data)
    })
  },
  // data: 需要写入的数据
  // callback： 写入成功后需要处理的代码
  writeFile(data, callback) {
    // 写文件需要把数据变成json
    data = JSON.stringify(data, null, 2)
    fs.writeFile(dbPath, data, err => {
      if (err) return console.log('写文件失败了', err)
      callback && callback()
    })
  }
}
