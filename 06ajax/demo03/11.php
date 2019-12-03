<?php
  if ($_POST['username'] === 'admin' && $_POST['password'] === '123456') {
    echo 'success';
  } else {
    echo 'fail';
  }
?>