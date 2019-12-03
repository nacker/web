$(function() {
  $('.btn-logout').on('click', function() {
    $.ajax({
      type: 'get',
      url: '/user/logout',
      success: function(info) {
        if (info.success) {
          location.href = 'login.html'
        }
      }
    })
  })
})
