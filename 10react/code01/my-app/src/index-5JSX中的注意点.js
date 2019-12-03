// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 2 在 JSX 中使用 JS 数据

// JSX 自身也是表达式
// const span = <span>React</span>
// const h1 = <h1>Hello {span}</h1>

// 注意：不能直接在 {} 中使用对象，除了 style 属性以外！！！
// const obj = {
//   name: 'pm'
// }
// const h1 = <h1>Hello {obj}</h1>

// const obj = {
//   name: 'pm'
// }
// obj.name 是一个合法的JS表达式。
// const h1 = <h1>Hello {obj.name}</h1>

const arr = ['pink', 'hotpink', 'yellow']
// const h1 = <h1>{arr}</h1>
const h1 = <h1>{arr.join()}</h1>

// 3 渲染 JSX 创建好的React元素
ReactDOM.render(h1, document.getElementById('root'))
