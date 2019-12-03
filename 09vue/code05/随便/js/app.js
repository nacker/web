(function (window) {
	const vm = new Vue({
		el: "#app",
		data: {
			todoList: [],
			newTodo: "",
			currentEdit: -1,
			todoFilter: "all"
		},
		methods: {
			getTodos() {
				axios({
					url: "http://localhost:3000/todos"
				}).then(res => {
					this.todoList = res.data
				})
			},

			toggleTodo(id) {
				let todo = this.todoList.find(v => {
					return v.id === id
				})
				console.log(todo)
				axios({
					url: `http://localhost:3000/todos/${id}`,
					method: 'patch',
					data: {
						isCompleted: todo.isCompleted
					}
				}).then(res => {
					if (res.status == 200) {
						console.log('切换成功')
					}
				})
			},
			delTodo(id) {
				// 获取到点击事件传递过来的id之后
				// 我们需要根据id找到数组里面对应的的元素，并且删除
				axios({
					url: `http://localhost:3000/todos/${id}`,
					method: 'delete',
				}).then(res => {
					if (res.status == 200) {
						this.getTodos()
					}
				})
			},

			addTodo(e) {
				let newTodo = {
					id: this.todoList.length ?
						this.todoList[this.todoList.length - 1].id + 1 : 1,
					todo: this.newTodo,
					isCompleted: false
				};

				// console.log(newTodo);
				axios({
					url: "http://localhost:3000/todos",
					method: 'post',
					data: newTodo
				}).then(res => {
					if (res.status == 201) {
						this.todoList.push(newTodo);
					}
				})

				// 2. 把用户输入的内容添加到数组中


				// 3. 将文本框清空
				this.newTodo = "";
			},

			editTodo(id) {
				// console.log("edit")
				// 在双击当前li元素的时候，我们需要让当前的todo项处于编辑状态
				// 只要给当前li元素添加一个 editing类样式 就能够实现编辑状态的显示了

				// 思路：
				// 1. 设置一个数据，用来保存当前正在编辑的元素的id， 默认为-1
				// 2. 给元素添加类样式的时候，我们通过判断 正在编辑的元素的id 和 当前元素的id是否相等，如果相等，就加类样式，否则不加
				// 3. 在双击li标签的时候，我们只需要，把currentEdit改成当前点击的元素的id

				this.currentEdit = id;
			},

			finishEditTodo(e) {

				let todoEdit = this.todoList.find(v => v.id == this.currentEdit)
				axios({
					url: `http://localhost:3000/todos/${todoEdit.id}`,
					method: 'patch',
					data: {
						todo: todoEdit.todo
					}
				}).then(res => {
					if (res.status == 200) {
						console.log('成功')
					}
				})
				this.currentEdit = -1;

			},

			clearCompleted() {
				// 当用户点击clear completed按钮的时候
				// 需要将数组中所有已完成的项，删除

				let completedTodos = this.todoList.filter(v => v.isCompleted)


				let count=0
				completedTodos.forEach(v => {
					axios({
						url: `http://localhost:3000/todos/${v.id}`,
						method: 'delete',
					}).then(res => {
						if (res.status == 200) {
							count++
							if(count==completedTodos.length){
								this.getTodos()
							}
						}
					})
				})
			},

			changeFilter(filter) {
				this.todoFilter = filter;
			}

		},
		computed: {
			leftCount() {
				// leftCount是一个计算属性，这个计算属性用来获取todoList数组中所有未完成的todo项
				// 我们可以通过filter进行过滤，找到数组中所有isCompleted属性为false的元素

				// let leftList = this.todoList.filter(v => !v.isCompleted)
				let leftList = this.todoList.filter(v => {
					return v.isCompleted == false
				})

				// 返回所有未完成的数量
				return leftList.length
			},
			isShowClearBtn() {
				// 如果当前数据中的数组中，有已经完成的项，则返回true
				// 如果当前数组中没有已经完成的项，则返回false

				// 数组中如果有任意isCompleted属性是true的元素，则返回true
				return this.todoList.some(v => v.isCompleted)
			},
			todoToShow() {
				return this.todoList.filter(v => {
					if (this.todoFilter == "all") {
						return true
					} else if (this.todoFilter == "active") {
						return v.isCompleted == false
					} else if (this.todoFilter == "completed") {
						return v.isCompleted == true
					}
				})
			}
		},
		created() {
			this.getTodos()
		}
	});

	// 当vue中的数据发生变化的时候。在Vue内部会重新计算页面中所有的指令以及表达式
	// 如果计算之后，结果和之前相同，就不进行页面更新了
	// 如果计算之后，发现有内容变化，那就对页面进行更新操作！

	window.vm = vm;
})(window);
