const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, 'data.json')

module.exports = {
  readFile(callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return console.log('读文件失败了', err)
      data = JSON.parse(data)
      callback && callback(data)
    })
  },
  writeFile(data, callback) {
    data = JSON.stringify(data, null, 2)
    fs.writeFile(dbPath, data, err => {
      if (err) return console.log('写文件失败了', err)
      callback && callback()
    })
  }
}