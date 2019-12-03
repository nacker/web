/* 
  使用函数创建组件：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 创建组件
// 1 组件必须得有返回值
//  1.1 如果不渲染任何内容，就返回 null
//  1.2 如果要渲染内容，就返回 JSX。
// 2 组件名称必须以大写字母开头（React内部以此来区分 普通的 React元素 和 React组件
// function Hello() {
//   return null
// }

// function Hello() {
//   return <h1>这是我的第一个函数组件</h1>
// }

const Hello = () => <div>这是通过箭头函数创建的组件</div>

// 3 使用函数名称作为组件标签名称，来渲染组件
ReactDOM.render(<Hello />, document.getElementById('root'))
