// 创建了一个路由对象
const router = require('express').Router()
const db = require('./db')
const moment = require('moment')
// 处理路由
router.get('/', (req, res) => {
  console.log(req.session)
  db.getAll(result => {
    // result.forEach(item => {
    //   item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
    // })
    res.render('index.html', { list: result })
  })
  // res.send('哈哈')
})
router.get('/add', (req, res) => {
  // console.log(req.session)
  res.render('add.html')
})

router.get('/delete', (req, res) => {
  // 获取id
  const id = req.query.id
  // 删除对应id数据
  db.deleteOneById(id, () => {
    res.redirect('/')
  })
})

router.post('/fb', (req, res) => {
  const query = {
    ...req.body,
    time: new Date()
  }
  db.addOne(query, () => {
    res.redirect('/')
  })
  // res.send('11')
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  db.findUser(username, password, result => {
    if (result.length > 0) {
      // 登录成功
      // 登录成功了，把当前用户的信息，保存到req.session中
      req.session.user = req.body
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })
  // res.send('11')
})

router.get('/logout', (req, res) => {
  // 把session中的用户信息清空
  req.session.user = null
  // 跳到登录页
  res.redirect('/login')
})
module.exports = router
