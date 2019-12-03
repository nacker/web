$(function() {
  // 购物车渲染
  var render = function() {
    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      success: function(info) {
        $('#OA_task_1').html(template('tpl', { list: info }))

        // 注册事件
      }
    })
  }
  render()

  $('#OA_task_1').on('click', '.btn-delete', function() {
    var id = $(this).data('id')
    console.log(id)
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      data: {
        // 主要删除的id必须是一个数组
        id: [id]
      },
      success: function(info) {
        // console.log(info)
        if (info.success) {
          render()
        }
      }
    })
  })
})
