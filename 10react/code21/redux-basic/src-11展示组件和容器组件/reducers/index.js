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
      return state.filter(item => item.id !== action.id)

    // 切换任务完成状态
    case actionTypes.TOGGLE_TODO:
      return state.map(item =>
        item.id === action.id ? { ...item, done: !item.done } : { ...item }
      )
    default:
      return state
  }
}

export default reducer
