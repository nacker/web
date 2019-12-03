// 除了global模块中的东西，可以直接使用
// nodejs提供的其他模块，想要使用必须先导入
// 导入fs模块
const fs = require('fs')

/* 
  fs中提供了大量文本操作的方法
    参数1： 读取的文件的路径
    参数2： 回调函数   读文件是一个异步操作， 回调会在文件读取结束后，会执行
      err: 如果为null,表示没有错误信息， 读取文件成功
      data: 表示读取到的文件的内容（二进制） 可以调用toString()方法就可以转换成字符串
*/

// fs.readFile('./1.txt', (err, data) => {
//   // node: 错误优先， 优先处理错误信息
//   if (err) {
//     console.log('读取文件失败了', err)
//     return
//   }
//   console.log(data.toString())
// })

// 参数1： 文件的路径
// 参数2： 文件的编码（可选的） utf8  如果指定编码，会自动把读取到的内容编程字符串
// 参数3： 回调函数
fs.readFile('1.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
})

/* 
  fs.readFile('路径', (err, data) => {
    // 得到是buffer
  })

  fs.readFile('路径', 'utf8', (err, data) => {
    data是一个字符串
  })
*/
