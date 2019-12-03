<?php

  //获取到文件
  //print_r($_FILES);

  $tempFile = $_FILES['img']["tmp_name"];
  $fileName = "uploads/".$_FILES['img']["name"];

  move_uploaded_file($tempFile, $fileName);

  echo $fileName;

?>