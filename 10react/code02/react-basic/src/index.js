/* 
  受控组件：
*/

import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  state = {
    txt: 'default'
  }

  changeTxt = e => {
    // console.log(e.target.value)
    this.setState({
      txt: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.txt} onChange={this.changeTxt} />
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
