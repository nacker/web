import React from 'react'
import ReactDOM from 'react-dom'

class CommentList extends React.Component {
  render() {
    return (
      <div className="comment">
        <div>
          <input type="text" placeholder="评论人" /> <br />
          <textarea cols="30" rows="10" placeholder="评论内容" /> <br />
          <button>发表评论</button>
        </div>
        <div>
          <ul>
            <li>
              <h3>评论人：jack</h3>
              <p>评论内容：you jump, i jump</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<CommentList />, document.getElementById('root'))
