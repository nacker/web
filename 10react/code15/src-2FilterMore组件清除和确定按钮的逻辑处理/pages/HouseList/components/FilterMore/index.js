import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    // 选中值数组
    selectedValues: []
  }

  handleChange(id) {
    const { selectedValues } = this.state
    let newSelectedValues = [...selectedValues]

    // console.log('当前被点击项：', id)
    // 判断 selectedValues 是否包含当前项的值
    if (selectedValues.indexOf(id) > -1) {
      // 有
      // const index = newSelectedValues.findIndex(item => item === id)
      // newSelectedValues.splice(index, 1)

      // 方式二：filter
      newSelectedValues = newSelectedValues.filter(item => item !== id)
    } else {
      // 没有
      newSelectedValues.push(id)
    }

    console.log(newSelectedValues)
    this.setState({
      selectedValues: newSelectedValues
    })
  }

  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    return data.map(item => {
      const { selectedValues } = this.state
      const isSelected = selectedValues.indexOf(item.value) > -1

      return (
        <span
          key={item.value}
          className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')}
          onClick={() => this.handleChange(item.value)}
        >
          {item.label}
        </span>
      )
    })
  }

  render() {
    const {
      data: { roomType, oriented, floor, characteristic },
      type,
      onSave
    } = this.props
    const { selectedValues } = this.state

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          className={styles.footer}
          cancelText="清除"
          onCancel={() => this.setState({ selectedValues: [] })}
          onSave={() => onSave(type, selectedValues)}
        />
      </div>
    )
  }
}
