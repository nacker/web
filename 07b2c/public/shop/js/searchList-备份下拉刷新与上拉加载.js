/* 
  1. 获取到地址栏中key对应的值，放到input框中


  2. 下拉刷新的使用
    注意点： 在ajax请求结束 需要结束 下拉刷新：  mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
*/
$(function() {
  // 对地址栏参数进行解码
  var page = 1
  var pageSize = 4
  var search = decodeURI(location.search)
  var key = search.split('=')[1]
  $('.search input').val(key)

  mui.init({
    // 拉取刷新
    pullRefresh: {
      container: '.mui-scroll-wrapper',
      // 下拉刷新
      down: {
        // 下拉刷新要触发的函数
        height: 50,
        // auto如果为true，自动下拉刷新一次
        auto: true,
        contentdown: '下拉可以刷新',
        contentover: '释放立即刷新',
        contentrefresh: '正在刷新...',
        callback: function() {
          // 渲染
          page = 1
          render()
        }
      },
      // 上拉加载
      up: {
        callback: function() {
          page++
          render2()
        }
      }
    }
  })

  // 发送ajax请求，获取数据，并且渲染到页面中
  function render() {
    var param = {
      page: page,
      pageSize: pageSize,
      proName: key
    }

    // 对排序的参数进行处理

    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success: function(info) {
        setTimeout(function() {
          $('.product').html(template('tpl', info))
          // 结束下拉刷新
          mui('.mui-scroll-wrapper')
            .pullRefresh()
            .endPulldownToRefresh()
          // 恢复上拉加载
          mui('.mui-scroll-wrapper')
            .pullRefresh()
            .refresh(true)
        }, 1000)
      }
    })
  }
  function render2() {
    var param = {
      page: page,
      pageSize: pageSize,
      proName: key
    }
    // 对排序的参数进行处理
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success: function(info) {
        setTimeout(function() {
          $('.product').append(template('tpl', info))
          // 结束上拉加载刷新, 有一个参数 ：如果为true，表示没有更多数据\
          mui('.mui-scroll-wrapper')
            .pullRefresh()
            .endPullupToRefresh(info.data.length === 0)
        }, 1000)
      }
    })
  }
})
