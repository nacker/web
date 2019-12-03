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
// 全部：   all
// 已完成： completed
// 未完成： active
//
// 注意：该 动作 需要一个表示不同任务的参数，将来可以根据这个参数来展示不同状态的任务列表数据
// setVisibilityFilter('all') ==> { type: 'SET_VISIBILITY_FILTER', filter: 'all' }
const setVisibilityFilter = filter => ({ type: SET_VISIBILITY_FILTER, filter })

export { addTodo, delTodo, toggleTodo, setVisibilityFilter }
