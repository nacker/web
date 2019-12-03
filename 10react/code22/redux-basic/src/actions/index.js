import axios from 'axios'

import { ADD_TODO } from '../actionTypes'

// 添加任务的动作
const addTodo = text => ({ type: ADD_TODO, text })

// ---------------------------------------------------------------------------

// 每一个异步操作，都应该有三种状态：
// 1 异步操作开始（等待中）
// 2 异步操作成功
// 3 异步操作失败

// 异步 Action
const addTodoAsync = function(text) {
  return function(dispatch) {
    // 异步操作开始了
    dispatch({ type: 'ADD_TODO_START' })

    setTimeout(() => {
      // 调用同步action，完成状态添加
      dispatch({ type: 'ADD_TODO', text })
    }, 3000)
  }
}

// 需求：进入页面时，就发送 ajax 请求，获取 todos 列表数据
// 分析：实际上，获取 todos 列表数据的操作，就是一个 action（动作）
const getTodosAsync = () => {
  return async dispatch => {
    // 表示要发送请求获取数据
    dispatch({ type: 'GET_TODOS_START' })

    try {
      const res = await axios.get('http://localhost:8081/todos')
      // 成功
      dispatch({ type: 'GET_TODO', todos: res.data })
    } catch (e) {
      // 失败
      dispatch({ type: 'GET_TODO_ERROR', err: e })
    }
  }
}

export { addTodo, addTodoAsync, getTodosAsync }
