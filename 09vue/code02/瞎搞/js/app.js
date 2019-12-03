(function(window) {
	function getData() {
		return JSON.parse(localStorage.getItem('todolist')|| '[]')
	}
	const vm = new Vue({
		el: "#app",
		data: {
			todoList: getData(),
			newTodo: "",
			currentEdit: -1,
			todoFilter:'all'
		},
		methods: {
			delTodo(id) {
				// 获取到点击事件传递过来的id之后
				// 我们需要根据id找到数组里面对应的的元素，并且删除

				let newTodoList = this.todoList.filter(item => {
					return item.id != id;
				});

				this.todoList = newTodoList;
			},

			addTodo(e) {
				let newTodo = {
					id: this.todoList.length
						? this.todoList[this.todoList.length - 1].id + 1
						: 1,
					todo: this.newTodo,
					isCompleted: false
				};

				// console.log(newTodo);

				// 2. 把用户输入的内容添加到数组中
				this.todoList.push(newTodo);

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
				this.currentEdit = -1;
			},

			comTodo() {
				this.todoList=this.todoList.filter(v=>v.isCompleted==false)
			},
			
			changeTodo(sb) {
				this.todoFilter=sb
			}
		},

		computed:{
			sheng() {
				return this.todoList.filter(v=>v.isCompleted==false).length
			},
			isShow() {
				return this.todoList.some(v=>v.isCompleted!==false)
			},
			qiehuan() {
				return this.todoList.filter(v=>{
					if(this.todoFilter == 'all') {
						return true
					} else if (this.todoFilter == 'active') {
						return v.isCompleted==false
					} else if (this.todoFilter == 'completed') {
						return v.isCompleted==true
					}
				})
			}
		},

		watch:{
			todoList:{
				handler() {
					localStorage.setItem('todolist',JSON.stringify(this.todoList))
				},
				deep:true
			}
		}
	});

	window.vm = vm;
})(window);
