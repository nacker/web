<template>
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" :checked="$store.getters.isAllCompleted" @change="toggleAll"/>
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
            <li
                v-for="item in todosToShow($route.path.slice(1))"
                :key="item.id"
                :class="{completed: item.isCompleted, editing: currentEditId == item.id}"
                @dblclick="editTodo(item.id)"
            >
                <div class="view">
                    <input
                        class="toggle"
                        :checked="item.isCompleted"
                        @change="toggleTodo(item.id)"
                        type="checkbox"
                    />
                    <label>{{item.todo}}</label>
                    <button class="destroy" @click="delTodo(item.id)"></button>
                </div>
                <input class="edit" :value="item.todo" @input="updateTodo(item.id, $event)" @keyup.enter="currentEditId = -1"/>
            </li>
        </ul>
    </section>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex';

export default {
    data() {
        return {
            currentEditId: -1
        };
    },
    methods: {
        ...mapMutations(["delTodo", "toggleTodo", "updateTodo", "toggleAll"]),

        // delTodo(id) {
        //     // console.log(id);
        //     // 触发mutation删除数据
        //     this.$store.commit("delTodo", id);
        // },
        // toggleTodo(id) {
        //     this.$store.commit("toggleTodo", id);
        // },
        editTodo(id) {
            this.currentEditId = id;
        },
        // updateTodo(id, e) {
        //     this.$store.commit("updateTodo", { id, value: e.target.value });
        // },
        // toggleAll(){
        //     this.$store.commit("toggleAll")
        // }
    },
    computed: {
        ...mapGetters(["todosToShow"]),
        ...mapState(["msg"])
    }
};
</script>