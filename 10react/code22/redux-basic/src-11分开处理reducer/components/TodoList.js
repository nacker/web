/* 
  展示组件：
*/
import React from 'react'

// 组件负责展示UI，state 和 逻辑，直接通过 props 来调用
class TodoList extends React.Component {
  componentDidMount() {
    // 在组件渲染时，就调用异步action，来发送请求获取数据
    this.props.getTodos()
  }

  render() {
    const { loading, todos, error } = this.props

    return (
      <>
        {loading ? <p>数据添加中....</p> : null}
        {error !== '' ? <h2>出现了错误：{error}</h2> : null}
        <ul>
          {todos.map(item => (
            <li key={item.id}>
              <span>{item.text}</span>
              <button>X</button>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default TodoList
