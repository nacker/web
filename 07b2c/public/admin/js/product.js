/* 
  1. 列表渲染
    1.1 发送ajax请求
    1.2 使用模版进行渲染
    1.3 分页
  2. 点击添加商品，显示模态框


  3. 二级分类的动态渲染
    3.1 发送ajax请求，获取所有的二级分类的数据
    3.2 结合模版引擎，渲染数据
  
  4. 二级分类的选择功能
    4.1 给a注册点击事件（委托）
    4.2 获取到a的内容，设置文本
    4.3 获取a的id， 设置给一个隐藏input框


  5. 上传图片功能
    5.1 引入jquery-fileupload插件
    5.2 准备一个input框type file  指定data-url 和 name
    5.3 调用方法 $('#file').fileupload()
    5.4 把上传成功的图片显示到页面中
    5.5 把上传的图片将来需要传递到后台

  6. 表单校验
    6.1 引入文件
    6.2 调用 $('form').bootstrapValidator()  fields  feedbackIcon  excluded


  7. 给表单注册校验成功事件
    7.1 阻止默认行为
    7.2 通过表单序列化得到所有的参数 除了 picAddr

*/

$(function() {
  var page = 1
  var pageSize = 5
  var picArray = []
  // 用来存放上传成功的结果

  var render = function() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info)
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

  $('.btn-add').on('click', function() {
    $('#addModal').modal('show')

    // 发送ajax请求，获取二级分类数据
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 1000
      },
      success: function(info) {
        // console.log(info)
        $('.dropdown-menu').html(template('tpl2', info))
      }
    })
  })

  // 二级分类的选择功能
  $('.dropdown-menu').on('click', 'a', function() {
    var text = $(this).text()
    $('.dropdown-text').text(text)

    // 获取id
    var id = $(this).data('id')
    $('[name=brandId]').val(id)

    // 手动改成成功
    $('form')
      .data('bootstrapValidator')
      .updateStatus('brandId', 'VALID')
  })

  // 图片上传功能
  $('#file').fileupload({
    done: function(e, data) {
      console.log(data.result)

      // 给 img_box添加一张图片即可
      $(
        '<img width="100" height="100" src="' +
          data.result.picAddr +
          '" alt="" />'
      ).appendTo('.img_box')

      // 把上传成功的结果保存到一个数组
      picArray.push(data.result)
      if (picArray.length > 3) {
        picArray.shift()
        $('.img_box img')
          .eq(0)
          .remove()
      }

      if (picArray.length === 3) {
        $('form')
          .data('bootstrapValidator')
          .updateStatus('sb', 'VALID')
      } else {
        $('form')
          .data('bootstrapValidator')
          .updateStatus('sb', 'INVALID')
      }
    }
  })

  // 表单校验
  $('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择一个二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品的名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品的描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品的库存'
          },
          // 数字： 库存范围1-99999
          regexp: {
            regexp: /^[1-9]\d{0,4}$/,
            message: '请输入有效的库存(1-99999)'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品的尺码'
          },
          // 尺码需要是范围 00-99
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入有效的尺码范围(xx-xx)'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品的原价'
          },
          // 100.00
          // 200
          // 9999
          regexp: {
            regexp: /^\d+(\.\d{1,2})?$/,
            message: '请输入正确的价格'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品的价格'
          },
          regexp: {
            regexp: /^\d+(\.\d{1,2})?$/,
            message: '请输入正确的价格'
          }
        }
      },
      sb: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  })

  // 校验成功
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    var param = $('form').serialize()
    param += '&picArr=' + JSON.stringify(picArray)
    console.log(param)
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: param,
      success: function(info) {
        if (info.success) {
          $('#addModal').modal('hide')
          page = 1
          render()

          // 重置表单
          $('form')
            .data('bootstrapValidator')
            .resetForm(true)

          // 手动清除
          $('.dropdown-text').text('请选择二级分类')
          $('.img_box img').remove()
          // 把数组也清了
          picArray = []
        }
      }
    })
  })
})
