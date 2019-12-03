Vue.component("addtodo", {
  template: `<header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      @keyup.enter="addTodo"
      v-model="newTodo"
    />
  </header>`,
  data(){
    return {
      newTodo: ""
    }
  },
  methods: {
    addTodo(){
      // 1. 需要获取用户的输入  this.newTodo
      // 2. 将用户输入的内容，添加到父组件中的todoList数组中
      // 通过子传父，将当前用户输入的内容，传递给父组件，父组件接收到这个数据之后，将他添加到数组中
      this.$emit("addTodo", this.newTodo);
      this.newTodo = "";
    }
  }
})