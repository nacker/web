import React from 'react'
import ReactDOM from 'react-dom'

// 导入Mouse组件
import Mouse from './components/Mouse'

// 使用 Mouse 组件（render-props 模式）：
// 1 指定 render 属性
// 2 通过 render 属性（函数）的参数，获取到组件内部的状态
// 3 通过 render 属性（函数）的返回值，来指定最终要渲染页面中的内容
ReactDOM.render(
  <Mouse
    render={({ x, y }) => (
      <p>
        鼠标位置：{x} - {y}
      </p>
    )}
  />,
  document.getElementById('root')
)
