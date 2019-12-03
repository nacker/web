import React from 'react'
import ReactDOM from 'react-dom'

class Parent2 extends React.PureComponent {
  state = {
    obj: {
      number: 0
    }
  }

  handleNumber = () => {
    const number = Math.floor(Math.random() * 3)
    console.log('---> 生成新的随机数了', number)

    /* const { obj } = this.state
    // 注意：此处创建了一个新的对象 newObj
    const newObj = { ...obj }
    newObj.number = number

    // 注意：因为每次都创建了一个新的对象，所以，PureComponent 的浅对比（原理）得到的结果为false，也就是会更新组件。
    this.setState({
      obj: newObj
    }) */

    const newObj = Object.assign({}, this.state.obj, { number: number })
    this.setState({
      obj: newObj
    })

    // 错误演示：直接修改当前对象的值：
    /* const { obj } = this.state
    const newObj = obj
    newObj.number = number

    this.setState({
      obj: newObj
    }) */
  }

  render() {
    console.log('Parent2 组件重新渲染了')
    return (
      <div>
        <h1>随机数：{this.state.obj.number}</h1>
        <button onClick={this.handleNumber}>生成随机数</button>
      </div>
    )
  }
}

ReactDOM.render(<Parent2 />, document.getElementById('root'))
