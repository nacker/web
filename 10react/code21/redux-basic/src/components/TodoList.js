/* 
  展示组件：
*/
import React from 'react'

// 组件负责展示UI，state 和 逻辑，直接通过 props 来调用
const TodoList = props => {
  return (
    <ul>
      {props.todos.map(item => (
        <li key={item.id}>
          <span
            style={{ textDecoration: item.done ? 'line-through' : 'none' }}
            onClick={() => props.toggle(item.id)}
          >
            {item.text}
          </span>
          <button onClick={() => props.del(item.id)}>X</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
