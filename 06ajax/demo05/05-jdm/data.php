<?php
  header('content-type:text/json;charset=utf-8');
  $navs = array(
    0 => array("url"=>"http://www.baidu.com", "src"=>"images/nav01.png", "text"=> "京东超市"),
    1 => array("url"=>"http://www.baidu.com", "src"=>"images/nav02.png", "text"=> "全球购"),
    2 => array("url"=>"http://www.baidu.com", "src"=>"images/nav03.png", "text"=> "全球购1"),
    3 => array("url"=>"http://www.baidu.com", "src"=>"images/nav04.png", "text"=> "京东超市2"),
    4 => array("url"=>"http://www.baidu.com", "src"=>"images/nav05.png", "text"=> "京东超市3"),
    5 => array("url"=>"http://www.baidu.com", "src"=>"images/nav06.png", "text"=> "京东超市4"),
    6 => array("url"=>"http://www.baidu.com", "src"=>"images/nav07.png", "text"=> "京东超市100"),
    7 => array("url"=>"http://www.baidu.com", "src"=>"images/nav08.png", "text"=> "京东超市101"),
    8 => array("url"=>"http://www.baidu.com", "src"=>"images/nav09.png", "text"=> "京东超市102"),
    9 => array("url"=>"http://www.baidu.com", "src"=>"images/nav10.png", "text"=> "京东超市103")
  );
  echo json_encode($navs, JSON_UNESCAPED_UNICODE);
?>