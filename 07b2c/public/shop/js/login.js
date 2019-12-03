$(function() {
  $('.btn-login').on('click', function() {
    var username = $('[name=username]').val()
    if (!username) {
      return mui.toast('用户名不能为空')
    }
    var password = $('[name=password]').val()
    if (!password) {
      return mui.toast('密码不能为空')
    }

    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: $('form').serialize(),
      success: function(info) {
        // console.log(info)
        if (info.error) {
          mui.toast('用户名或者密码错误')
        }

        // 成功了该怎么办？
        if (info.success) {
          // 判断地址栏中是否有from，如果有from就跳回去  如果没有直接首页
          if (location.search.indexOf('from') === -1) {
            // 不用回跳，回到首页
            location.href = 'index.html'
          } else {
            location.href = location.search.replace('?from=', '')
          }
        }
      }
    })
  })
})
