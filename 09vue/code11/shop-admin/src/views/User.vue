<template>
    <div>
        <!-- data  用来绑定这个表格要展示的数据对象 -->
        <!-- stripe 设置隔行变色 -->
        <el-table :data="userList" stripe style="width: 100%">
            <!-- prop 设置当前列中要展示的数据的属性名 -->
            <!-- label 当前列的表头文字 -->
            <el-table-column prop="username" label="姓名" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>

            <!-- 如果当前列中不会把数据直接展示出来，那么就没有必要为当前列设置prop属性 -->
            <el-table-column label="用户状态">
                <!-- 在这里，无法直接获取到每一行的数据，这个数据在el-table表格组件中 -->
                <!-- 如果要获取每一行的数据，那么我们就需要通过作用于插槽的方式，把数据接收到 -->
               
                <template v-slot="{row}">   
                  <el-switch v-model="row.type" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
                
            </el-table-column>
            <el-table-column label="操作">
              <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
              <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button></el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            userList: []
        };
    },
    created() {
        axios({
            url: "http://localhost:8888/api/private/v1/users",
            params: {
                pagenum: 1,
                pagesize: 5
            },
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            // console.log(res);
            // this.userList = res.data.data.users;

            let {
                data: { data, meta }
            } = res;
            this.userList = data.users;
        });
    }
};
</script>