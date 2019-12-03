/* 
  todos 案例：

  实现的功能：
  1 添加任务
  2 删除任务
  3 切换任务的完成状态
*/

import { createStore } from 'redux'
import reducer from './reducers'
import { addTodo, delTodo } from './actions'

const store = createStore(reducer)

store.subscribe(() => {
  console.log('当前状态为：', store.getState())
})

// 测试添加任务的功能：
store.dispatch(addTodo('不抽烟'))
store.dispatch(addTodo('不喝酒'))
store.dispatch(addTodo('只烫头'))

// 测试删除任务的功能：
store.dispatch(delTodo(2))
