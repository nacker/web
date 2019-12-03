Vue.component("todos", {
	template: `<!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class editing when editing and completed when marked as completed -->
      <li v-for="item in todosToShow" :key="item.id" :class="{completed: item.isCompleted, editing: currentEditId == item.id}" @dblclick="editTodo(item.id)">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="item.isCompleted" />
          <label>{{item.todo}}</label>
          <button class="destroy" @click="del(item.id)"></button>
        </div>
        <input class="edit" v-model="item.todo" @keyup.enter="currentEditId = -1"/>
      </li>
    </ul>
  </section>`,
	props: ["todoList"],
	data() {
		return {
			currentEditId: -1,
			filter: "all"
		};
	},
	methods: {
		del(id) {
			// 获取当前项的id，调用父组件传递过来的事件
			this.$emit("delTodooooo", id);
		},
		editTodo(id) {
			this.currentEditId = id;
		},
		getFilter(value) {
			// console.log(value);
			this.filter = value;
		}
	},
	created() {
		bus.$on("sendFilter", this.getFilter);
	},
	computed: {
		todosToShow() {
			switch (this.filter) {
				case "all":
					return this.todoList.filter(v => true);
				case "active":
					return this.todoList.filter(v => !v.isCompleted);
				case "completed":
					return this.todoList.filter(v => v.isCompleted);
			}
		}
	}
});

// 父组件传递给子组件的数据是不可以被修改的

// 不能被修改，说的是不能被赋值 this.父组件传递过来的数据 = 新值

// 但是： 如果父组件传递过来的是一个对象，那么在子组件中，是可以修改这个对象中的属性的！！！
