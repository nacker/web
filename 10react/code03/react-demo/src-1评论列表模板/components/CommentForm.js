import React from 'react'

export default class CommentForm extends React.Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="评论人" /> <br />
        <textarea cols="30" rows="10" placeholder="评论内容" /> <br />
        <button>发表评论</button>
      </div>
    )
  }
}
