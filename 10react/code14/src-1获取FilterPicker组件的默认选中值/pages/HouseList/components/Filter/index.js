/* 
  条件筛选栏 - 父组件
*/
import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

// 导入API
import { API, getCurrentCity } from '../../../../utils'

import styles from './index.module.css'

const titleSelectedStatus = {
  // false 表示不亮；true 表示高亮
  area: false,
  mode: false,
  price: false,
  more: false
}

// 选中值对象：用来设置每一次的选中值
const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}

export default class Filter extends Component {
  state = {
    // 标题高亮数据
    titleSelectedStatus,
    // 表示展示对话框的类型（ 有可能展示 FilterPicker 组件，有可能展示 FilterMore 组件 ）
    openType: '',
    // 筛选条件数据
    filtersData: {},
    // 选中值对象：用来设置每一次的选中值
    selectedValues
  }

  componentDidMount() {
    this.getFiltersData()
  }

  // 获取所有筛选条件数据
  async getFiltersData() {
    // 当前定位城市id
    const { value } = await getCurrentCity()

    const res = await API.get('/houses/condition', {
      params: {
        id: value
      }
    })

    // console.log(res)
    this.setState({
      filtersData: res.data.body
    })
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
  onSave = (type, value) => {
    console.log('Filter 组件中获取到的数据：', type, value)

    this.setState({
      openType: '',

      // 更新当前类型对应的选中值
      selectedValues: {
        ...this.state.selectedValues,
        [type]: value
      }
    })
  }

  // 渲染前面三个菜单对应的组件：
  renderFilterPicker() {
    const {
      openType,
      filtersData: { area, subway, rentType, price },
      selectedValues
    } = this.state

    if (openType === 'more' || openType === '') {
      return null
    }

    // 从 filtersData 中获取数据
    // area： area => {}, subway => {}
    // mode： rentType => []
    // price：price => []
    let data
    // 列数
    let cols = 1
    // 当前选中值
    let defaultValue = selectedValues[openType]

    switch (openType) {
      case 'area':
        data = [area, subway]
        cols = 3
        break
      case 'mode':
        data = rentType
        break
      case 'price':
        data = price
        break
      default:
        break
    }

    return (
      <FilterPicker
        data={data}
        cols={cols}
        onCancel={this.onCancel}
        onSave={this.onSave}
        type={openType}
        defaultValue={defaultValue}
      />
    )
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
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
