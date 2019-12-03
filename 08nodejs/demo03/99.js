

const http=require('http')
const fs=require('fs')
const path=require('path')
const mime=require('mime')

const server=http.createServer()

server.listen(7777,()=>console.log('服务器已启动'))

server.on('request',(req,res)=>{
  let url=req.url
  if (url.startsWith('/www')) {
    const filePath=path.join(__dirname,url)
    fs.readFile(filePath,(err,data)=>{
      if (err) {
        res.statusCode=404
        res.end('404')
      } else {
        res.setHeader('content-type',mime.getType(url))
        res.end(data)
      }
    })
  } else {
    res.statusCode=404
    res.end('404')
  }
})