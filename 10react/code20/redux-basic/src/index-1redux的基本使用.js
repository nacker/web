// 1 导入 createStore
import { createStore } from 'redux'

// 2 创建 store
// 参数：reducer
const store = createStore(reducer)

// 第一个参数：state
// 第二个参数：action
// 可以在第一个参数中，对 state 进行初始化
function reducer(state = 0, action) {
  switch (action.type) {
    // case 'INCREMENT'
    case 'ADD':
      // +1
      return state + 1
    default:
      return state
  }
}

// 创建 action
const add = { type: 'ADD' }

console.log('初始状态：', store.getState())

// 分发动作
// store.dispatch( { type: 'ADD' } )
// 参数：动作
store.dispatch(add) // 0 --> 1
store.dispatch(add) // 1 --> 2
store.dispatch(add) // 2 --> 3

console.log('触发 ADD 动作后的状态：', store.getState())
