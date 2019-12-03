<template>
    <div id="app">
        <section class="todoapp">
            <add-todo></add-todo>
            <todos></todos>
            <todo-filter></todo-filter>
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <!-- Remove the below line ↓ -->
            <p>
                Template by
                <a href="http://sindresorhus.com">Sindre Sorhus</a>
            </p>
            <!-- Change this out with your name and url ↓ -->
            <p>
                Created by
                <a href="http://todomvc.com">you</a>
            </p>
            <p>
                Part of
                <a href="http://todomvc.com">TodoMVC</a>
            </p>
        </footer>
    </div>
</template>

<script>
// 如果要在一个组件中使用另外一个组件
// 1. 需要先把组件文件进行导入  （导入的语法可以是node.js导入语法， 还可以是es6的导入语法, 在3.0中如果要用node.js的写法，需要进行配置）

// const AddTodo = require("./components/AddTodo.vue")
// const Todos = require("./components/Todos.vue")
// const TodoFilter = require("./components/TodoFilter.vue")

import AddTodo from "./components/AddTodo.vue";
import Todos from "./components/Todos.vue";
import TodoFilter from "./components/TodoFilter.vue";

export default {
    components: {
        AddTodo: AddTodo,
        Todos,
        TodoFilter
    }
};
</script>

<style lang="less">
</style>
