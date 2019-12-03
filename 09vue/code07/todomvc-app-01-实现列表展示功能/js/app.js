(function (window) {

	const vm = new Vue({
		el: "#app",
		data: {
			todoList: [
				{id: 1, todo: "打开手机，自拍一张"},
				{id: 2, todo: "打开电脑，再拍一张"},
				{id: 3, todo: "打开别人的手机，再拍一张"},
				{id: 3, todo: "打开PS，修的美美哒"},
			]
		}
	});

})(window);
