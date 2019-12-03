/* 
  db.js  需要提供好整个留言板项目中所有的功能

  1. 查询所有的留言  
  2. 增加留言板
  3. 根据id删除留言
  4. 根据id查询某一条留言的详情
  5. 修改留言
*/
const mysql = require('mysql')
const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'lyb'
}

function query(sql, params, callback) {
  const connection = mysql.createConnection(config)
  connection.connect()
  connection.query(sql, params, (err, result) => {
    callback && callback(err, result)
  })
  connection.end()
}

// 查询所有的留言
// function getAll(callback) {
//   // 1. 创建连接
//   const connection = mysql.createConnection(config)
//   // 2. 连接
//   connection.connect()
//   // 3. 执行sql
//   connection.query('select * from content order by id desc', (err, result) => {
//     if (err) return console.log(err)
//     callback && callback(result)
//   })
//   // 4. 关闭连接
//   connection.end()
// }

// 查询所有的留言
function getAll(callback) {
  // 3. 执行sql
  query('select * from content order by id desc', null, (err, result) => {
    if (err) return console.log(err)
    callback && callback(result)
  })
}

// 增加留言
function addOne(data, callback) {
  // 3. 执行sql
  query('insert into content set ?', data, (err, result) => {
    if (err) return console.log(err)
    callback && callback()
  })
}

function deleteOneById(id, callback) {
  query('delete from content where id = ?', id, (err, result) => {
    if (err) return console.log(err)
    callback && callback()
  })
}

function findUser(username, password, callback) {
  query(
    'select * from user where username = ? and password = ?',
    [username, password],
    (err, result) => {
      if (err) return console.log(err)
      callback && callback(result)
    }
  )
}

module.exports = {
  getAll,
  addOne,
  deleteOneById,
  findUser
}
