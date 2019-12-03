/* 
  2 react           提供UI界面
  3 react-redux     绑定库，用来将 react 和 redux 关联到一起来使用
*/

// 2.1 导入 react
import React from 'react'
import { render } from 'react-dom'

// 2.2 创建 Counter 计数器组件
const Counter = () => {
  return (
    <div>
      <h1>计数器：0</h1>
      <button>+1</button>
    </div>
  )
}

// 2.3 渲染组件
render(<Counter />, document.getElementById('root'))
