// 处理异常
// try catch  throw

// ajax  url必须传入
// child必须是一个节点
// document.appendChild(child)
const add = function(a, b) {
  // 假设a和b是两个非常重要的参数
  if (arguments.length < 2) {
    throw new Error('参数个数不对，必须2个参数')
  }
  console.log(a + b)
}

try {
  add()
} catch (e) {
  console.log(e)
}

console.log('呵呵')
