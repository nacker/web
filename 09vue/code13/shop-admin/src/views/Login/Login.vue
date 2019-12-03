<template>
    <!-- el-row 这个组件就相当于是一个div，这个组件是用来做布局的 -->
    <!-- type 是布局模式，可以是flex -->
    <!-- justify 是用来设置水平对齐的方式的 -->
    <el-row type="flex" class="row-bg" justify="center" align="middle">
        <!-- el-col 布局组件 列组件 -->
        <!-- span 属性是用来设置当前列所占的格数的 -->
        <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
            <el-form
                ref="loginForm"
                :rules="formRules"
                :model="form"
                class="login-form"
                label-position="top"
                label-width="80px"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" show-password></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
// 要实现表单校验：
// 1. 先给数据中添加一个校验规则对象
// 2. rules: {表单绑定的数据的名称: [{required: true, message: "提示信息", trigger: "触发校验的时机blur change"}]}
// 3. 需要把这个校验规则对象绑定到el-form组件上 :rules="校验规则则对象"
// 4. 需要给每一项被校验的el-form-item组件添加 prop属性 属性值就是 绑定的数据的名称

export default {
    data() {
        return {
            form: {
                username: "admin",
                password: "123456"
            },
            formRules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 5,
                        max: 12,
                        message: "用户名必须是5个到12个字符",
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
                        message: "密码必须是6个到15个字符",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        async submitForm(formName) {
            let valid = await this.$refs[formName].validate();

            if (valid) {
                try {
                    let res = await this.$http({
                        url: "login",
                        method: "post",
                        data: this.form
                    });

                    if (res.data.meta.status == 200) {
                        localStorage.setItem("token", res.data.data.token);
                        this.$router.push("/home");
                    }else{
                        this.$message({
                            message: res.data.meta.msg,
                            type: "error",
                            duration: 1000
                        })
                    }
                } catch (err) {
                  // catch 就相当于之前 失败的回调了
                  console.log("请求发送失败", err)
                }

                // .then(({data: {data, meta}}) => {
                //   if(meta.status == 200){
                //     localStorage.setItem("token", data.token);
                //     this.$router.push("/home")
                //   }
                // })
            } else {
                return false;
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style>
.row-bg {
    height: 100%;
    background-color: #2d434c;
}
.login-form {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 20px;
    min-width: 400px;
}
</style>
