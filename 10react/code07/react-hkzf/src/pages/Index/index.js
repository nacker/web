import React from 'react'

import { Carousel } from 'antd-mobile'

// 导入 axios
import axios from 'axios'

// 导入样式
import './index.scss'

export default class Index extends React.Component {
  state = {
    // 轮播图图片数据
    swipers: [],
    // 设置图片高度
    imgHeight: 212,

    // 表示轮播图是否加载中
    isSwiperLoading: true
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

  componentDidMount() {
    this.getSwipers()
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

  render() {
    return (
      <div className="index">
        {/* 当轮播图数据加载的过程中，不渲染轮播图组件；当数据加载完成后，再渲染轮播图组件 */}
        <div className="swiper">
          {this.state.isSwiperLoading ? null : (
            <Carousel autoplay={true} infinite autoplayInterval={5000}>
              {this.renderSwipers()}
            </Carousel>
          )}
        </div>
      </div>
    )
  }
}
