import React from 'react'

import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'

import { Link } from 'react-router-dom'

// 导入 axios
import axios from 'axios'

// 导入样式
import './index.scss'

import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

// 九宫格临时数据
// const data = Array.from(new Array(4)).map((_val, i) => ({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//   text: `name${i}`
// }))

const BMap = window.BMap

export default class Index extends React.Component {
  state = {
    // 最新资讯
    news: [],

    // 租房小组数据
    groups: [],

    // 轮播图图片数据
    swipers: [],
    // 设置图片高度
    imgHeight: 212,

    // 表示轮播图是否加载中
    isSwiperLoading: true,

    // 当前城市名称
    cityName: '上海'
  }

  // 获取轮播图数据
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')

    // console.log('轮播图数据：', res)
    this.setState({
      swipers: res.data.body,

      // 表示轮播图数据已经加载完成
      isSwiperLoading: false
    })
  }

  // 获取租房小组数据
  async getGroup() {
    const res = await axios.get(
      'http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
    )

    this.setState({
      groups: res.data.body
    })
  }

  // 获取最新资讯
  async getNews() {
    const res = await axios.get(
      'http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
    )

    this.setState({
      news: res.data.body
    })
  }

  componentDidMount() {
    this.getSwipers()
    this.getGroup()
    this.getNews()

    // 通过百度地图获取当前城市信息
    const myCity = new BMap.LocalCity()
    myCity.get(async result => {
      // 百度地图提供的当前城市名称
      const cityName = result.name

      // 调用接口，换取我们项目中的有房源城市信息
      const res = await axios.get('http://localhost:8080/area/info', {
        params: {
          name: cityName
        }
      })

      // console.log('接口返回的城市信息：', res)
      const { label, value } = res.data.body

      this.setState({
        cityName: label
      })

      // 将获取到的当前城市，保存到本地缓存中
      localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
    })

    // 使用 H5 中的地理位置API，来获取当前用户所在的地理位置
    /* navigator.geolocation.getCurrentPosition(position => {
      // postion 对象中，常用属性的文档：
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Coordinates
      console.log('当前位置信息：', position)
    }) */
  }

  // 渲染轮播图数据
  renderSwipers() {
    return this.state.swipers.map(item => (
      <a
        key={item.id}
        href="http://itcast.cn"
        style={{
          display: 'inline-block',
          width: '100%',
          height: this.state.imgHeight
        }}
      >
        {/* 
          onLoad 图片加载完成时的事件（联想 window.onload）

          每个图片都有一个 onError 事件，在图片加载失败时触发
        */}
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            // 触发 window 的 resize 事件，来改变图片高度
            window.dispatchEvent(new Event('resize'))
            this.setState({ imgHeight: 'auto' })
          }}
        />
      </a>
    ))
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  render() {
    return (
      <div className="index">
        {/* 当轮播图数据加载的过程中，不渲染轮播图组件；当数据加载完成后，再渲染轮播图组件 */}
        <div className="swiper">
          {/* 首页顶部导航： */}
          <Flex className="search-box">
            <Flex className="search-left">
              <div
                className="location"
                onClick={() => this.props.history.push('/citylist')}
              >
                <span>{this.state.cityName}</span>
                <i className="iconfont icon-arrow" />
              </div>

              <div
                className="search-form"
                onClick={() => this.props.history.push('/search')}
              >
                <i className="iconfont icon-seach" />
                <span>请输入小区或地址</span>
              </div>
            </Flex>
            <i
              className="iconfont icon-map"
              onClick={() => this.props.history.push('/map')}
            />
          </Flex>

          {this.state.isSwiperLoading ? null : (
            <Carousel autoplay={true} infinite autoplayInterval={5000}>
              {this.renderSwipers()}
            </Carousel>
          )}
        </div>

        {/* 导航菜单 */}
        <Flex className="nav">
          <Flex.Item>
            <Link to="/home/list">
              <img src={nav1} alt="" />
              <p>整租</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="/home/list">
              <img src={nav2} alt="" />
              <p>合租</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="/map">
              <img src={nav3} alt="" />
              <p>地图找房</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="/rent/add">
              <img src={nav4} alt="" />
              <p>去出租</p>
            </Link>
          </Flex.Item>
        </Flex>

        {/* 租房小组： */}
        <div className="groups">
          {/* 标题 */}
          <Flex justify="between" className="groups-title">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 
            使用九宫格来实现布局

            data 表示：九宫格的数据源
            activeStyle 表示：每个菜单项的点击反馈
           */}
          <Grid
            className="grid"
            data={this.state.groups}
            columnNum={2}
            hasLine={false}
            square={false}
            activeStyle
            renderItem={item => (
              <Flex className="grid-item" justify="between">
                <div>
                  <p>{item.title}</p>
                  <span>{item.desc}</span>
                </div>
                <div>
                  <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </div>
              </Flex>
            )}
          />
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
}
