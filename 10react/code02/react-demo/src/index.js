import React from 'react'
import ReactDOM from 'react-dom'

class CommentList extends React.Component {
  state = {
    list: [
      { id: 1, name: 'jack', content: 'rose, you j, i j' },
      { id: 2, name: 'rose', content: 'jack, 风太大听不见' },
      { id: 3, name: 'tom', content: '????, 你们扔垃圾吗？' }
    ],

    // 评论人
    name: '',
    // 评论内容
    content: ''
  }

  // 获取评论人：
  handleNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  // 获取评论内容
  handleContentChange = e => {
    this.setState({
      content: e.target.value
    })
  }

  // 清空数据
  clearList = () => {
    this.setState({
      list: []
    })
  }

  // 添加评论数据
  addComment = () => {
    // 1 拿到用户输入的内容
    const { name, content, list } = this.state
    // console.log(name, content)

    this.setState({
      list: [...list, { id: Math.random(), name, content }],

      // 清空文本框的值
      name: '',
      content: ''
    })
  }

  render() {
    return (
      <div className="comment">
        <div>
          <input
            type="text"
            placeholder="评论人"
            value={this.state.name}
            onChange={this.handleNameChange}
          />{' '}
          <br />
          <textarea
            cols="30"
            rows="10"
            placeholder="评论内容"
            value={this.state.content}
            onChange={this.handleContentChange}
          />{' '}
          <br />
          <button onClick={this.addComment}>发表评论</button>
          <button onClick={this.clearList}>clear</button>
        </div>
        <div>
          {this.state.list.length <= 0 ? (
            <p>暂无评论，快去评论吧~</p>
          ) : (
            <ul>
              {this.state.list.map(item => (
                <li key={item.id}>
                  <h3>评论人：{item.name}</h3>
                  <p>评论内容：{item.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<CommentList />, document.getElementById('root'))
