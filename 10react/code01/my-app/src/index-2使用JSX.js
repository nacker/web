// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 2 使用 JSX 语法创建 React元素
// const h1 = <h1>Hello React!!!</h1>
const h1 = (
  <div className="shopping-list">
    <h1>Shopping List</h1>
    <ul>
      <li>Instagram</li>
      <li>WhatsApp</li>
    </ul>
  </div>
)

// 3 渲染 JSX 创建好的React元素
ReactDOM.render(h1, document.getElementById('root'))
