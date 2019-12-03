/* 
  redux 负责：提供 state 以及 操作state的方法
  react 负责：页面展示（UI）

  react-redux 是官方提供的绑定库（链接库），用来将 redux 和 react 绑定在一起使用
*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// store
import { createStore } from 'redux'
import reducer from './reducers'

// App 组件
import App from './components/App'

// 初始化状态
const initialState = JSON.parse(localStorage.getItem('todos'))

// 创建store
const store = createStore(reducer, initialState)

store.subscribe(() => {
  localStorage.setItem('todos', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
