// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 2 使用 JSX 语法创建 React元素
// const h1 = <h1>Hello React!!!</h1>

// 如果一个JSX元素它没有子节点，就可以使用 /> 单标签方式
// const h1 = <div />

function fn() {
  return (
    <div>
      <h1>这是 JSX </h1>
    </div>
  )
}

const h1 = fn()

// 3 渲染 JSX 创建好的React元素
ReactDOM.render(h1, document.getElementById('root'))
