/* 
  容器组件：
*/
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { delTodo, toggleTodo } from '../actions'

// 导入展示组件
import TodoList from '../components/TodoList'

// 根据展示任务的类型，来过滤数据：
const getFilterTodos = (filter, todos) => {
  if (filter === 'all') {
    return todos
  } else if (filter === 'active') {
    return todos.filter(item => !item.done)
  } else if (filter === 'completed') {
    return todos.filter(item => item.done)
  }
}

// 提供状态：
// 因为使用了 路由，所以，现在就可以通过 路由参数 来得到要渲染的任务类型了
// 问题：如何在 mapStateTopProps 中获取到路由参数？？？
// 就是通过 ownProps 这个参数，就可以获取到传递给高阶组件 connect 的参数了
const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter
  console.log('TodoList 容器组件中的 mapStateToProps 调用了', filter)
  return {
    todos: getFilterTodos(filter, state.todos)
  }
}

// 提供方法：
const mapDispatchToProps = dispatch => {
  return {
    // 根据id删除任务
    del(id) {
      // console.log('要删除任务id：', id)
      dispatch(delTodo(id))
    },
    // 根据id切换任务状态
    toggle(id) {
      dispatch(toggleTodo(id))
    }
  }
}

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default withRouter(TodoListContainer)
