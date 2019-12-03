<?php
  // 浏览器： 把我给你的内容当成html来解析，使用utf-8编码解析
  header("content-Type:text/html;charset=utf-8");
  // echo '<h1>你好吗</h1>';
  // echo '<h3>我不好</h3>';


  // php中定义变量不用  用$
  // $name = '胡聪聪';
  // $age = 18;
  // // echo $name;
  // // echo $age;

  // // php中的拼串 使用.
  // echo '大家好，我是'.$name.'，我今年'.$age.'岁';


  $name = '胡聪聪';
  // $name1 = "胡聪聪";

  // php中的双引号中能够识别变量
  echo "大家好，我是".$name;
?>