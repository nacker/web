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

  render() {
    return (
      <div>
        <h1>随机数：{this.state.number}</h1>
        <button onClick={this.handleNumber}>
          生成随机数 - {this.state.number}
        </button>
      </div>
    )
  }
}

ReactDOM.render(<Parent2 />, document.getElementById('root'))
