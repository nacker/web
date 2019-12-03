// const fs = require('fs')
// console.log(1)
// fs.readFile('1.txt', 'utf8', (err, data) => {
//   if (err) return console.log(err)
//   console.log(2)
//   console.log(data)
// })
// console.log(3)

// const fs = require('fs')

// console.log(1)
// // 同步的方法, 阻塞代码的执行，等到返回值
// const result = fs.readFileSync('1.txt', 'utf8')
// console.log(2)
// console.log(result)
// console.log(3)

const fs = require('fs')
fs.unlink('1.txt', err => {
  if (err) return console.log(err)
  console.log('删除成功了')
})
