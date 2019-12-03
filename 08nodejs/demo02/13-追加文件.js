const fs = require('fs')

// fs.readFile('1.txt', 'utf8', (err, data) => {
//   if (err) return console.log(err)
//   data += '\n飞流直下三千尺'
//   fs.writeFile('1.txt', data, err => {
//     if (err) return console.log(err)
//     console.log('写入成功')
//   })
// })

fs.appendFile('1.txt', '不及汪伦送我情', err => {
  if (err) return console.log(err) // 发邮件
  console.log('写入成功')
})
