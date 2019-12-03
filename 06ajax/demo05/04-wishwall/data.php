<?php
  header("content-type:text/json;charset=utf-8");
  echo file_get_contents("data.json");
?>