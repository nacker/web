/* 
  因为这个组件现在就是展示添加任务的结构，也就是只负责 React 自身的功能
  但是，要实现添加任务功能，就必须得操作 redux 中的状态
  因此，需要使用 react-redux 中提供的 connect() 函数来将 react组件 和 redux 关联起来
  然后，就可以使用 redux 中的state 和 操作状态的方法了

  点击添加按钮后，是如何改变redux中的状态？
  1 通过 props 获取到 dispatch
  2 调用 dispatch
  3 分发的动作是 { type: 'ADD_TODO', name: '文本框中输入的值' }
  4 store 内部将 redux 中的state 和 该动作，作为参数传递给了 reducer，来调用 reducer
  5 reducer 接收到 当前的state 和 添加任务的action
  6 根据当前任务类型，来完成该动作
  7 因为是添加任务，所以，就执行了 添加任务 的逻辑处理
  8 reducer 处理执行完该任务后，返回最新的 state
  9 store 中接收到 reducer 的返回值，用这个返回值（也就是最新状态），来更新为 store 的最新状态
  10 因为通过 subscribe 监听了状态变化，所以，就将当前最新的状态打印到了控制台中
*/

import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = props => {
  // 创建 ref 对象，来获取文本框的值
  const txtRef = createRef()

  // 添加任务按钮的事件处理程序
  const handleClick = () => {
    // console.log('文本框值为：', txtRef.current.value)
    props.dispatch(addTodo(txtRef.current.value))
  }

  return (
    <>
      <input type="text" ref={txtRef} />
      <button onClick={handleClick}>添加</button>
    </>
  )
}

export default connect()(AddTodo)
