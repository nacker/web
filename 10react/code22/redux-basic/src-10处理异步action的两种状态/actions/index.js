/* 
  使用 action creator 创建所有的动作
*/
import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER
} from '../actionTypes'

// 添加任务的动作
// 创建添加任务的动作： addTodo('打豆豆') ==> { type: 'ADD_TODO', text: '打豆豆' }
const addTodo = text => ({ type: ADD_TODO, text })

// 删除任务
const delTodo = id => ({ type: DELETE_TODO, id })

// 切换任务状态
const toggleTodo = id => ({ type: TOGGLE_TODO, id })

// 展示不同状态的任务
const setVisibilityFilter = filter => ({ type: SET_VISIBILITY_FILTER, filter })

// ---------------------------------------------------------------------------

// 每一个异步操作，都应该有三种状态：
// 1 异步操作开始（等待中）
// 2 异步操作成功
// 3 异步操作失败

// 异步 Action
const addTodoAsync = function(text) {
  return function(dispatch, getState) {
    // 异步操作开始了
    dispatch({ type: 'ADD_TODO_START' })

    setTimeout(() => {
      const random = Math.random()
      // if (random > 0.5) {
      // 成功
      dispatch({ type: 'ADD_TODO', text })
      // } else {
      //   // 失败
      //   // dispatch({ type: 'ADD_TODO_ERROR', error: '随机数为：' + random })
      // }
    }, 3000)
  }
}

export { addTodo, delTodo, toggleTodo, setVisibilityFilter, addTodoAsync }
