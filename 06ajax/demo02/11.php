<?php
  header('content-type:text/html;charset=utf-8');
  $username = $_POST['username'];
  $password = $_POST['password'];
  if ($username === 'admin' && $password === '123456') {
    echo 'success';
  } else {
    echo 'fail';
  }
?>