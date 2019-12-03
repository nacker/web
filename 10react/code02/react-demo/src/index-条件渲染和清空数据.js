import React from 'react'
import ReactDOM from 'react-dom'

class CommentList extends React.Component {
  state = {
    list: [
      { id: 1, name: 'jack', content: 'rose, you j, i j' },
      { id: 2, name: 'rose', content: 'jack, 风太大听不见' },
      { id: 3, name: 'tom', content: '????, 你们扔垃圾吗？' }
    ]
  }

  clearList = () => {
    this.setState({
      list: []
    })
  }

  render() {
    return (
      <div className="comment">
        <div>
          <input type="text" placeholder="评论人" /> <br />
          <textarea cols="30" rows="10" placeholder="评论内容" /> <br />
          <button>发表评论</button>
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
