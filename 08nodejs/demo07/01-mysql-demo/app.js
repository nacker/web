const db = require('./db')

// db.getAll(result => {
//   console.log(result)
// })

// db.addOne(
//   {
//     name: 'xxf',
//     title: '西西弗',
//     content: '福西西',
//     time: new Date()
//   },
//   () => {
//     console.log('添加成功了')
//   }
// )

db.deleteOneById(5, () => {
  console.log('删除成功')
})
