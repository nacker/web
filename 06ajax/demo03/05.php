<?php
  header('content-type:text/html;charset=utf-8');

  // php中数组， 数组中还存在对象
  $heros = array(
    0 => array("name"=>"喜羊羊", "gender"=>"男", "skill"=>"招狼"),
    1 => array("name"=>"钢铁侠", "gender"=>"男", "skill"=>"撩妹"),
    2 => array("name"=>"绿巨人", "gender"=>"男", "skill"=>"变绿"),
    3 => array("name"=>"黑寡妇", "gender"=>"女", "skill"=>"撩汉"),
    4 => array("name"=>"星爵", "gender"=>"男", "skill"=>"尬舞")
  );

  echo json_encode($heros, JSON_UNESCAPED_UNICODE);
?>