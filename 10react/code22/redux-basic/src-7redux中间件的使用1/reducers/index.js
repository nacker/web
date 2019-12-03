import { combineReducers } from 'redux'
import * as actionTypes from '../actionTypes'

// let id = 0

// 处理 todos 任务列表的reducer
// [{ id, text, done }, {}, {}, ...]
const todos = (state = [], action) => {
  // console.log('2 reducer 更新状态', action)
  switch (action.type) {
    // 添加任务
    case actionTypes.ADD_TODO:
      const id = state.length === 0 ? 1 : state[state.length - 1].id + 1
      return [...state, { id, text: action.text, done: false }]

    // 删除任务
    case actionTypes.DELETE_TODO:
      return state.filter(item => item.id !== action.id)

    // 切换任务完成状态
    case actionTypes.TOGGLE_TODO:
      return state.map(item =>
        item.id === action.id ? { ...item, done: !item.done } : { ...item }
      )
    default:
      return state
  }
}

// 创建处理 展示任务状态 数据的reducer
// 注意：这个 动作 仅仅告诉 todos 案例，要展示 什么类型的任务列表
const visibilityFilter = (state = 'all', action) => {
  switch (action.type) {
    case actionTypes.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

// 使用 combineReducers() 合并 reducer 之后，应用的状态就变为一个对象了
// 对象中的键 与 combineReducers参数的键同名
// 比如，当前应用的状态为： { todos: [], visibilityFilter: 'all' }
const rootReducer = combineReducers({
  todos,
  visibilityFilter
})

export default rootReducer
