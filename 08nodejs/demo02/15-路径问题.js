// window ： 使用的 \  也支持 /
// linux:  使用的 /

// aa/bb/cc/index.html
// "aa\\bb\\cc\\index.html"
// "aa/bb/cc/index.html"

// path.join() 作用：拼接路径，自动根据系统使用/或者\
const path = require('path')
console.log(path.join('aa', 'bb', 'cc', 'dd.html'))
