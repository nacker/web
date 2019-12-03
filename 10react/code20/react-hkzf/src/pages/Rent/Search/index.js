import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import debounce from 'lodash/debounce'
// import _ from 'lodash'

import { getCity, API } from '../../../utils'

import styles from './index.module.css'

/* 
  ① 给 SearchBar 组件，添加 onChange 配置项，获取文本框的值。
  ② 判断当前文本框的值是否为空。
  ③ 如果为空，清空列表，然后 return，不再发送请求。
  ④ 如果不为空，使用 API 发送请求，获取小区数据。
  ⑤ 使用定时器 setTimeout 来延迟搜索，提升性能。
*/

export default class Search extends Component {
  // 当前城市id
  cityId = getCity().value

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  // 初始化timerId
  timerId = null

  // 传递给 search 的参数，最终，会传递给 debounce 回调函数中的第一个参数
  search = debounce(async val => {
    console.log('debounce', val)
    // 发送请求获取小区数据
    const res = await API.get('/area/community', {
      params: {
        name: val,
        id: this.cityId
      }
    })

    const { body } = res.data

    // console.log('小区列表：', res)
    this.setState({
      tipsList: body.map(item => ({
        community: item.community,
        communityName: item.communityName
      }))
    })
  }, 500)

  // 根据关键词搜索小区信息
  handleSearchTxt = val => {
    if (val.trim() === '') {
      // 输入内容为空
      return this.setState({
        tipsList: [],
        searchTxt: ''
      })
    }

    this.setState({
      searchTxt: val
    })

    this.search(val)

    /* clearTimeout(this.timerId)
    this.timerId = setTimeout(async () => {
      // 发送请求获取小区数据
      const res = await API.get('/area/community', {
        params: {
          name: val,
          id: this.cityId
        }
      })

      const { body } = res.data

      // console.log('小区列表：', res)
      this.setState({
        tipsList: body.map(item => ({
          community: item.community,
          communityName: item.communityName
        }))
      })
    }, 500) */
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li
        key={item.community}
        className={styles.tip}
        onClick={this.handleClick.bind(this, item)}
      >
        {item.communityName}
      </li>
    ))
  }

  // 获取小区信息，返回发布房源页面
  handleClick = ({ community, communityName }) => {
    // console.log(community, communityName)

    // 第二个参数：表示给路由跳转添加的额外参数
    this.props.history.replace('/rent/add', {
      community,
      communityName
    })
  }

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
          onChange={this.handleSearchTxt}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
