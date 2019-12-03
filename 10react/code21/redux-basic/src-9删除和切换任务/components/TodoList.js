import React from 'react'
import { connect } from 'react-redux'
import { delTodo, toggleTodo } from '../actions'

// 当组件接收到新的 props 的时候（此处，指的就是 props.todos， 也就是redux中的状态）
// 那么，组件就会被重新渲染（因为组件接收到新props时，就会触发重新渲染）
// 重新渲染时，就可以获取到 redux 中的最新状态
const TodoList = props => {
  return (
    <ul>
      {props.todos.map(item => (
        <li key={item.id}>
          <span
            style={{ textDecoration: item.done ? 'line-through' : 'none' }}
            onClick={() => props.dispatch(toggleTodo(item.id))}
          >
            {item.text}
          </span>
          <button onClick={() => props.dispatch(delTodo(item.id))}>X</button>
        </li>
      ))}
    </ul>
  )
}

// 为了在组件中获取到 redux 中的状态数据，需要传递第一个参数： mapStateToProps
// 参数 state：就是 redux 中的状态
// 注意：函数必须有返回值，返回的是一个对象，这个对象就表示要传递给组件的数据
const mapStateToProps = state => {
  return {
    todos: state
  }
}

export default connect(mapStateToProps)(TodoList)
