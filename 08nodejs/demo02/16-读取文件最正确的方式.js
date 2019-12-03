const fs = require('fs')
const path = require('path')
let filePath = path.join(__dirname, '1.txt')
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) return console.log(err)
  console.log(filePath)
  console.log(data)
})
