import React, { Component, createRef } from 'react'

import PropTypes from 'prop-types'

import styles from './index.module.scss'

/* 
  ④ 在 Sticky 组件中，创建两个 ref 对象（placeholder、content），分别指向占位元素和内容元素。
  ⑤ 组件中，监听浏览器的 scroll 事件（注意销毁事件）。
  ⑥ 在 scroll 事件中，通过 getBoundingClientRect() 方法得到筛选栏占位元素当前位置（top）。
  ⑦ 判断 top 是否小于 0（是否在可视区内）。
  ⑧ 如果小于，就添加需要吸顶样式（fixed），同时设置占位元素高度（与条件筛选栏高度相同）。
  ⑨ 否则，就移除吸顶样式，同时让占位元素高度为 0。
*/
class Sticky extends Component {
  // 内容
  contentRef = createRef()
  // 占位符
  placeholderRef = createRef()

  // 滚动事件的事件处理程序
  handleScroll = () => {
    // 获取 props 中传递过来的 height 属性
    const { height } = this.props
    // 占位符DOM对象
    const placeholderEl = this.placeholderRef.current
    // 内容DOM对象
    const contentEl = this.contentRef.current
    // 占位符元素的位置
    const { top } = placeholderEl.getBoundingClientRect()

    if (top < 0) {
      // 此时，需要吸顶
      placeholderEl.style.height = `${height}px`
      contentEl.classList.add(styles.fixed)
    } else {
      // 此时，不需要吸顶
      placeholderEl.style.height = '0px'
      contentEl.classList.remove(styles.fixed)
    }

    // console.log(
    //   '页面滚动了',
    //   this.placeholderRef.current.getBoundingClientRect()
    // )
  }

  // 监听浏览器的滚动事件
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  // 解绑事件
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <div>
        {/* 占位符 */}
        <div ref={this.placeholderRef} />
        {/*
          内容
          this.props.children 此处指的就是： Filter 组件

          <Sticky>
            <Filter onFilter={this.onFilter} />
          </Sticky>
        */}
        <div ref={this.contentRef}>{this.props.children}</div>
      </div>
    )
  }
}

Sticky.propTypes = {
  height: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired
}

export default Sticky
