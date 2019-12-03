// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 2 在 JSX 中使用 JS 数据

// const name = 'pm2.5'
// const h1 = <div>Hello {name}</div>

// JS表达式：有值。
//  所有的 JS 类型的值，都是表达式。
//  数据类型通过 运算符 拼接在一起，也是 表达式
// const h1 = <div>Hello {'pm2.5'}</div>
// const h1 = <div>Hello {25}</div>
// const h1 = <div>Hello {25}</div>
// const h1 = <div>Hello {true + ''}</div>
// const h1 = <div>Hello {1 + 3 + 8 + 'aaa'}</div>
// const h1 = <div>Hello {Math.random() > 0.5 ? '大于0.5' : '小于等于0.5'}</div>
function fn() {
  return 1 + 2
}
const h1 = <div>Hello {fn()}</div>

// 注意：不能在 {} 中使用语句！！！
// const h1 = <div>{ if (true) {} }</div>
// const h1 = <div>{ for (;;) {} }</div>
// const h1 = <div>{ const a = 1 }</div>

// 3 渲染 JSX 创建好的React元素
ReactDOM.render(h1, document.getElementById('root'))
