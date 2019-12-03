Vue.component("filters", {
  template: `<!-- This footer should hidden by default and shown when there are todos -->
  <footer class="footer" v-show="todoList.length">
    <!-- This should be 0 items left by default -->
    <span class="todo-count"><strong>{{leftCount}}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a href="#/" @click="switchFilter('all')">All</a>
      </li>
      <li>
        <a href="#/active" @click="switchFilter('active')">Active</a>
      </li>
      <li>
        <a href="#/completed" @click="switchFilter('completed')">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" v-show="isShowClearBtn" @click="clearCmpl">Clear completed</button>
  </footer>`,
  props: ["todoList"],
  computed: {
    leftCount(){
      return this.todoList.filter(v => !v.isCompleted).length;
    },
    isShowClearBtn(){
      return this.todoList.some(v => v.isCompleted);
    }
  },
  methods: {
    clearCmpl(){
      this.$emit("clearCmpl")
    },
    switchFilter(filter){
      bus.$emit("sendFilter", filter)
    }
  }
})