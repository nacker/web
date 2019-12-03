import * as actionTypes from '../actionTypes'

let id = 0

// [{ id, text, done }, {}, {}, ...]
const reducer = (state = [], action) => {
  switch (action.type) {
    // 添加任务
    case actionTypes.ADD_TODO:
      return [...state, { id: ++id, text: action.text, done: false }]
    default:
      return state
  }
}

export default reducer
