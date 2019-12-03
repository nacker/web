/* 
  nodejs中模块分为3大类
    1. nodejs本身提供的核心模块   fs http path url querystring
      核心模块不需要安装，直接导入即可。
      核心模块的加载语法： const fs = require('fs')
    
    2. 第三方模块  mime art-template
      第三方模块： 必须先安装（npm install XXX）  才能导入
      第三方模块的加载语法： npm install XXX   const mime = require('mime')
    
    3. 自定义的模块 一个js文件 
      不需要安装  只需要自己创建一个js文件
      自定义模块的加载语法：  require('模块的路径')  模块不能是名字，必须是路径  ./ ../ .js后缀是可以省略
*/
const path = require('path')
const mime = require('mime')
require('./a')
require('./b')

/* 
  require加载规则
  1. 判断是否是路径， 如果是  就是自定义模块
  2. 如果是名字 判断是否是核心模块
  3. 如果是第三方模块  在当前目录找node_modules
  4. 在node_modules中查找mime文件夹
  5. 查找是否有package.json， 查看是否main属性
  6. 判断是否有main, 如果没有，默认查找index.js  index.json index.node
  7. 如果没有
  8. 如果找不到，就去上一层目录，一直找到根目录
  9， 如果还没有，就说明模块不存在

*/
