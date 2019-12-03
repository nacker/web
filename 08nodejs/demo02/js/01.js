const fs = require('fs')

// 相对路径  ./  相对的执行node命令的目录
// 希望./相对于当前的js文件  __dirname : 当前js的路径

// 读取获取写入文件的时候，不推荐使用相对路径，相对于执行node命令的目录
// 希望相对于当前的js文件   __dirname就获取到了当前的js文件的路径
console.log(__dirname)
fs.readFile(__dirname + '\\data.txt', 'utf8', (err, data) => {
  if (err) return console.log(err)
  console.log(data)
})
