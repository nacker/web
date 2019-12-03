<?php
  // 18107623359 王怡力
  // 15397917862  刘芬
  $mobile = $_GET['mobile'];
  $mobiles = ['18511249258', '13211223344', '18107623359', '15397917862'];
  if (in_array($mobile, $mobiles)) {
    echo 'yes';
  } else {
    echo 'no';
  }
?>