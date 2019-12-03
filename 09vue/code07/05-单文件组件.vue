<template>
  <div class="box">
    {{msg}}
    <input type="text" />
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg: "hello"
    }
  }
}
</script>

<style scoped>
  /* 如果给style标签不加scoped属性，那么这个style标签中的样式，会影响到别的组件中的内容，也就是说他是全局生效的 */
  /* 如果只想让这些样式在当前组件内生效，那我们就添加一个scoped属性，就可以了 */
  .box {
    background-color: #fff;
  }
</style>