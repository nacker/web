/* 
  参数1： type  请求的方式  get  post  默认为get
  参数2： url    请求的地址  没有默认值
  参数3： data  请求的数据 默认为 ''
  参数4： success  要求： success的是一个函数
  参数5： error    error表示调用结构失败了
  参数6： dataType  表示响应的数据格式  text/json/xml  默认 text
*/
function ajax(options) {
  // 如果options没有传，或者options传的不是对象类型 不发送请求
  if (!options || typeof options !== 'object') {
    return
  }

  // 处理url  如果url没有传递，不发送请求
  var url = options.url
  if (!url) {
    return
  }

  // 处理type, 默认type为get
  var type = options.type || 'get'
  // 处理data
  var data = options.data || null
  if (data && typeof data === 'object') {
    // {username: "111", password: "222"}
    // username=111&password=222
    // 把data对象变成字符串
    var arr = []
    for (var k in data) {
      arr.push(k + '=' + data[k])
    }
    data = arr.join('&')
  }

  var dataType = options.dataType || 'text'

  // 创建ajax对象
  var xhr = new XMLHttpRequest()

  // 设置请求行
  // 如果get请求，url需要拼接data
  if (type === 'get' && data) {
    // 对data进行处理
    url = url + '?' + data
    data = null
  }
  xhr.open(type, url)

  // 处理请求头
  if (type === 'post') {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
  }

  // 处理请求
  xhr.send(data)

  // 处理响应
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // 如果传递了success 就调用
        if (dataType === 'xml') {
          result = xhr.responseXML
        } else if (dataType === 'json') {
          result = JSON.parse(xhr.responseText)
        } else {
          result = xhr.responseText
        }
        options.success && options.success(result)
      } else {
        // 如果传递error,就调用
        options.error && options.error()
      }
    }
  }
}
