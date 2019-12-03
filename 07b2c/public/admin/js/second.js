/* 
  1. 二级分类列表显示出来
    1.1 发送ajax请求请求数据
    1.2 结合模版引擎渲染数据
    1.3 分页
  
  2. 点击添加按钮的功能
    2.1 显示模态框
    2.2 动态加载下拉菜单（一级分类的数据）
    2.3 通过模版引擎渲染出来


  3. 一级分类的选择功能
    3.1 所有的一级分类的a注册点击事件(委托)
    3.2 获取到当前a的内容，给dropdown-text
    3.3 获取到当前a上的自定义属性id, 给一个隐藏的input框  name属性应该categoryId


  4. 图片上传功能
    4.1 引入插件
    4.2 准备一个input框， type:file  需要执行name属性和data-url
    4.3 $('#file').fileupload()  可以获取到上传成功后的图片地址
    4.4 显示出来
    4.5 准备一个隐藏，把图片地址也发送给后台 

  5. 表单校验功能
    5.1 调用bootstrapValidator方法， 指定fields feedbackIcon
    5.2 发现隐藏的input框不参与校验， 设置 excluded
    5.3 选择了一级分类或者上传了图片 校验状态没有发生改变  手动设置为成功


  6. 给表单注册校验成功事件
    6.1 阻止默认行为
    6.2 发送ajax请求
    6.3 成功的时候， 隐藏模态框 重新渲染 重置样式
    6.4 图片和button的文字没有重置， 手动重置
*/
$(function() {
  var page = 1
  var pageSize = 5
  var render = function() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
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
  $('.btn-add').on('click', function() {
    $('#addModal').modal('show')

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

  // 3. 一级分类的选择功能
  $('.dropdown-menu').on('click', 'a', function() {
    var text = $(this).text()
    $('.dropdown-text').text(text)

    // 把id存储给了隐藏的文本框
    var id = $(this).data('id')
    $('[name=categoryId]').val(id)

    // 校验成功
    $('form')
      .data('bootstrapValidator')
      .updateStatus('categoryId', 'VALID')
  })

  // 4. 图片上传
  $('#file').fileupload({
    // 图片上传成功的结果
    done: function(e, data) {
      var picAddr = data.result.picAddr
      $('.img_box img').attr('src', picAddr)
      $('[name=brandLogo]').val(picAddr)
      // 校验成功
      $('form')
        .data('bootstrapValidator')
        .updateStatus('brandLogo', 'VALID')
    }
  })

  // 5. 表单校验
  $('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入品牌名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传品牌图片'
          }
        }
      }
    }
  })

  // 6. 表单校验成功
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('form').serialize(),
      success: function(info) {
        if (info.success) {
          $('#addModal').modal('hide')
          // 重新渲染
          page = 1
          render()
          // 重置样式
          $('form')
            .data('bootstrapValidator')
            .resetForm(true)

          // 手动改变样式
          $('.dropdown-text').text('请选择一级分类')
          $('.img_box img').attr('src', 'images/none.png')
        }
      }
    })
  })
})
