// 依赖到了一个第三方模块  mysql
// 1. 下载mysql包
// 2. 导入mysql的包
const mysql = require('mysql')

// 3. 创建mysql的连接
const connection = mysql.createConnection({
  // 连接的地址
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'lyb'
})

// 4. 连接上了 lyb这个数据库
connection.connect()

// 5. 实现增删改成  sql
// 参数1： sql语句
// 参数2： 回调函数
// err:如果有err，说明查询失败
// err为空 result就是最终的结果
connection.query('select * from content', (err, result) => {
  if (err) return console.log('数据查询失败', err)
  console.log(result)
})

// 6. 一定要记得关闭连接
connection.end()

/* 
  1. 下载mysql  npm i mysql
  2. 导入  const mysql = require('mysql')
  3. 创建连接  const connection = mysql.createConnection({ host:, port, user, password, database  })
  4. 连接   connection.connect()
  5. 操作sql 做增删改查
  6. 关闭连接
*/
