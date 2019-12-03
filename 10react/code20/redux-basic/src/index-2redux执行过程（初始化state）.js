// 1 导入 createStore
import { createStore } from 'redux'

// 2 创建 store
// 参数：reducer
const store = createStore(reducer)

// 在创建 store 的时候，redux会自动触发一次 reducer，目的：为了得到初始状态
function reducer(state = 0, action) {
  console.log('state：', state, 'action：', action)

  switch (action.type) {
    // case 'INCREMENT'
    case 'ADD':
      // +1
      return state + 1
    default:
      return state
  }
}

console.log('初始状态：', store.getState())
