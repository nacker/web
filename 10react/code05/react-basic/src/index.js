import React from 'react'
import ReactDOM from 'react-dom'

class Parent2 extends React.Component {
  state = {
    number: 0
  }

  handleNumber = () => {
    this.setState({
      number: Math.floor(Math.random() * 3)
    })
  }

  /* 
    第一次生成的虚拟DOM：
      {
        type: 'div',
        props: {
          children: [
            { type: 'h1', props: {children: '随机数'} },
            { type: 'p', props: {children: 0} },
            { type: 'button', props: { children: '生成随机数' }}
          ]
        }
      }

    更新状态后生成的虚拟DOM：（ 假设生成的随机数为 2 ）
      {
        type: 'div',
        props: {
          children: [
            { type: 'h1', props: {children: '随机数'} },
            { type: 'p', props: {children: 2} },
            { type: 'button', props: { children: '生成随机数' }}
          ]
        }
      }
    
    通过 Diff算法 对比后，发现，只有 p 元素中的 children 由 0 -> 2
    所以，最终，只将 p 元素的文本内容由 0 更新为 2 到页面中
  */

  render() {
    return (
      <div>
        <h1>随机数</h1>
        <p>{this.state.number}</p>

        <button onClick={this.handleNumber}>生成随机数</button>
      </div>
    )
  }
}

ReactDOM.render(<Parent2 />, document.getElementById('root'))
