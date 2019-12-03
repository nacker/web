<?php
  $username = $_GET['username'];
  // 后台根据用户名去数据库查询是否有这条记录
  $arr = ['hucc', 'hcc', 'hucongcong', 'cc', 'zzc'];
  // 判断$arr中是否包含$username
  if (in_array($username, $arr)) {
    // 说明有
    echo 'yes';
  } else {
    // 没有
    echo 'no';
  }
?>