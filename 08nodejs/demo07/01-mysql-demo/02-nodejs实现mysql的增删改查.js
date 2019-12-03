// 查
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'lyb'
})
connection.connect()

// 操作数据库
// 查询所有数据
// sql注入: 一种攻击数据库手段
// 占位符
const name = 'hcc'
const title = '哈哈哈'
// 参数1： sql语句 不确定的使用占位符
// 参数2： 提供给占位符的数据
// 参数3：回调函数
// connection.query(
//   `select * from content where name = ? AND title = ?`,
//   [name, title],
//   (err, result) => {
//     if (err) return console.log(err)
//     // 查询到的所有的数据
//     console.log(result)
//   }
// )

// connection.query(
//   'update content set name=? where id = ?',
//   ['西西弗', 1],
//   (err, result) => {
//     if (err) return console.log(err)
//     console.log(result)
//   }
// )

// connection.query('delete from content where id = ?', 3, (err, result) => {
//   if (err) return console.log(err)
//   console.log(result)
// })

//
connection.query(
  'insert into content set ?',
  {
    name: 'zs',
    title: '嘻嘻',
    content: '哈哈',
    time: new Date()
  },
  (err, result) => {
    console.log(result)
  }
)

connection.end()
