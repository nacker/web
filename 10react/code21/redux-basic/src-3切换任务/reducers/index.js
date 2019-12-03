import * as actionTypes from '../actionTypes'

let id = 0

// [{ id, text, done }, {}, {}, ...]
const reducer = (state = [], action) => {
  switch (action.type) {
    // 添加任务
    case actionTypes.ADD_TODO:
      return [...state, { id: ++id, text: action.text, done: false }]

    // 删除任务
    case actionTypes.DELETE_TODO:
      // [{ id: 1, }, { id: 2, }, { id: 3, }]
      // 删除 id 为 2，也就是保留 id 不为 2 的
      // [{ id: 1, }, { id: 3, }]
      return state.filter(item => item.id !== action.id)

    // 切换任务完成状态
    case actionTypes.TOGGLE_TODO:
      return state.map(item =>
        item.id === action.id ? { ...item, done: !item.done } : { ...item }
      )

    // return state.map(item => {
    //   if (item.id === action.id) {
    //     // 当前要修改的任务：
    //     return { ...item, done: !item.done }
    //   }
    //   // 其他的任务数据：
    //   return { ...item }
    // })

    // const newState = [...state]
    // const item = newState.find(item => item.id === action.id)
    // item.done = !item.done
    // return newState

    // return state.map(item => {
    //   if (item.id === action.id) {
    //     item.done = !item.done
    //   }
    //   return item
    // })
    default:
      return state
  }
}

export default reducer
