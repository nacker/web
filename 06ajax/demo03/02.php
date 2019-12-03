<?php
  // 服务器要返回xml数据， 指定解析格式 text/xml
  header('content-type:text/xml;charset=utf-8');
  // php读取到demo.xml中的内容
  $result = file_get_contents('demo.xml');
  echo $result;
?>