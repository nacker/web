<template>
  <section class="main">
		<input id="toggle-all" class="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">
			<!-- These are here just to show the structure of the list items -->
			<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
			<li  v-for="item in todoList" :key="item.id" :class="{completed:item.isCompleted,editing:item.id == sb}" @dblclick="dblTodo(item.id)">
				<div class="view">
					<input class="toggle" type="checkbox" v-model="item.isCompleted">
					<label>{{item.todo}}</label>
					<button class="destroy" @click="delTodo(item.id)"></button>
				</div>
				<input class="edit" v-model="item.todo" @keyup.enter="sb=-1">
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	data(){
		return {
			sb:-1
		}
	},
	props:['todoList'],
	methods:{
		delTodo(id){
			this.$emit("delTodo",id)
		},
		dblTodo(id){
			this.sb=id
		}
	}
}
</script>

