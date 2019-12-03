// 导入fs模块
const fs = require('fs')

/* 
  调用方法写文件
    参数1： 写入的文件的路径
    参数2： 写入的数据  字符串
    参数3： 回调函数，写入完成后的回调函数


  fs.writeFile的特点
    1. 如果该文件不存在，会自动创建, 注意：如果文件所在的路径都没有，不会创建路径
    2. 如果该文件存在，会覆盖

  throw err: 扔出去错误
  try..catch来捕获这个错误
*/
fs.writeFile('/aaa/11.txt', '疑是银河落九天', err => {
  if (err) {
    console.log(err)
  } else {
    console.log('写入成功')
  }
})
