$(function() {
  // 发送ajax请求，获取所有的用户数据
  var page = 1
  var pageSize = 5
  var render = function() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info)
        var html = template('tpl', info)
        $('tbody').html(html)

        // 分页操作， 分页的总页数依赖总条数
        $('#paginator').bootstrapPaginator({
          // bootstrap的版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function() {
            // console.log(arguments[3])
            page = arguments[3]
            render()
          }
        })
      }
    })
  }
  render()

  // 启用和禁用的功能
  var id, isDelete
  $('tbody').on('click', '.btn', function() {
    $('#userModal').modal('show')
    id = $(this)
      .parent()
      .data('id')
    isDelete = $(this).text() === '启用' ? 1 : 0
  })

  $('.btn-confirm').on('click', function() {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function(info) {
        if (info.success) {
          // 隐藏模态框
          $('#userModal').modal('hide')
          render()
        }
      }
    })
  })
})
