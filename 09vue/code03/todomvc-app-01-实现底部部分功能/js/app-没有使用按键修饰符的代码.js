(function(window) {
	const vm = new Vue({
		el: "#app",
		data: {
			todoList: [
				{ id: 1, todo: "打开手机，自拍一张", isCompleted: false },
				{ id: 2, todo: "打开电脑，再拍一张", isCompleted: false },
				{ id: 3, todo: "打开别人的手机，再拍一张", isCompleted: true },
				{ id: 4, todo: "打开PS，修的美美哒", isCompleted: false }
			],
			newTodo: "",
			currentEdit: -1
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
				// console.log(e.keyCode);
				// 在用户在文本框中按下回车键之后，我们需要将用户当前输入的内容，添加到数组中
				if (e.keyCode == 13) {
					// alert("添加功能被触发了！")

					// 1. 获取用户输入的内容  (只要涉及到获取表单内容，就要使用双向绑定)
					// alert(this.newTodo)
					// let newTodo = {
					// 	id: this.todoList[this.todoList.length - 1].id + 1,
					// 	todo: this.newTodo,
					// 	isCompleted: false
					// };

					let newTodo = {
						id: this.todoList.length ? this.todoList[this.todoList.length - 1].id + 1 : 1,
						todo: this.newTodo,
						isCompleted: false
					};

					// console.log(newTodo);

					// 2. 把用户输入的内容添加到数组中
					this.todoList.push(newTodo);

					// 3. 将文本框清空
					this.newTodo = "";
				}
			},

			editTodo(id){
				// console.log("edit")
				// 在双击当前li元素的时候，我们需要让当前的todo项处于编辑状态
				// 只要给当前li元素添加一个 editing类样式 就能够实现编辑状态的显示了

				// 思路：
				// 1. 设置一个数据，用来保存当前正在编辑的元素的id， 默认为-1
				// 2. 给元素添加类样式的时候，我们通过判断 正在编辑的元素的id 和 当前元素的id是否相等，如果相等，就加类样式，否则不加
				// 3. 在双击li标签的时候，我们只需要，把currentEdit改成当前点击的元素的id
				
				this.currentEdit = id;
			},

			finishEditTodo(e){
				// 当用户敲下回车键的时候，我们需要将当前的元素的editing类样式移除
				// 只要让currentEdit等于-1 就可以了
				if(e.keyCode == 13){
					this.currentEdit = -1;
				}
			}
		}
	});

	window.vm = vm;
})(window);
