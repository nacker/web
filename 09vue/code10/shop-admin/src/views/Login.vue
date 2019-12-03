<template>
    <!-- el-row 这个组件就相当于是一个div，这个组件是用来做布局的 -->
    <!-- type 是布局模式，可以是flex -->
    <!-- justify 是用来设置水平对齐的方式的 -->
    <el-row type="flex" class="row-bg" justify="center" align="middle">
        <!-- el-col 布局组件 列组件 -->
        <!-- span 属性是用来设置当前列所占的格数的 -->
        <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
            <el-form ref="loginForm" :rules="formRules" :model="form" class="login-form" label-position="top" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
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

import axios from "axios";

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
    submitForm(formName) {
      // this.$refs['loginForm'] 这个就获取到了表单对象
      // 通过调用这个对象的validate方法，就可以对表单做整体校验
      // validate函数接收的参数是一个函数
      this.$refs[formName].validate(valid => {
        // valid形参，接收到的就是表单的校验结果
        // 如果表单校验成功则是 true  如果不成功则是false
        if (valid) {
          axios({
            url: "http://localhost:8888/api/private/v1/login",
            method: "post",
            data: this.form
            // 这里是嵌套解构
          }).then(({ data: { data, meta } }) => {
            // 如果上面的代码看不懂，你就直接使用下面的这一行 res就可以了
            // }).then((res) => {
            // console.log(data, meta);
            // if(res.data.meta.status == 200){
            //   console.log(res.data.meta.msg)
            // }

            // console.log(data);

            if (meta.status == 200) {
              // console.log(meta.msg);

              // 登录成功之后，服务器端会返回给我们一个token
              // 我们需要将这个token保存到本地
              // 保存到localstorage中就可以

              localStorage.setItem("token", data.token);

              this.$router.push("/home");
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
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
