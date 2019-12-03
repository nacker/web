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

// 异步 Action
// 也就是：在使用 thunk 中间件的时候，异步操作需要放在 action 中！！！
// 使用 thunk 时，要求 action 返回的是一个函数，而不再是一个对象！！！
const addTodoAsync = function(text) {
  // 返回的函数，可以通过参数拿到 dispatch
  return function(dispatch) {
    console.log('addTodoAsync 中的函数执行了')
    // 异步代码，就放在此处！！！
    setTimeout(() => {
      // 异步操作完成后，最终还是要分发一个同步的action，来执行具体的操作
      // dispatch(addTodo(text))
      dispatch({ type: 'ADD_TODO', text })
    }, 3000)
  }
}

export { addTodo, delTodo, toggleTodo, setVisibilityFilter, addTodoAsync }
