$(function() {
  // 查询所有的一级分类
  var renderFirst = function() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategory',
      success: function(info) {
        console.log(info)
        $('.aside ul').html(template('tpl1', info))

        // 渲染第一个一级对应的二级
        renderSecond(info.rows[0].id)
      }
    })
  }

  var renderSecond = function(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      success: function(info) {
        console.log(info)
        $('.content ul').html(template('tpl2', info))
      }
    })
  }
  renderFirst()

  // 点击一级，渲染二级
  $('.aside').on('click', 'li', function() {
    $(this)
      .addClass('now')
      .siblings()
      .removeClass('now')

    var id = $(this).data('id')
    renderSecond(id)

    // 让右边的mui-scroll 滚动到0，0
    mui('.content .mui-scroll-wrapper')
      .scroll()
      .scrollTo(0, 0, 500)
  })
})
