/* 
  setState()
*/

import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  // 简化语法：
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        计数器：{this.state.count}{' '}
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1
            })

            // this.state.count += 1
            // console.log(this.state.count)
          }}
        >
          +1
        </button>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
