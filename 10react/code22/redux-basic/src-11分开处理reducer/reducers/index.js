import { combineReducers } from 'redux'
import * as actionTypes from '../actionTypes'

const init = {
  todos: [],
  loading: false,
  error: ''
}

const todos = (state = [], action) => {
  switch (action.type) {
    // 添加任务
    case actionTypes.ADD_TODO:
      const id = state.length === 0 ? 1 : state[state.length - 1].id + 1
      return [...state, { id, text: action.text, done: false }]

    // 获取任务列表数据
    case 'GET_TODO':
      return action.todos

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    // 异步操作开始，开启loading，因此，state为true
    case 'ADD_TODO_START':
      return true
    // 异步操作成功，关闭loading，因此，state为false
    case 'ADD_TODO':
      return false

    // 处理获取todos数据：
    case 'GET_TODOS_START':
      return true

    case 'GET_TODO':
    case 'GET_TODO_ERROR':
      return false

    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case 'GET_TODO_ERROR':
      return action.err.message
    default:
      return state
  }
}

// 使用 combineReducers() 合并 reducer 之后，应用的状态就变为一个对象了
// 对象中的键 与 combineReducers参数的键同名
// 比如，当前应用的状态为： { todos: [], visibilityFilter: 'all' }
const rootReducer = combineReducers({
  todos,
  loading,
  error
})

export default rootReducer
