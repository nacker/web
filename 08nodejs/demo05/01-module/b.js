/* 
  1. 模块中定义的变量和函数都是私有的
  2. 任意的一个模块中， 都有自带一个属性 module (全局属性) module代表的就是当前的这个模块。
  3. module中有一个属性  exports ,这个exports属性是一个对象，代表的就是当前模块的导出 module.exports当前模块唯一能够被外界访问到的

*/
const num = 100
const fn = () => {
  console.log('哈哈')
}

// 把module.exports给覆盖了， 只能对外导出一个值
// module.exports = num
// module.exports = fn

// 给module.exports 增加了两个属性
// module.exports.num = num
// module.exports.fn = fn

module.exports = {
  num,
  fn
}

/* 
  通过module.exports对外导出一些值
  module.exports = 值  只能导出一个值
  module.exports = {}  可以把所有要导出的内容都放到一个新的对象中
  module.export.xxx = 值

*/
