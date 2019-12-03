// store
// applyMiddleware 函数的作用：给 redux 添加中间件
import { createStore, applyMiddleware } from 'redux'

// 导入记录日志的中间件
import logger from 'redux-logger'

import reducer from './reducers'

/* // 自己创建的中间件：
const logger = store => next => action => {
  // 记录日志代码
  console.log('1 dispatching', action)
  // 如果只使用了一个中间件：
  // 那么，next 就表示原始的 dispatch
  // 也就是：logger中间件包装了 store.dispatch
  let result = next(action)
  // 记录日志代码
  console.log('3 next state', store.getState())
  return result
} */

const configStore = () => {
  // 初始化状态
  const initialState = JSON.parse(localStorage.getItem('todos'))

  // 创建store
  // 通过调用 applyMiddleware() 来给 redux 传递中间件
  const store = createStore(reducer, initialState, applyMiddleware(logger))

  store.subscribe(() => {
    localStorage.setItem('todos', JSON.stringify(store.getState()))
  })

  return store
}

export default configStore
