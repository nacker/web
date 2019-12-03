// 1 导入 createStore
import { createStore } from 'redux'

// 2 创建 store
// 参数：reducer
const store = createStore(reducer)

// redux 内部会得到 reducer 的返回值，这个返回值就是 最新的状态
// 然后，redux内部使用该最新的状态 替换 上一次的旧状态，这样，redux中的状态就更新了
function reducer(state = 0, action) {
  console.log('state：', state, 'action：', action)

  switch (action.type) {
    case 'ADD':
      return state + 1
    default:
      return state
  }
}

console.log('初始状态：', store.getState())

console.log('----------------------------')

// 手动触发一个action
store.dispatch({ type: 'ADD' })
store.dispatch({ type: 'ADD1' })
store.dispatch({ type: 'ADD1' })

console.log('触发 ADD 动作后的状态：', store.getState())
