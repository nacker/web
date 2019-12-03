/* 
  1 redux           提供状态
*/

// 1.1 redux
import { createStore } from 'redux'

// 1.2 创建store
const store = createStore(reducer)

// 1.3 创建 reducer
function reducer(state = 100, action) {
  switch (action.type) {
    // increment
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

// 1.4 订阅状态变化
// store.subscribe(() => {
//   console.log('redux 状态为：', store.getState())
// })

// 1.5 测试 redux
// store.dispatch({ type: 'INCREMENT' })

export default store
