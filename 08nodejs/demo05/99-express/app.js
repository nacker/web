const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const momnet=require('moment')
const app =express()

// 给我们的app设置一个模板引擎
// 参数一：指定模板文件后缀名 
// 参数二：加载express-art-template，会把express和模板引擎绑定好
app.engine('html',require('express-art-template'))

const dataTool=require('./dataTool')
app.listen(7777,()=>{
  console.log('服务器启动成功')
})

// 处理静态资源目录
app.use('/static',express.static('static'))

// 中间件的使用
app.use(bodyParser.json())  // 处理json数据
app.use(bodyParser.urlencoded({ extended: true })) //处理表单数据

// 处理首页
app.get('/',(req,res)=>{
  dataTool.readFile((data)=>{
   const filePath=path.join(__dirname,'views','index.html')
   // 参数一：模板的地址   参数二：数据
   res.render(filePath,data)
  })
})

//重定向到 /
app.get('/index',(req,res)=>{
  res.redirect('/')
})


// 处理添加页
app.get('/add',(req,res)=>{
  const filePath=path.join(__dirname,'views','add.html')
  res.sendFile(filePath)
})

// 处理删除
app.get('/delete',(req,res)=>{
  // 获取id
  const id = req.query.id
  dataTool.readFile(data=>{
    data.total--
    data.list=data.list.filter(item=>item.id !== +id)
    dataTool.writeFile(data,()=>{
      res.redirect('/')
    })
  })
})

app.post('/fb',(req,res)=>{
  const newData= req.body
  dataTool.readFile(data=>{
    dataTool.total++
    data.list.unshift({
      ...newData,
      id:+new Date(),
      time:momnet().format('YYYY-MM-DD HH:mm:ss')
    })
    dataTool.writeFile(data,()=>{
       res.redirect('/')
    })
  })
})