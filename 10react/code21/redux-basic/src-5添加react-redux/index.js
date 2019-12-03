/* 
  redux 负责：提供 state 以及 操作state的方法
  react 负责：页面展示（UI）

  react-redux 是官方提供的绑定库（链接库），用来将 redux 和 react 绑定在一起使用
*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

import './index.css'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

const App = props => {
  console.log('App 组件：', props)
  return (
    <div>
      {/* 添加任务 */}
      <AddTodo />

      {/* 任务列表 */}
      <TodoList />
    </div>
  )
}

// 创建store
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
