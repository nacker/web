<template>
  <header class="header">
			<h1>todos</h1>
			<input class="new-todo" placeholder="What needs to be done?" autofocus v-model="newTodo" @keyup.enter="addTodo">
	</header>
</template>
<script>
export default {
	data() {
		return {
			newTodo:''
		}
	},
	methods:{
		addTodo(){
			this.$emit("addTodo",this.newTodo)
			this.newTodo=''
		}
	}
}
</script>
