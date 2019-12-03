import React from 'react'

// 通过 props 接收list数据：
export default function CommentList(props) {
  console.log('commentlist', props.list)
  return (
    <ul>
      {props.list.map(item => (
        <li key={item.id}>
          <h3>评论人：{item.name}</h3>
          <p>评论内容：{item.content}</p>
        </li>
      ))}
    </ul>
  )
}
