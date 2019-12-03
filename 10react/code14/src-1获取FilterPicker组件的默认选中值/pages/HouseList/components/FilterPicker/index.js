import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  constructor(props) {
    super(props)
    console.log('FilterPicker 组件接收到默认值为：', this.props.defaultValue)
    this.state = {
      // value 用来获取 PickerView 组件中选中的值
      value: this.props.defaultValue
    }
  }

  // 直接在两个菜单之间来回切换的时候，触发的是更新阶段
  // 所以，要想让 组件默认值 生效，直接通过对比更新前后两次 defaultValue 是否相同即可
  componentDidUpdate(prevProps) {
    // console.log('上一次 prevProps:', prevProps.defaultValue)
    // console.log('最新 this.props:', this.props.defaultValue)
    // console.log('=== ', this.props.defaultValue === prevProps.defaultValue)
    const { defaultValue } = this.props

    if (defaultValue !== prevProps.defaultValue) {
      this.setState({
        value: defaultValue
      })
    }
  }

  // PickerView 组件切换时触发的事件
  onChange = val => {
    this.setState({
      value: val
    })
  }

  render() {
    const { onCancel, onSave, data, cols, type } = this.props
    const { value } = this.state

    return (
      <>
        {/* 
          选择器组件：
          data 表示 PickerView 组件的数据源
          cols 表示：列数
          value 表示：默认选中
        */}
        <PickerView
          data={data}
          value={value}
          onChange={this.onChange}
          cols={cols}
        />

        {/* 底部按钮 */}
        <FilterFooter onCancel={onCancel} onSave={() => onSave(type, value)} />
      </>
    )
  }
}
