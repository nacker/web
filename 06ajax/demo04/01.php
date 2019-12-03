<?php
  header('content-type: text/json;charset=utf-8');
  if ($_POST['username'] === 'admin' && $_POST['password'] === '123456') {
    $result = array(
      "state" => 1,
      "msg" => "登录成功"
    );
  } else {
    $result = array(
      "state" => 0,
      "msg" => "用户名或者密码错误"
    );
  }
  // sleep(3);
  echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>