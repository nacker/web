$(function() {
  // 渲染一级分类
  var page = 1
  var pageSize = 5
  var render = function() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        // console.log(info)
        $('tbody').html(template('tpl', info))

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function() {
            page = arguments[3]
            render()
          }
        })
      }
    })
  }
  render()

  // 添加一级分类
  var $addModal = $('#addModal')
  $('.btn-add').on('click', function() {
    $addModal.modal('show')
  })

  // 表单校验
  $('form').bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类不能为空'
          }
        }
      }
    },
    feedbackIcons: {
      // 校验成功的图标
      valid: 'glyphicon glyphicon-thumbs-up',
      // 校验失败的图标
      invalid: 'glyphicon glyphicon-thumbs-down',
      // 正在校验中的图标
      validating: 'glyphicon glyphicon-refresh'
    }
  })

  // 表单校验成功的时候，需要发送ajax请求 添加一级分类
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('form').serialize(),
      success: function(info) {
        if (info.success) {
          // 模态框隐藏
          $addModal.modal('hide')
          // 重新渲染第一页
          page = 1
          render()
          // 重置表单的样式
          $('form')
            .data('bootstrapValidator')
            .resetForm(true)
        }
      }
    })
  })
})
