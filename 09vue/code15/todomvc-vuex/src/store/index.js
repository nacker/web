import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    msg: "hello world",
    todoList: [
      {
        id: 2,
        todo: "买了伞，千万不能把伞淋湿了藏起来",
        isCompleted: false
      },
      {
        id: 3,
        todo: "不买伞了，太贵了",
        isCompleted: false
      }
    ]
  },
  mutations: {
    // 删除数据的方法
    delTodo(state, id) {
      // 根据id删除数组中对应的元素
      state.todoList = state.todoList.filter(v => v.id !== id);
    },
    toggleTodo(state, id) {
      state.todoList.forEach(v => {
        if (v.id === id) {
          v.isCompleted = !v.isCompleted;
        }
      });
    },
    updateTodo(state, { id, value }) {
      let todo = state.todoList.find(v => v.id == id);
      todo.todo = value;
    },
    addTodo(state, todo) {
      let newTodo = {
        id: state.todoList.length
          ? state.todoList[state.todoList.length - 1].id + 1
          : 1,
        todo,
        isCompleted: false
      };

      state.todoList.push(newTodo);
    },
    clrCmp(state) {
      state.todoList = state.todoList.filter(v => !v.isCompleted);
    },
    toggleAll(state) {
      // console.log(store.getters.isAllCompleted);
      let flag = store.getters.isAllCompleted;
      state.todoList.forEach(v => {
        v.isCompleted = !flag;
      });
    }
  },
  getters: {
    leftCount(state) {
      return state.todoList.filter(v => !v.isCompleted).length;
    },
    todosToShow(state) {
      return function(status) {
        switch (status) {
          case "active":
            return state.todoList.filter(v => !v.isCompleted);
          case "completed":
            return state.todoList.filter(v => v.isCompleted);
          default:
            return state.todoList;
        }
      };
    },
    isAllCompleted(state) {
      return state.todoList.every(v => v.isCompleted);
    }
  }
});

export default store;
