// store
// applyMiddleware 函数的作用：给 redux 添加中间件
import { createStore, applyMiddleware } from 'redux'

// 导入记录日志的中间件
import logger from 'redux-logger'
// 导入处理异步数据流的中间件
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

const configStore = () => {
  // 初始化状态
  const initialState = JSON.parse(localStorage.getItem('todos'))

  // 创建store
  // 通过调用 applyMiddleware() 来给 redux 传递中间件
  const store = createStore(
    reducer,
    initialState,

    // 注意： logger 中间件一般都是作为最后一个参数，这种，才能记录所有日志
    composeWithDevTools(applyMiddleware(thunk, logger))
  )

  store.subscribe(() => {
    localStorage.setItem('todos', JSON.stringify(store.getState()))
  })

  return store
}

export default configStore
