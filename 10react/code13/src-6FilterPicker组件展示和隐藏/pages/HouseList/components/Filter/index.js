/* 
  条件筛选栏 - 父组件
*/
import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

const titleSelectedStatus = {
  // false 表示不亮；true 表示高亮
  area: false,
  mode: false,
  price: false,
  more: false
}

export default class Filter extends Component {
  state = {
    // 标题高亮数据
    titleSelectedStatus,
    // 表示展示对话框的类型（ 有可能展示 FilterPicker 组件，有可能展示 FilterMore 组件 ）
    openType: ''
  }

  // 切换标题高亮
  // 参数 type 表示：当前点击菜单的类型
  changeTitleSelected = type => {
    this.setState({
      titleSelectedStatus: {
        ...this.state.titleSelectedStatus,
        [type]: true
      },

      openType: type
    })
  }

  // 隐藏对话框
  onCancel = () => {
    this.setState({
      openType: ''
    })
  }

  // 保存数据
  onSave = () => {
    this.setState({
      openType: ''
    })
  }

  render() {
    const { titleSelectedStatus, openType } = this.state

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {openType === 'area' || openType === 'mode' || openType === 'price' ? (
          <div className={styles.mask} onClick={this.onCancel} />
        ) : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onClick={this.changeTitleSelected}
          />

          {/* 前三个菜单对应的内容： */}
          {openType === 'area' ||
          openType === 'mode' ||
          openType === 'price' ? (
            <FilterPicker onCancel={this.onCancel} onSave={this.onSave} />
          ) : null}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
