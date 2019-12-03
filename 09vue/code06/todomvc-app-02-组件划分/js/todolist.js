Vue.component("todolist", {
  template: `<section class="todoapp">

  <addtodo @addTodo="addTodo"></addtodo>
  
  <todos :todoList="todoList" @delTodooooo="delTodo"></todos>

  <filters :todoList="todoList" @clearCmpl="clearCmpl"></filters>

  </section>`,
  data(){
    return {
      todoList: [
        {
          "id": 2,
          "todo": "买了伞，千万不能把伞淋湿了藏起来",
          "isCompleted": false
        },
        {
          "id": 3,
          "todo": "不买伞了，太贵了",
          "isCompleted": false
        }
      ]
    }
  },
  methods: {
    addTodo(value){
      // 这里的这个函数，就是用来接收子组件传递过来的用户输入的内容的
      // 接收到内容之后，需要把这个内容添加到数组中
      // console.log(value);
      let newTodo = {
        id: this.todoList.length > 0 ? this.todoList[this.todoList.length - 1].id + 1 : 1,
        todo: value,
        isCompleted: false
      }

      this.todoList.push(newTodo);
    },
    delTodo(id){
      // console.log(id);
      // 根据子组件传递过来的id，将数组中对应的数据删除
      this.todoList = this.todoList.filter(v => v.id !== id);
    },
    clearCmpl(){
      this.todoList = this.todoList.filter(v => !v.isCompleted);
    }
  }
});
