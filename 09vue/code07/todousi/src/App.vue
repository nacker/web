<template>
  <div id="app">
    <section class="todoapp" id="app">
			
			<add-todo @addTodo="addTodo"></add-todo>
			<todos :todoList="todoList" @delTodo="delTodo"></todos>
			<todo-filter :todoList="todoList" @clearTodo="clearTodo"></todo-filter>
			
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<!-- Remove the below line ↓ -->
			<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
			<!-- Change this out with your name and url ↓ -->
			<p>Created by <a href="http://todomvc.com">you</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
    <!-- <router-view /> -->
  </div>
</template>

<script>
// const addTodo=require("./components/addTodo.vue")
// const todos=require("./components/todos.vue")
// const todoFilter=require("./components/todoFilter.vue")

import addTodo from "./components/addTodo.vue";
import todos from "./components/todos.vue";
import todoFilter from "./components/todoFilter.vue";

export default {
  components: {
    addTodo,
    todos,
    todoFilter
  },
  data() {
    return {
      todoList: [
        {
          id: 1,
          todo: "买了伞，千万不能把伞淋湿了藏起来",
          isCompleted: false
        },
        {
          id: 2,
          todo: "不买伞了，太贵了",
          isCompleted: false
        }
      ]
    };
  },
  methods:{
    addTodo(value) {
      let duixiang={
        id:this.todoList.length?this.todoList[this.todoList.length-1].id+1:1,
        todo:value,
        isCompleted:false
      }
      this.todoList.push(duixiang)
    },
    delTodo(id) {
      this.todoList=this.todoList.filter(v=>v.id!=id)
    },
    clearTodo(){
      this.todoList=this.todoList.filter(v=>!v.isCompleted)
    }
  }
};
</script>

<style lang="less">
</style>
