<?php
  header('content-type:text/html;charset=utf-8');
  $arr = ['鸡你太美', '爱过', '先救我妈', '我爸是李刚', '你好帅啊', '我们约么', '丑拒', 'ff你这么穿着品如的衣服'];
  sleep(1);
  echo $arr[array_rand($arr, 1)];

?>