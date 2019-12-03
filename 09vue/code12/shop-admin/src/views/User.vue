<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row :gutter="20">
            <el-col :span="6">
                <el-input
                    placeholder="请输入内容"
                    v-model="keyword"
                    @keyup.enter.native="search"
                    class="input-with-select"
                >
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="success" plain @click="openAddUserDialog">添加用户</el-button>
            </el-col>
        </el-row>

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

                <!-- 就是把 el-switch这个组件 传入到el-table-column的插槽里面去 -->
                <!-- row 就是当前行的数据 类似于我们之前做v-for的时候的item -->
                <template v-slot="{row}">
                    <el-switch
                        v-model="row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="toggleState(row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="{row}">
                    <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="openEditUserDialog(row.id)"></el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        plain
                        @click="delUser(row.id)"
                    ></el-button>
                    <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- @current-change="onPageChange" 这个是页码发生改变的时候触发的事件 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pagesize"
            :current-page="currentpage"
            @current-change="onPageChange"
        ></el-pagination>

        <!-- 添加用户的模态框 -->
        <!-- title是模态框的标题 -->
        <!-- visible 用来控制显示和隐藏的 -->
        <el-dialog
            title="添加用户"
            :visible.sync="isAddUserDialogShow"
            @close="$refs.addUserForm.resetFields()"
        >
            <el-form
                :model="addUserFormData"
                label-width="100px"
                :rules="addUserRules"
                ref="addUserForm"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserFormData.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserFormData.password" type="password" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserFormData.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="addUserFormData.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAddUserDialogShow=false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改用户信息的模态框 -->
        <el-dialog
            title="修改用户信息"
            :visible.sync="isEditUserDialogShow"
            @close="$refs.editUserForm.resetFields()"
        >
            <el-form
                :model="editUserFormData"
                label-width="100px"
                :rules="editUserRules"
                ref="editUserForm"
            >
                <el-form-item label="用户名" prop="username">
                    <el-tag type="info" v-text="editUserFormData.username"></el-tag>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editUserFormData.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="editUserFormData.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="iseditUserDialogShow=false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { constants } from "crypto";
export default {
    data() {
        return {
            userList: [],
            total: 0,
            pagesize: 3,
            currentpage: 1,
            keyword: "",
            // 控制添加用户模态框的展示和隐藏的数据
            isAddUserDialogShow: false,
            // 添加用户的表单数据
            addUserFormData: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            // 添加用户的表单校验规则
            addUserRules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 5,
                        max: 12,
                        message: "用户名长度在 5 到 12 个字符",
                        trigger: "change"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 15,
                        message: "密码长度在 6 到 15 个字符",
                        trigger: "change"
                    }
                ],
                email: [
                    {
                        pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                        message: "邮箱格式不正确",
                        trigger: "change"
                    }
                ],
                mobile: [
                    {
                        pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                        message: "手机号码格式不正确",
                        trigger: "change"
                    }
                ]
            },
            // 修改用户的表单数据
            editUserFormData: {
                id: 0,
                username: "",
                email: "",
                mobile: ""
            },
            isEditUserDialogShow: false,
            editUserRules: {
                email: [
                    {
                        pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                        message: "邮箱格式不正确",
                        trigger: "change"
                    }
                ],
                mobile: [
                    {
                        pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                        message: "手机号码格式不正确",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        getUserList() {
            this.$http({
                url: "users",
                params: {
                    query: this.keyword,
                    pagenum: this.currentpage,
                    pagesize: this.pagesize
                }
            }).then(res => {
                // console.log(res);
                // this.userList = res.data.data.users;

                let {
                    data: { data, meta }
                } = res;
                this.userList = data.users;
                this.total = data.total;
            });
        },
        onPageChange(page) {
            // console.log("页码发生改变了", page)
            this.currentpage = page;
            // 重新去后端请求数据
            this.getUserList();
        },
        search() {
            // 只需要调用getUserList方法，重新请求数据即可
            this.getUserList();
        },
        async toggleState(user) {
            console.log(user);
            // 在这里应该给后台发送数据请求，将当前用户的状态进行修改

            let res = await this.$http({
                url: `users/${user.id}/state/${user.mg_state}`,
                method: "put"
            });

            if (res.data.meta.status == 200) {
                this.$message({
                    type: "success",
                    message: res.data.meta.msg,
                    duration: 1000
                });
            } else {
                this.$message({
                    type: "error",
                    message: res.data.meta.msg,
                    duration: 1000
                });
                // 后台请求出错之后，状态修改未成功
                // 所以页面上的switch也不应该被修改，我们把他修改为原来的状态
                user.mg_state = !user.mg_state;
            }
        },
        async delUser(id) {
            try {
                await this.$confirm(
                    "此操作将永久删除该用户, 是否继续?",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                );
                // 向后台发送请求，删除当前行的用户
                let res = await this.$http({
                    url: `users/${id}`,
                    method: "delete"
                });
                // 重新渲染当前的列表数据
                // console.log(res);
                if (res.data.meta.status == 200) {
                    this.$message({
                        type: "success",
                        message: res.data.meta.msg,
                        duration: 1000
                    });

                    this.currentpage = 1;
                    this.getUserList();
                }
            } catch (err) {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            }
        },
        openAddUserDialog() {
            // 打开添加用户的模态框
            this.isAddUserDialogShow = true;
        },
        async addUser() {
            // 1. 先进行表单校验
            try {
                await this.$refs.addUserForm.validate();
                console.log("校验成功");
                // 2. 表单校验成功之后发送ajax请求
                let res = await this.$http({
                    url: "users",
                    method: "post",
                    data: this.addUserFormData
                });
                console.log(res);
                if (res.data.meta.status == 201) {
                    this.$message({
                        message: res.data.meta.msg,
                        type: "success",
                        duration: 1000
                    });
                    this.getUserList();
                    this.isAddUserDialogShow = false;
                } else {
                    this.$message({
                        message: res.data.meta.msg,
                        type: "error",
                        duration: 1000
                    });
                }
            } catch (err) {
                // console.log("校验失败")
            }
        },
        async openEditUserDialog(id){
            // 1. 打开模态框
            this.isEditUserDialogShow = true;
            // 2. 使用id去后台获取用户数据，展示到模态框中
            let res = await this.$http({
                url: `users/${id}`
            })

            // console.log(res);
            this.editUserFormData = res.data.data;
        },
        async editUser(){
            try{
                await this.$refs.editUserForm.validate()
                // 向后台提交请求，修改用户数据

                let res = await this.$http({
                    url: `users/${this.editUserFormData.id}`,
                    method: "put",
                    data: {
                        mobile: this.editUserFormData.mobile,
                        email: this.editUserFormData.email
                    }
                })

                // console.log(res);
                if(res.data.meta.status == 200){
                    // 提示用户更新成功
                    this.$message({
                        type: "success",
                        message: res.data.meta.msg,
                        duration: 1000
                    })
                    // 刷新列表
                    this.getUserList();
                    // 关闭模态框
                    this.isEditUserDialogShow = false;
                }else{
                    this.$message({
                        type: "error",
                        message: res.data.meta.msg,
                        duration: 1000
                    })
                }
            }catch(err){

            }
        }
    }
};
</script>

<style>
.el-breadcrumb.breadcrumb {
    background-color: #d4dae0;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    padding-left: 10px;
}
</style>