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
    // 1 在标题点击事件 onTitleClick 方法中，获取到两个状态：标题选中状态对象和筛选条件的选中值对象。
    // titleSelectedStatus => { area: false, mode: true, ... }
    // selectedValues => { area: [], mode: [], ... }
    const { titleSelectedStatus, selectedValues } = this.state
    // 2 根据当前标题选中状态对象，获取到一个新的标题选中状态对象（newTitleSelectedStatus）
    const newTitleSelectedStatus = { ...titleSelectedStatus }

    // 3 使用 Object.keys() 方法，遍历标题选中状态对象。
    // Object.keys(titleSelectedStatus) => ['area', 'mode', ...]
    Object.keys(titleSelectedStatus).forEach(key => {
      // 获取每一个菜单的选中项
      const selectedVal = selectedValues[key]

      // 4 先判断是否为当前标题，如果是，直接让该标题选中状态为 true（高亮）。
      // 5 否则，分别判断每个标题的选中值是否与默认值相同。
      // 6 如果不同，则设置该标题的选中状态为 true。
      // 7 如果相同，则设置该标题的选中状态为 false。
      if (key === type) {
        // 设置为true，就表示高亮
        newTitleSelectedStatus[type] = true
      } else {
        // 当前类型是否选中
        const typeSelected = this.getTitleSelectedStatus(key, selectedVal)
        // 将 typeSelected 对象中的属性，添加到 newTitleSelectedStatus，重名的属性，后面覆盖前面
        // newTitleSelectedStatus ==> { area: false, mode: false }
        // typeSelected ==> { area: true }
        // 结果为： { area: true, mode: false }
        Object.assign(newTitleSelectedStatus, typeSelected)
      }
    })

    this.setState({
      // 8 更新状态 titleSelectedStatus 的值为：newTitleSelectedStatus
      titleSelectedStatus: newTitleSelectedStatus,

      openType: type
    })
  }

  // 封装菜单高亮逻辑
  getTitleSelectedStatus(type, selectedVal) {
    const newTitleSelectedStatus = {}

    if (
      type === 'area' &&
      (selectedVal.length === 3 || selectedVal[0] === 'subway')
    ) {
      // 选中
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      // 选中
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      // 选中
      newTitleSelectedStatus[type] = true
    } else if (type === 'more') {
    } else {
      // 不选中
      newTitleSelectedStatus[type] = false
    }

    // newTitleSelectedStatus ===> { area: false } or { area: true }
    return newTitleSelectedStatus
  }

  // 隐藏对话框
  onCancel = type => {
    // console.log('当前type：', type)
    // 1 先获取到当前 type 的选中值
    const { selectedValues, titleSelectedStatus } = this.state
    const selectedVal = selectedValues[type]

    // 2 使用 if/else 分别判断4个菜单有没有选中
    const newTitleSelectedStatus = this.getTitleSelectedStatus(
      type,
      selectedVal
    )

    this.setState({
      openType: '',

      titleSelectedStatus: { ...titleSelectedStatus, ...newTitleSelectedStatus }
    })
  }

  // 保存数据
  // 注意：value才表示当前选中的最新值
  onSave = (type, value) => {
    // 1 先获取到当前 type 的选中值
    const { titleSelectedStatus } = this.state
    // 注意：此处，不要依赖于 状态中的选中值，而应该依赖于传递过来的 参数value，它表示的才是最新值
    const newTitleSelectedStatus = this.getTitleSelectedStatus(type, value)

    this.setState({
      openType: '',

      titleSelectedStatus: {
        ...titleSelectedStatus,
        ...newTitleSelectedStatus
      },

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
        key={openType}
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
          <div
            className={styles.mask}
            onClick={() => this.onCancel(openType)}
          />
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
