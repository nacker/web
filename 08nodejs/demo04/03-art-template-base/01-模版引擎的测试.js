// npm install art-template --save
// 早期的npm版本， 本地安装  必须加上  --save 或者  -S， 只有这样安装的包，才会记录到dependencies

// 现在的npm版本，默认就是--save 不需要再加上这个参数
const template = require('art-template')
const path = require('path')

// 参数1： 在浏览器， 是模版的id  在node中，整个文件就是模版，直接时模版的路径即可,注意：路径需要使用绝对路径
// 参数2： 提供数据 对象
const filePath = path.join(__dirname, 'index.html')
const html = template(filePath, { name: 'zs', friends: ['zs', 'ls', 'ww'] })
console.log(html)

/* 
  1. 安装   npm i art-template
  2. 导入   const template = require('art-template')

  3. 准备数据  （查数据库，，，，，查文件）
  4. 准备模版  文件
  5. 结合  const html = template(模版的路径（绝对）， 数据)
  6. 直接渲染好的结构丢给浏览器

*/
