const fs=require('fs')
const path=require('path')

const dbPath=path.join(__dirname,'data.json')

function readFile(callback) {
  fs.readFile(dbPath,'utf8',(err,data)=>{
    if (err) return console.log('读取文件失败了',err)
    // 把读取到的json专转成对象
    data=JSON.parse(data)
    callback && callback(data)
  })
}
function writeFile(data,callback) {
  data=JSON.stringify(data,null,2)
  fs.writeFile(dbPath,data,err=>{
    if (err) return console.log('文件写入失败')
    callback && callback()
  })
}

module.exports={
  readFile,
  writeFile
}