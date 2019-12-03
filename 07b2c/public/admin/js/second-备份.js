$(function() {
  var page = 1
  var pageSize = 5
  var render = function() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        //ES3
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        // console.log(info)
        $('tbody').html(template('tpl', info))
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
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

  // 添加功能
  var $addModal = $('#addModal')
  $('.btn-add').on('click', function() {
    // 显示模态框
    $addModal.modal('show')
    // 加载所有的一级分类的数据
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 1000
      },
      success: function(info) {
        console.log(info)
        $('.dropdown-menu').html(template('tpl2', info))
      }
    })
  })

  // 上传图片
  // var file = document.querySelector('#file')
  // file.onchange = function() {
  //   var xhr = new XMLHttpRequest()
  //   // 创建了一个空的formData
  //   var formData = new FormData()
  //   // 文件
  //   formData.append('pic1', file.files[0])
  //   xhr.open('post', '/category/addSecondCategoryPic')
  //   xhr.send(formData)
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       var result = JSON.parse(xhr.responseText)
  //       document.querySelector('.img_box img').src = result.picAddr
  //     }
  //   }
  // }
  // 图片上传
  $('#file').fileupload({
    done: function(e, data) {
      // console.log(data.result)
      var result = data.result.picAddr
      $('.img_box img').attr('src', result)
      // 把result放到input框中
      $('[name=brandLogo]').val(result)
      // 把表单校验改成成功
      $('form')
        .data('bootstrapValidator')
        .updateStatus('brandLogo', 'VALID')
    }
  })

  // 一级分类选择功能
  $('.dropdown-menu').on('click', 'a', function() {
    // console.log('1')
    // 把选中一级分类的文字显示
    $('.dropdown-text').text($(this).text())
    // 把当前的id值放到categoryId中
    $('[name=categoryId]').val($(this).data('id'))
    $('form')
      .data('bootstrapValidator')
      .updateStatus('categoryId', 'VALID')
  })

  // 表单校验
  $('form').bootstrapValidator({
    // 不用做校验的类型  默认 禁用  不可见 隐藏
    excluded: [],
    feedbackIcons: {
      // 校验成功的图标
      valid: 'glyphicon glyphicon-thumbs-up',
      // 校验失败的图标
      invalid: 'glyphicon glyphicon-thumbs-down',
      // 正在校验中的图标
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '一级分类不能为空，请选一个'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类的名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传二级分类的LOGO'
          }
        }
      }
    }
  })

  // 给表单注册校验成功事件
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('form').serialize(),
      success: function(info) {
        // console.log(info)
        if (info.success) {
          $addModal.modal('hide')
          // 重新渲染第一页
          page = 1
          render()
          // 重置表单
          $('form')
            .data('bootstrapValidator')
            .resetForm(true)

          // 恢复按钮的默认值
          $('.dropdown-text').text('请选择一级分类')
          // 恢复图片的默认值
          $('.img_box img').attr('src', 'images/none.png')
        }
      }
    })
  })
})
