import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

class App extends React.Component {
  state = {
    count: 9
  }

  render() {
    console.log('App 组件重新渲染了')
    return (
      <div className="root">
        <div>
          <h1>App 的计数器：{this.state.count}</h1>
          <button
            onClick={() =>
              this.setState({
                count: this.state.count + 1
              })
            }
          >
            +1
          </button>
        </div>

        <div className="app">
          <Parent1 />
          <Parent2 />
        </div>
      </div>
    )
  }
}

class Parent1 extends React.Component {
  render() {
    console.log('Parent1 组件重新渲染了')
    return (
      <div className="parent">
        <Child1 />
      </div>
    )
  }
}

class Child1 extends React.Component {
  render() {
    console.log('Child1 组件重新渲染了')
    return <div>这是 Child1 组件</div>
  }
}

class Parent2 extends React.Component {
  state = {
    count: 0
  }

  render() {
    console.log('Parent2 组件重新渲染了')
    return (
      <div className="parent">
        <h1>parent2的计数器：{this.state.count}</h1>
        <button
          onClick={() =>
            this.setState({
              count: this.state.count + 1
            })
          }
        >
          +1
        </button>
        <Child2 />
      </div>
    )
  }
}

class Child2 extends React.Component {
  render() {
    console.log('Child2 组件重新渲染了')
    return <div>这是 Child2 组件</div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
