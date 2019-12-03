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
          render(function(info) {
            // 下拉刷新的逻辑
            $('.product').html(template('tpl', info))
            // 结束下拉刷新
            mui('.mui-scroll-wrapper')
              .pullRefresh()
              .endPulldownToRefresh()
            // 重置上拉加载
            mui('.mui-scroll-wrapper')
              .pullRefresh()
              .refresh(true)
          })
        }
      },
      // 上拉加载
      up: {
        callback: function() {
          page++
          render(function(info) {
            // 上拉加载的逻辑
            $('.product').append(template('tpl', info))
            // 结束上拉加载，需要没有更多数据的参数
            mui('.mui-scroll-wrapper')
              .pullRefresh()
              .endPullupToRefresh(info.data.length === 0)
          })
        }
      }
    }
  })

  // 搜索功能
  $('.search button').on('click', function() {
    var key = $('.search input').val()
    location.href = 'searchList.html?key=' + key
  })

  // 排序功能， mui中使用下拉刷新和上拉加载的时候，禁用掉 click事件
  $('.sort li[data-type]').on('tap', function() {
    if ($(this).hasClass('now')) {
      // 如果有，让下面的i换箭头
      $(this)
        .find('i')
        .toggleClass('fa-angle-down')
        .toggleClass('fa-angle-up')
    } else {
      // 如果没有，添加这个类，排他  让所有的箭头都向下
      $(this)
        .addClass('now')
        .siblings()
        .removeClass('now')
      // 让所有的箭头都向下
      $('.sort i')
        .removeClass('fa-angle-up')
        .addClass('fa-angle-down')
    }

    // 手动去触发一次下拉刷新
    mui('.mui-scroll-wrapper')
      .pullRefresh()
      .pulldownLoading()
  })

  // 发送ajax请求，获取数据，并且渲染到页面中
  function render(callback) {
    var param = {
      page: page,
      pageSize: pageSize,
      proName: key
    }

    // 对排序的参数进行处理 判断是否有now
    var $now = $('.sort li.now')
    if ($now.length > 0) {
      // 有now，需要排序的
      var type = $now.data('type')
      var value = $now.find('i').hasClass('fa-angle-down') ? 2 : 1
      param[type] = value
    }

    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success: function(info) {
        setTimeout(function() {
          callback && callback(info)
        }, 1000)
      }
    })
  }
})
