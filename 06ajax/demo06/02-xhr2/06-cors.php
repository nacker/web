<?php

  //Access-Control-Allow-Origin用于配置允许跨域访问这个接口的网址
  // * :允许所有的网站都能够跨域的访问我这个接口
  // header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Origin:http://www.hcc.com");
  header("content-type:text/html;charset=utf-8");
  echo "hello world";
?>