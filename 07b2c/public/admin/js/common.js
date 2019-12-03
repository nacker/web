// 每个网页都需要的功能
$(function(){
  // ajax的6个全局事件
  // ajaxStart
  // ajaxSend
  // ajaxSuccess
  // ajaxError
  // ajaxComplete
  // ajaxStop
  $(document).ajaxStart(function() {
    // console.log('当ajax开始发送的时候，就会触发')
    NProgress.start()
  })

  $(document).ajaxStop(function() {
    // console.log('当ajax结束的时候，就会触发')
    setTimeout(function() {
      NProgress.done()
    }, 1000)
  })




  // 1. 二级菜单的显示和隐藏
  $('.second').prev().click(function() {
    $('.second').stop(true).slideToggle()
  })

  // 2. 侧边栏的显示和隐藏
  /* 
    var flag = true;
    $('.icon-toggle').click(function() {
      if (flag) {
        $('.lt_aside').animate({left: -180})
        $('.lt_content').animate({paddingLeft: 0})
        $('.topbar').animate({left: 0})
      } else {
        $('.lt_aside').animate({left: 0})
        $('.lt_content').animate({paddingLeft: 180})
        $('.topbar').animate({left: 180})
      }
      flag = !flag
    }) 
  */
  $('.icon-toggle').click(function() {
    $('.lt_aside, .lt_content, .topbar').toggleClass('now')
    // $('.lt_content').toggleClass('now')
  })


  // 退出功能
  $('.icon-logout').on('click', function() {
    // 显示退出的模态框
    $("#logoutModal").modal('show')
  })

  $('.btn-logout').on('click', function() {
    // 退出功能
    // location.href = 'login.html'
    // 发送ajax请求
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function(info) {
        // console.log(info)
        if (info.success) {
          // 服务端退出成功
          location.href = 'login.html'
        }
      }
    })
  })
})