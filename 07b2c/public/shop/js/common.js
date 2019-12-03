$(function() {
  // 初始化区域滚动
  mui('.mui-scroll-wrapper').scroll({
    // 不要滚动条
    indicators: false
  })

  // 初始化轮播图
  mui('.mui-slider').slider({
    interval: 1000
  })
})
