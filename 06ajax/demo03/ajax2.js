/* 
  type : 请求类型  get post  默认 get
  url :   请求地址  没有默认值，必传
  data:  请求数据  可以是字符串  可以是对象（做处理）
  dataType: 获取的数据类型  text json xml  默认 text
  success 成功的回调  成功的时候，把结果传递
  error: 失败的回调  失败的时候调用
*/
function ajax(options) {
  // 参数处理
  if (!options || typeof options !== 'object') {
    return
  }

  var type = options.type || 'get'
  var url = options.url
  if (!url) {
    return
  }
  var data = options.data || null
  // 如果传了，而且是个对象
  if (data && typeof data === 'object') {
    // {username: 'zs', password: '123456'}
    var arr = []
    for (var k in data) {
      arr.push(k + '=' + data[k])
    }
    data = arr.join('&')
  }
  var dataType = options.dataType || 'text'
  var success = options.success
  var error = options.error

  // 创建对象
  var xhr = new XMLHttpRequest()

  // 设置请求行
  if (type === 'get') {
    url = url + '?' + data
    data = null
  }
  xhr.open(type, url)
  // 请求头
  if (type === 'post') {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
  }
  // 请求体
  xhr.send(data)

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var result
        if (dataType === 'xml') {
          result = xhr.responseXML
        } else if (dataType === 'json') {
          result = JSON.parse(xhr.responseText)
        } else {
          result = xhr.responseText
        }
        success && success(result)
      } else {
        error && error()
      }
    }
  }
}
