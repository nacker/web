const fs = require('fs')
fs.readFile('11.txt', (err, data) => {
  // node中如果有错误，需要解决
  // 1. 打印这个错误信息， 并且阻止代码继续执行
  // 2. throw err
  // console.log(err)
  if (err) return console.log(err)
  console.log(data.toString())
})

fs.readFile('1.txt', (err, data) => {
  // node中如果有错误，需要解决
  // 1. 打印这个错误信息， 并且阻止代码继续执行
  // 2. throw err
  // console.log(err)
  if (err) throw err
  console.log(data.toString())
})
