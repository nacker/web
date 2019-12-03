// import { combineReducers } from 'redux'
import * as actionTypes from '../actionTypes'

const init = {
  // 列表数据
  todos: [],
  // 加载状态
  loading: false,
  // 错误消息
  error: ''
}

const rootReducer = (state = init, action) => {
  switch (action.type) {
    // 添加任务
    case actionTypes.ADD_TODO:
      const id = state.length === 0 ? 1 : state[state.length - 1].id + 1
      return {
        ...state,
        todos: [...state.todos, { id, text: action.text, done: false }]
      }

    // 开始获取列表数据
    case 'GET_TODOS_START':
      return {
        ...state,
        loading: true
      }

    // 获取列表成功
    case 'GET_TODO':
      return {
        ...state,
        todos: action.todos,
        loading: false
      }

    // 获取数据失败
    case 'GET_TODO_ERROR':
      return {
        ...state,
        loading: false,
        error: action.err.message
      }

    default:
      return state
  }
}

// 使用 combineReducers() 合并 reducer 之后，应用的状态就变为一个对象了
// 对象中的键 与 combineReducers参数的键同名
// 比如，当前应用的状态为： { todos: [], visibilityFilter: 'all' }
// const rootReducer = combineReducers({
//   todos,
//   loading,
//   error
// })

export default rootReducer
