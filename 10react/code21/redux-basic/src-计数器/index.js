/* 
  3 react-redux     绑定库，用来将 react 和 redux 关联到一起来使用
*/

import React from 'react'
import { render } from 'react-dom'

// 3.2 导入 react-redux
import { Provider, connect } from 'react-redux'

// 3.1 导入store
import store from './js/store'

let Counter = props => {
  console.log('Counter组件 props 为：', props)
  return (
    <div>
      <h1>计数器：{props.count}</h1>
      <button onClick={() => props.dispatch({ type: 'INCREMENT' })}>+1</button>
    </div>
  )
}

// 3.3 使用 connect 高阶组件包裹 Counter 组件
// 默认情况下，connect()没有参数时，会将 dispatch 传递给被包装组件 Counter
// 如果需要在组件中拿到 redux 中的状态，就提供第一个参数，来将 redux 的状态，映射为 组件 的props
// 然后，在组件中，就可以通过 props 来获取到 redux 中的状态了
const mapStateToProps = state => {
  console.log('mapStateToProps 的参数 state：', state)

  // 返回的对象，表示要传递给组件的属性
  return {
    count: state,

    test1: 'a',
    test2: 'b'
  }
}

// 高阶组件会返回一个新组件，最终，渲染的就是该新组件
Counter = connect(mapStateToProps)(Counter)

render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)
