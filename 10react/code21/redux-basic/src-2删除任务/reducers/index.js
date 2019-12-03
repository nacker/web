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
    default:
      return state
  }
}

export default reducer
