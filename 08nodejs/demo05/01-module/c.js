const num = 200
const add = (a, b) => {
  console.log(a + b)
}

/* 
  在任意的模块中 module.exports表示该模块的导出
  为了我们方便导出， 每个模块中还提供了 exports  exports 初始状态下，和module.exports指向了同一个对象。

  注意点： 如果通过exports的方式来导出内容，只能给对象增加属性 不能替换这个对象
*/
// exports.num = num
// exports.add = add

module.exports = {
  num,
  add
}
