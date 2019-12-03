import React from 'react'
import ReactDOM from 'react-dom'

// 创建class组件
class Hello extends React.Component {
  constructor() {
    super()

    // 1 创建 ref 对象
    this.txtRef = React.createRef()
  }

  // 事件处理程序：
  handleClick = () => {
    console.log('文本框的值：', this.txtRef.current.value)
  }

  render() {
    return (
      <div>
        Ref 获取表单元素值：
        {/* 2 给表单元素添加 ref 属性 */}
        <input type="text" ref={this.txtRef} />
        <button onClick={this.handleClick}>获取文本框的值</button>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
