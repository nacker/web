// 显示两个报表
// 数据可视化
// 金融 p2p 股票  外滩 陆家嘴
$(function() {
  // 从后台获取
  var data = {
    title: '2019年注册人数',
    list: [
      { month: '1月', count: 1000 },
      { month: '2月', count: 2050 },
      { month: '3月', count: 1500 },
      { month: '4月', count: 3000 },
      { month: '5月', count: 2800 },
      { month: '6月', count: 500 }
    ]
  }

  var months = []
  var counts = []
  for (var i = 0; i < data.list.length; i++) {
    months.push(data.list[i].month)
    counts.push(data.list[i].count)
  }

  var chartLeft = echarts.init(document.querySelector('.chart_left'))
  var option = {
    title: {
      text: data.title
    },
    tooltip: {},
    // 图例
    legend: {
      data: ['注册人数']
    },
    xAxis: {
      data: months
    },
    yAxis: {},
    series: [
      {
        name: '注册人数',
        type: 'bar',
        data: counts
      }
    ]
  }
  chartLeft.setOption(option)

  var chartRight = echarts.init(document.querySelector('.chart_right'))
  var option2 = {
    title: {
      text: '热门品牌销售情况',
      subtext: '2019年5月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['阿迪王', '回力', '邦威', '361', '新百伦']
    },
    series: [
      {
        name: '销售情况',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '阿迪王' },
          { value: 310, name: '回力' },
          { value: 234, name: '邦威' },
          { value: 135, name: '361' },
          { value: 1548, name: '新百伦' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  chartRight.setOption(option2)
})
