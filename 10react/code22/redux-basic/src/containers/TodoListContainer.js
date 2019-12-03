/* 
  容器组件：
*/
import { connect } from 'react-redux'

import { getTodosAsync } from '../actions'

// 导入展示组件
import TodoList from '../components/TodoList'

const mapStateToProps = state => {
  return {
    todos: state.todos,
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTodos() {
      dispatch(getTodosAsync())
    }
  }
}

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default TodoListContainer
