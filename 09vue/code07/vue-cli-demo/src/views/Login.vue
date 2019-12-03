<template>
  <div class="login-box">
    这是登录页 {{msg}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg: "hello 我是一个新页面"
    }
  }
}
</script>

<style scoped>
  .login-box{
    background-color:pink;
  }
</style>