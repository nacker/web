/* 
  使用 bind 方法解决this指向：


  bind() 方法
    1 会创建一个新的函数
    2 绑定新创建函数的this（通过bind方法的第一个参数来指定的）
*/

const obj = {
  age: 19
}

function fn() {
  console.log(this.age)
}

// 直接调用无法获取到 age
// fn()

// 修改函数 fn 中this的指向：
// fn.call(obj)
// fn.apply(obj)

const newFn = fn.bind(obj)
newFn()

// 无法通过 call 或 apply 修改this指向：
// newFn.call({ age: 30 }) // 19
