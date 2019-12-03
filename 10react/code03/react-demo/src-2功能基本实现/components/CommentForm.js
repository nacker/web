import React from 'react'

// 评论表单组件：
export default class CommentForm extends React.Component {
  state = {
    // 评论人
    name: '',
    // 评论内容：
    content: ''
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  handleContentChange = e => {
    this.setState({
      content: e.target.value
    })
  }

  // 发表评论
  addComment = () => {
    const { name, content } = this.state

    // console.log('CommentForm：', this.props)
    this.props.updateComment(name, content)
  }

  render() {
    return (
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
      </div>
    )
  }
}
