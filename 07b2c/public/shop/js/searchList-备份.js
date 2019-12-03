/* 
  location：可以获取到地址栏中的url中的每一个部分
  http://www.baidu.com/pages/index.html?name=zs&age=18#abc
  location.href:     整个url地址
  location.protocol: 协议  http
  location.hostname: 域名  www.baidu.com
  location.port:     端口  80
  location.host    :  域名+端口   www.baidu.com:80
  location.origin:   源  协议+域名+端口   http://www.baidu.com:80
  location.pathname:  路径   /pages/index.html
  location.search   :  参数   ?name=zs&age=18
  location.hash    :   用来锚点    #abc    vue  spa :单页面应用程序
*/
$(function() {
  // 需要获取到地址栏中的key对应的值

  var search = location.search
  // 对参数进行解码
  // 数组  join   拼成字符串
  // 字符串  split  把字符串切割成数组
  search = decodeURI(search)
  var key = search.split('=')[1]
  $('.search input').val(key)

  // 发送ajax请求
  var render = function() {
    var param = {
      page: 1,
      pageSize: 100,
      proName: key
    }

    // 做一些判断， 有可能需要给param增加第四个参数
    /* 
      1. 判断是否需要传参数，  判断li里面是否有now。有now说明需要排序
      2. 判断传谁  传什么值 传1还是2  price 1  price 2  num 1 num 2
    */
    var $now = $('.sort li.now')
    if ($now.length === 1) {
      console.log('需要传参数')
      // 需要传的类型  price num
      var type = $now.data('type')
      // 需要传递的值  只需要判断 $now 下的 i的方向
      var value = $now.find('i').hasClass('fa-angle-down') ? 2 : 1
      param[type] = value
    }

    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success: function(info) {
        console.log(info)
        $('.product').html(template('tpl', info))
      }
    })
  }
  render()

  // 点击搜索的功能
  $('.search button').on('click', function() {
    key = $('.search input').val()
    // 点击搜索按钮，跳转页面
    location.href = 'searchList.html?key=' + key
  })

  /* 
    排序功能
    1. 先处理样式
      1.1 给所有的li注册点击事件
      1.2 判断当前li是否有now这个类
      1.3 如果没有， 让当前的li有now的类，并且移除其他li的类
      1.4 如果有， 让当前li下的箭头发生改变
    2. 处理数据
  */
  $('.sort li[data-type]').on('click', function() {
    var $this = $(this)
    if (!$this.hasClass('now')) {
      // 没有
      $this
        .addClass('now')
        .siblings()
        .removeClass('now')
      // 让所有的i都向下
      $('.sort i')
        .removeClass('fa-angle-up')
        .addClass('fa-angle-down')
    } else {
      $this
        .find('i')
        .toggleClass('fa-angle-down')
        .toggleClass('fa-angle-up')
    }

    render()
  })
})
