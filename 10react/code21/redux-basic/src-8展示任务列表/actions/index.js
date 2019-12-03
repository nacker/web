/* 
  使用 action creator 创建所有的动作
*/
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from '../actionTypes'

// 添加任务的动作
// 创建添加任务的动作： addTodo('打豆豆') ==> { type: 'ADD_TODO', text: '打豆豆' }
const addTodo = text => ({ type: ADD_TODO, text })

// 删除任务
const delTodo = id => ({ type: DELETE_TODO, id })

// 切换任务状态
const toggleTodo = id => ({ type: TOGGLE_TODO, id })

export { addTodo, delTodo, toggleTodo }
