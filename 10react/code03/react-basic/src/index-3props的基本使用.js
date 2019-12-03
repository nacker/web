/* 
  props：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 函数组件
// 2 通过函数组件的参数 props ，就可以获取到传递给组件的数据了
// props 的特点：只读对象！！！
const Hello = props => {
  console.log('函数组件的参数 props：', props)

  // props.name = 'rose'
  // props.gender = 'male'

  // 调用传递进来的函数属性：
  props.fn()

  return (
    <div>
      props：{props.name} -- {props.age}
    </div>
  )
}

/* class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>组件通讯：</h1>
      </div>
    )
  }
} */

// 1 给组件传递数据，实际上就是在组件标签上，添加属性
// 问题：如何传递 数值 类型的属性？
// const age1 = 19
ReactDOM.render(
  <Hello
    name="jack"
    age="19"
    age1={19}
    isChecked={true}
    colors={['red', 'blue']}
    fn={() => console.log(123123213123)}
    obj={{ gender: 'male' }}
  />,
  document.getElementById('root')
)
