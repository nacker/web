<template>
  <div class="box">
    {{msg}}
    <input type="text"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "fuck"
    };
  }
};
</script>
<style scoped>
.box {
  background-color: #33aaaa;
}
</style>
