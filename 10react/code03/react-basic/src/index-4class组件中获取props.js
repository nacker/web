/* 
  props：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// class组件

class Hello extends React.Component {
  constructor(props) {
    super(props)

    // console.log('在构造函数中，获取到 props ', this.props)
    console.log('在构造函数中，获取到 props ', props)
  }

  render() {
    console.log('class组件中获取到props：', this.props)

    // this.props.colors = []

    return (
      <div>
        <h1>props：{this.props.age}</h1>
        {this.props.colors.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    )
  }
}

ReactDOM.render(
  <Hello
    name="jack"
    age="19"
    age1={19}
    isChecked={true}
    colors={['red', 'blue', 'yellow']}
    fn={() => console.log(123123213123)}
    obj={{ gender: 'male' }}
  />,
  document.getElementById('root')
)
