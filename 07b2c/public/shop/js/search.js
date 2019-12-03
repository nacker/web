$(function() {
  var SH = 'search_history'
  // 搜索历史的展示功能
  // 1. 获取到历史记录， 得到的是一个数组 如果是null，默认为空数组
  var getHistory = function() {
    return JSON.parse(localStorage.getItem(SH)) || []
  }

  var render = function() {
    var history = getHistory()
    $('.history').html(template('tpl', { list: history }))
  }

  render()

  // 清空功能
  // 1. 清空按钮注册点击事件
  // 2. 移除search_list
  // 3. 重新渲染
  $('.history').on('click', '.btn-empty', function() {
    mui.confirm(
      '你确定要清空所有的历史记录吗?',
      '温馨提示',
      ['是', '否'],
      function(e) {
        if (e.index === 0) {
          localStorage.removeItem(SH)
          render()
        }
      }
    )
  })

  // 删除功能
  // 1. 给删除按钮注册点击事件
  // 2. 获取需要删除的按钮的下标
  // 3. 获取历史记录的数组
  // 4. 根据下标删除数组某一项  splice
  // 5. 存储到localStorage
  // 6. 重新渲染
  $('.history').on('click', '.btn-delete', function() {
    var index = $(this).data('index')
    var history = getHistory()

    // splice(start, deleteCount, 增加的元素)
    history.splice(index, 1)
    localStorage.setItem(SH, JSON.stringify(history))
    render()
  })

  // 添加功能
  // 1. 给按钮注册点击事件
  // 2. 获取到输入的内容， 判断非空
  // 3. 获取到本地缓存中的数组
  // 4. 把搜索的内容添加到数组最前面
  // 5. 把数组存回去
  // 6. 不需要重新渲染，只需要页面跳转
  $('.search button').on('click', function() {
    var key = $('.search input').val()
    $('.search input').val('')
    // if (!key) return alert('请输入搜索关键字')

    if (!key) {
      mui.toast('请输入搜索关键字')
      return
    }
    // 获取历史记录
    var history = getHistory()
    // 先判断数组中是否有key，如果有就删除
    var index = history.indexOf(key)
    // 说明有
    if (index !== -1) {
      history.splice(index, 1)
    }

    // 说明历史记录满了
    if (history.length >= 10) {
      history.pop()
    }
    // 把key存储历史记录最前面
    history.unshift(key)
    // 重新存回localstorage
    localStorage.setItem(SH, JSON.stringify(history))
    // render()

    // 需要跳转
    location.href = 'searchList.html?key=' + key
  })
})
