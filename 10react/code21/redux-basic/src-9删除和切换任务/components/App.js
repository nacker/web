import React from 'react'

import '../index.css'

import AddTodo from './AddTodo'
import TodoList from './TodoList'

const App = () => {
  return (
    <div>
      {/* 添加任务 */}
      <AddTodo />

      {/* 任务列表 */}
      <TodoList />
    </div>
  )
}

export default App
