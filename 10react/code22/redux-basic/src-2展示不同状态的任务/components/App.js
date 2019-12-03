import React from 'react'

import '../index.css'

import AddTodo from './AddTodo'
import TodoListContainer from '../containers/TodoListContainer'
import FooterContainer from '../containers/FooterContainer'

const App = () => {
  return (
    <div>
      {/* 添加任务 */}
      <AddTodo />

      {/* 任务列表 */}
      <TodoListContainer />

      {/* 底部 */}
      <FooterContainer />
    </div>
  )
}

export default App
