// 1 导入 createStore
import { createStore } from 'redux'

// 2 创建 store
const store = createStore(reducer)

function reducer(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    default:
      return state
  }
}

// 获取状态： store.getState()
// 分发动作： store.dispatch( action )

// 订阅（监听）状态变化：store.subscribe(() => {})
// 也就是说：只要 state 变化，就会出发回调函数

// 这个返回值，用来取消本次订阅，取消后，状态变化时，就不会再执行该回调函数了
const unsubscribe = store.subscribe(() => {
  console.log('当前状态为：', store.getState())
})

store.dispatch({ type: 'ADD' }) // 0 --> 1
// 取消订阅
unsubscribe()

store.dispatch({ type: 'ADD' }) // 1 --> 2
store.dispatch({ type: 'ADD' }) // 2 --> 3
