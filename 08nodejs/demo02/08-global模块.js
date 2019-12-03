// window是浏览器中的顶级变量，全局变量
// global是nodejs中的顶级变量， 全局变量， global中的所有的东西将来在任意的js文件都可以直接使用。（前提： js文件在node环境）

// console.log('哈哈')

// setInterval(() => {
//   console.log('哈哈1111')
// }, 100)

// setTimeout(() => {
//   console.log('2222')
// }, 1000)

// 获取当前这个js文件的绝对路径
console.log(__dirname)
// 获取当前这个js文件的绝对路径,包括当前文件的名字
console.log(__filename)

/* 

  console.log()打印日志
  定时器和延时器

  __dirname: 打印当前文件的绝对路径
  __filename: 打印当前文件的绝对路径 + 文件名
*/
