/* 
  容器组件：
*/
import { connect } from 'react-redux'
import { delTodo, toggleTodo } from '../actions'

// 导入展示组件
import TodoList from '../components/TodoList'

// 提供状态：
const mapStateToProps = state => {
  return {
    todos: state
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
