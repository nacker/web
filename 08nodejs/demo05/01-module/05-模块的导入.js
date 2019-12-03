/* 
  在nodejs中通过 require()可以导入一个模块
  如果这个模块有导出，可以通过一个变量来接收


  模块的加载规则
    1. 判断加载的是一个路径还是一个名字
    2. 如果是路径，说明加载是自定义模块， 根据路径找到对应的文件即可
    3. 如果不是路径，是名字， 说明加载的是核心模块或者是第三方模块
    4. 先判断是否是核心模块， 如果不是，说明是第三方模块
    5. 去node_modules中查找是否有第三方模块
    6. 在对应的第三方模块中， 查找package.json文件， 查找main属性, 如果没有main属性，默认为index.js文件
    7. 找到了index.js文件，执行这个文件
*/
// const fs = require('./fs')
// const result = require('./c')
// console.log(result)
require('fs')
const mime = require('mime')
// console.log(mime.getType('txt'))
// const template = require('art-template')
