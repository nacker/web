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
  render() {
    return (
      <div className="comment">
        <CommentForm />
        <div>
          <CommentList />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Comment />, document.getElementById('root'))
