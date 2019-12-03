$(function() {
  var id = location.search.split('=')[1]
  // 发送ajax请求
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    success: function(info) {
      // 需要对size做处理
      var arr = []
      var temp = info.size.split('-')
      for (var i = +temp[0]; i <= temp[1]; i++) {
        arr.push(i)
      }
      info.sizeArray = arr

      $('.mui-scroll').html(template('tpl', info))

      // 手动初始化轮播图
      mui('.mui-slider').slider({ interval: 1000 })

      // 手动初始化numbox
      mui('.mui-numbox').numbox()

      // 给span注册点击事件，能够改变样式
      $('.product_size span').on('click', function() {
        $(this)
          .addClass('now')
          .siblings()
          .removeClass('now')
      })
    }
  })

  $('.add_cart').on('click', function() {
    // 加入购物车
    var num = $('.mui-numbox-input').val()
    var size = $('.product_size span.now').text()
    if (!size) {
      mui.toast('请选择一个尺码')
      return
    }
    console.log(num, size)
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: id,
        num: num,
        size: size
      },
      success: function(info) {
        if (info.error === 400) {
          // 没有登录
          location.href = 'login.html?from=' + location.href
        }
        if (info.success) {
          mui.confirm(
            '添加成功',
            '温馨提示',
            ['去购物车', '继续浏览'],
            function(e) {
              if (e.index === 0) {
                location.href = 'cart.html'
              }
            }
          )
        }
      }
    })
  })
})
