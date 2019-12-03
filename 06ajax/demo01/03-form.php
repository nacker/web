<?php
  // 服务器会获取到用户名和密码
  // 判断用户名和密码是否符合要求
  // print_r( $_GET );
  // 最终一定会给浏览器响应
  header("content-Type:text/html;charset=utf-8");
  if ($_POST['username'] == 'admin' && $_POST['password'] == '123456') {
    echo '恭喜你，登陆成功了';
  } else {
    echo '你的用户名或者密码错误';
  }
?>