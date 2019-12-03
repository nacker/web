import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  state = {
    // value 用来获取 PickerView 组件中选中的值
    value: this.props.defaultValue
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
        <FilterFooter
          onCancel={() => onCancel(type)}
          onSave={() => onSave(type, value)}
        />
      </>
    )
  }
}
