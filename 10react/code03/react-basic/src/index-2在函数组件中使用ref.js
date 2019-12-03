import React from 'react'
import ReactDOM from 'react-dom'

// 创建函数组件
// 注意：不要在函数组件中使用 this，直接按照 普通函数的方式来使用即可
const Hello = () => {
  // 1 创建ref
  const txtRef = React.createRef()

  // 事件处理程序：
  const handleClick = () => {
    // 3 通过 ref 来获取文本框的值
    console.log(txtRef.current.value)
  }

  return (
    <div>
      {/* 2 将 ref 和 文本框绑定到一起 */}
      <input type="text" ref={txtRef} />

      <button onClick={handleClick}>获取文本框的值</button>
    </div>
  )
}

ReactDOM.render(<Hello />, document.getElementById('root'))
