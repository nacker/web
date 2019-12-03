/* 
  容器组件：
*/
import { connect } from 'react-redux'
import { delTodo, toggleTodo } from '../actions'

// 导入展示组件
import TodoList from '../components/TodoList'

// 提供状态：
// 注意：此处的状态为 整个应用的所有状态，在合并 reducer 后，变为 一个对象
// 而 对象 中的 todos 才是当前组件中需要的数据
const mapStateToProps = state => {
  // console.log('容器组件：', state)
  return {
    todos: state.todos
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
