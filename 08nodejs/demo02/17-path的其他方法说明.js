const path = require('path')

// 获取路径中的文件名
const str = 'aa\\bb\\cc\\dd\\index.html'
console.log(path.basename(str))
console.log(path.dirname(str))
console.log(path.extname(str))
