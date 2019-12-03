const fs=require('fs')
const path=require('path')
let filePath=path.join(__dirname,'1.txt')
fs.readFile(filePath,'utf8',(err,data) => {
  if (err) return consol.log(err)
  console.log(data)
})