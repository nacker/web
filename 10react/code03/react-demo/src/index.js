import React from 'react'
import ReactDOM from 'react-dom'
/* 
list: [
  { id: 1, name: 'jack', content: 'rose, you j, i j' },
  { id: 2, name: 'rose', content: 'jack, 风太大听不见' },
  { id: 3, name: 'tom', content: '????, 你们扔垃圾吗？' }
],
*/

// 导入两个子组件：
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'

// 父组件
class Comment extends React.Component {
  state = {
    list: [
      { id: 1, name: 'jack', content: 'rose, you j, i j' },
      { id: 2, name: 'rose', content: 'jack, 风太大听不见' },
      { id: 3, name: 'tom', content: '????, 你们扔垃圾吗？' }
    ]
  }

  // 提供修改状态的方法
  updateComment = (name, content) => {
    this.setState({
      list: [...this.state.list, { id: Math.random(), name, content }]
    })
  }

  render() {
    console.log('Comment 组件：', this.props)
    return (
      <div className="comment" style={this.props.style}>
        <CommentForm updateComment={this.updateComment} />
        <div>
          {/* 传递list数据： */}
          <CommentList list={this.state.list} />
        </div>
      </div>
    )
  }
}

// 传递给组件的属性，需要在 组件 中处理后，才会生效！
// ReactDOM.render(<Comment />, document.getElementById('root'))
ReactDOM.render(
  <Comment style={{ color: 'green' }} />,
  document.getElementById('root')
)
