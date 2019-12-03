import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  // 1 提供状态
  state = {
    // 评论人
    name: '',
    // 评论内容：
    content: '',
    // city
    city: '',

    // 是否选中
    isChecked: false
  }

  handleChange = e => {
    // console.log(e.target.name, e.target.value, e.target.checked, e.target.type)
    const target = e.target

    // 针对于表单元素进行处理：
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })

    // console.log('当前要更新的值为：', value)

    // const { name, value } = e.target

    // this.setState({
    //   // 属性名表达式：
    //   [name]: value
    // })
  }

  // 发表评论：
  addComment = () => {
    const { name, content, city } = this.state
    console.log(name, content, city)
  }

  render() {
    const { name, content, city, isChecked } = this.state

    return (
      <div>
        {/* 给每一个表单项添加 name 属性，值为：当前表单项对应的状态 */}
        <input
          type="text"
          placeholder="评论人"
          value={name}
          name="name"
          onChange={this.handleChange}
        />
        <br />
        <textarea
          cols="30"
          rows="10"
          placeholder="评论内容"
          value={content}
          name="content"
          onChange={this.handleChange}
        />
        <br />
        <select name="city" value={city} onChange={this.handleChange}>
          <option value="1">北京</option>
          <option value="2">上海</option>
          <option value="3">航头</option>
        </select>
        <br />
        <input
          type="checkbox"
          name="isChecked"
          checked={isChecked}
          onChange={this.handleChange}
        />
        <button onClick={this.addComment}>发表评论</button>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
