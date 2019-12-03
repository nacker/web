import React from 'react'

import '../index.css'

import AddTodo from './AddTodo'
import TodoListContainer from '../containers/TodoListContainer'

const App = props => {
  return (
    <div>
      {/* 添加任务 */}
      <AddTodo />

      {/* 任务列表 */}
      <TodoListContainer />
    </div>
  )
}

export default App
