<template>
    <el-container>
        <el-header>
            <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="6">
                    <img src="../../assets/logo.png" alt />
                </el-col>
                <el-col>
                    <h1>品优购后台管理系统</h1>
                </el-col>
                <el-col :span="6" class="header-right">
                    <div>
                        欢迎39期星耀会员
                        <a href="#" @click.prevent="logout">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- 
                    default-active="4"   设置默认高亮的菜单项  赋值的内容为菜单项的index值
                    class="el-menu-vertical-demo"  可以为菜单加上自己的类名
                    @open="handleOpen"    菜单的打开事件
                    @close="handleClose"  菜单的折叠事件
                    background-color="#545c64"  设置菜单的背景颜色
                    text-color="#fff"     设置菜单的文本颜色
                    active-text-color="#ffd04b"   高亮项的文本颜色
                    
                    :router="true"   router属性用来设置是否开启vue-router的模式，如果开启，点击菜单项的时候，会把当前菜单项的index值作为path进行路由跳转
                -->
                <el-menu
                    :default-active="$route.path"
                    设置默认高亮的菜单项
                    赋值的内容为菜单项的index值
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :unique-opened="true"
                    :router="true"
                >
                    <!-- el-submenu的属性  -->
                    <!-- index 这个是当前菜单项的id 唯一标识 -->

                    <!-- el-menu-item 这个组件就是每一个没有子菜单项的菜单 -->
                    <el-submenu v-for="menu1 in menusList" :key="menu1.id" :index="menu1.id + ''">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{menu1.authName}}</span>
                        </template>
                        <el-menu-item v-for="menu2 in menu1.children" :key="menu2.id" :index="'/' + menu2.path">
                            <i class="el-icon-menu"></i>
                            <span>{{menu2.authName}}</span>
                        </el-menu-item>
                    </el-submenu>

                    
                </el-menu>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            menusList: []
        }
    },
    async created(){
        let res = await this.$http({
            url: "menus"
        })

        // console.log(res);
        this.menusList = res.data.data;
    },
    methods: {
        logout(){
            // 1. 清空token
            localStorage.removeItem('token');
            // 2. 跳转到登录页
            this.$router.push("/login");
        }
    }
};
</script>

<style>
.el-container {
    height: 100%;
}
.el-container .el-header {
    background-color: #b3c1cd;
    padding: 0;
}

.el-container .el-header img {
    width: 200px;
}
.el-container .el-header h1 {
    font-size: 28px;
    color: #fff;
    font-weight: bolder;
    padding: 0;
    margin: 0;
    text-align: center;
}

.header-right {
    font-weight: bolder;
    text-align: right;
    padding-right: 20px;
}

.el-container .el-header div a {
    color: orange;
}

.el-menu-vertical-demo.el-menu {
    height: 100%;
}
</style>
