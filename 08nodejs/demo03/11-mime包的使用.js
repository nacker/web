// mime不是nodejs自己提供的核心模块， 是第三方模块
// 如果是第三方模块，必须先下载， 才能引入
const mime = require('mime')

// 获取mime类型
// 参数：后缀名， 也可以是一个url的路径，自动获取后缀
// 返回值： mime类型
// mime.getType()
console.log(mime.getType('aa/index.png'))
console.log(mime.getType('html'))
console.log(mime.getType('css'))
console.log(mime.getType('js'))
console.log(mime.getType('jpg'))
console.log(mime.getType('png'))
console.log(mime.getType('json'))
