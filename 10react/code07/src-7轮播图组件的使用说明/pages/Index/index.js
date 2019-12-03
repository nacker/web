import React from 'react'

import { Carousel } from 'antd-mobile'

export default class Index extends React.Component {
  state = {
    // 轮播图图片数据
    data: ['1', '2', '3'],
    // 设置图片高度
    imgHeight: 176
  }

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          'AiyWuByWklrrUDlFignR',
          'TekJlZRVCjLFexlOCuWn',
          'IJOtIlfsYdTyaDTRVrLI'
        ]
      })
    }, 100)
  }

  render() {
    return (
      <div className="index">
        {/* 
          autoplay 指定：是否自动播放轮播图
          infinite 指定：是否循环播放，只要添加了改属性，就相当于设置该值为 true
          autoplayInterval 指定：轮播图自动切换的时间间隔
        */}
        <Carousel autoplay={true} infinite autoplayInterval={5000}>
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
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
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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
          ))}
        </Carousel>
      </div>
    )
  }
}
