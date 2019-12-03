// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 2 创建 React 元素
// const h1 = React.createElement('h1', null, 'Hello React！')
const h1 = React.createElement(
  'div',
  { className: 'shopping-list' },
  React.createElement('h1', null, 'Shopping List'),
  React.createElement(
    'ul',
    null,
    React.createElement('li', null, 'Instagram'),
    React.createElement('li', null, 'WhatsApp')
  )
)

// 3 渲染 React 元素
ReactDOM.render(h1, document.getElementById('root'))
