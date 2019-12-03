$(function() {
  // 表单校验
  // 用户名： 非空  长度2-6位
  // 配置校验的规则
  // 校验插件： 表单提交的时候校验   在输入内容触发的时候

  // 校验插件会在表单提交的时候做表单校验， 如果校验不通过，插件会自动帮我们禁用表单的提交
  // 如果校验通过，插件会让表单继续提交
  $('form').bootstrapValidator({
    // 用于配置那些字段需要校验， 校验规则直接对应表单的name属性
    fields: {
      username: {
        // 配置username的校验规则
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须是2-6位'
          },
          // 没有任何的校验规则
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '用户密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          },
          callback: {
            message: '密码错误'
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
    },
  });


  // 给表单注册 表单校验成功事件  插件给表单提供的一个事件
  $('form').on('success.form.bv', function(e){
    // 阻止浏览器的默认行为
    e.preventDefault();
    // console.log('哈哈')

    $.ajax({
      type: 'POST',
      url: '/employee/employeeLogin',
      data: $('form').serialize(),
      success: function(info) {
        if(info.error === 1000) {
          // 手动调用 updateStatus 把username改成校验失败
          $('form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
        }
        if (info.error === 1001) {
          $('form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
        }
        if (info.success) {
          // 登录成功，跳转到首页
          location.href = 'index.html'
        }
      }
    })
  })

  // 重置样式
  $('[type=reset]').on('click', function() {
    $('form').data('bootstrapValidator').resetForm(true);
  })
})