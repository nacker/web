/* 
  模块需要有导出， 这样的话，导入这个模块的时候，才能够使用
  1. 每个模块中定义的变量和函数都是私有的，别的模块不能使用
*/
const result = require('./b')
console.log(result.num)
result.fn()
