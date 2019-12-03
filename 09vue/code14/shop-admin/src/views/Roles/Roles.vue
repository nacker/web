<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table ref="roleTable" :data="roleList" stripe style="width: 100%">
            <!-- type="expand" 给列加上这个属性之后，可以实现 展开行的效果 -->
            <el-table-column type="expand">
                <template v-slot="{row}">
                    <!-- el-row level1  这是一级菜单的行元素 -->
                    <el-row
                        class="level1"
                        type="flex"
                        v-for="level1 in row.children"
                        :key="level1.id"
                    >
                        <el-col :span="6">
                            <el-tag
                                closable
                                @close="deleteRight(row, level1.id)"
                            >{{level1.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col>
                            <!-- el-row level2  这是二级菜单的行元素 -->
                            <el-row
                                class="level2"
                                type="flex"
                                v-for="level2 in level1.children"
                                :key="level2.id"
                            >
                                <el-col :span="6">
                                    <el-tag
                                        closable
                                        type="success"
                                        @close="deleteRight(row, level2.id)"
                                    >{{level2.authName}}</el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col>
                                    <el-tag
                                        type="warning"
                                        class="level3"
                                        closable
                                        v-for="level3 in level2.children"
                                        :key="level3.id"
                                        @close="deleteRight(row, level3.id)"
                                    >{{level3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <!-- el-table-column 只需要加上 type="index" 就可以自动生成序号列 -->
            <!-- :index="getIndex"  通过给index属性绑定函数，可以完成自定义序列号 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
            <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="{row}">
                    <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
                    <el-button
                        type="success"
                        icon="el-icon-check"
                        size="mini"
                        plain
                        @click="showAssainRightsDialog(row)"
                    >分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="角色授权" :visible.sync="isAssainRightDialogShow">
            <!-- data 是用来绑定数据的
            show-checkbox是用来设置是否要展示 checkbox
            node-key 指的是当前节点的唯一表示
            default-expanded-keys 这是一个数组，表示默认让哪些节点展开
            default-checked-keys 这是一个数据，表示默认选中哪些节点
            props:  children是用来指定子级树的数据属性名，label以及节点要展示到文字的属性名-->
            <!-- default-expand-all  是否默认展开所有节点-->
            <el-tree
                :data="rightsList"
                show-checkbox
                node-key="id"
                :default-checked-keys="checkedRights"
                :props="defaultProps"
                :default-expand-all="true"
                ref="rightsTree"
            ></el-tree>

            <div slot="footer" class="dialog-footer">
                <el-button @click="isAssainRightDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="updateRoleRights">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roleList: [],
            isAssainRightDialogShow: false,
            rightsList: [],

            // 这个是用来设置 tree组件的 数据展示 子节点以及 展示的文字的
            defaultProps: {
                // 子级元素的属性名
                children: "children",
                // 当前节点展示的文字的属性名
                label: "authName"
            },
            checkedRights: [],
            // 用来存储要编辑的role的id
            currentEditRoleId: -1
        };
    },
    methods: {
        async deleteRight(row, id) {
            // console.log('删除单个权限')
            // 调用接口，删除当前角色指定的权限信息

            // 接口信息
            //  roles/:id/rights/:rightID
            // method: delete

            let res = await this.$http({
                url: `roles/${row.id}/rights/${id}`,
                method: "delete"
            });

            // console.log(res);
            if (res.data.meta.status == 200) {
                this.$message({
                    type: "success",
                    message: res.data.meta.msg,
                    duration: 1000
                });

                // this.roleList
                this.getRoleList(() => {
                    this.$nextTick(() => {
                        //让表格对应的项展开即可
                        this.$refs.roleTable.toggleRowExpansion(
                            this.roleList.find(v => v.id == row.id),
                            true
                        );
                    });
                });
            }
        },
        async updateRoleRights() {
            // 1. 获取tree组件中，所有被勾选的节点的id
            let ids = [
                ...this.$refs.rightsTree.getCheckedKeys(),
                ...this.$refs.rightsTree.getHalfCheckedKeys()
            ].join(",");
            // console.log(ids);
            // 2. 将id拼接成字符串之后，发送ajax请求，修改角色权限
            let res = await this.$http({
                url: `roles/${this.currentEditRoleId}/rights`,
                method: "post",
                data: {
                    rids: ids
                }
            });

            // 3. 提示用户更新成功
            this.$message({
                type: "success",
                message: res.data.meta.msg,
                duration: 1000
            });

            // 4. 更新成功之后，重新获取列表数据
            this.getRoleList();

            // 5. 关掉模态框
            this.isAssainRightDialogShow = false;
            // console.log(res);
            // console.log(this.currentEditRoleId);
        },
        async showAssainRightsDialog(row) {
            // 0. 把 当前正在编辑的id改成当前role的id
            this.currentEditRoleId = row.id;
            // console.log("ok");
            // 1. 打开模态框
            this.isAssainRightDialogShow = true;
            // 2. 获取所有的权限信息（树结构）
            let res = await this.$http({
                url: "rights/tree"
            });

            // 3. 把权限列表绑定给了tree组件
            this.rightsList = res.data.data;

            // 4. 需要让tree组件中默认选中当前角色拥有的权限信息
            // checkedRights ： 我们需要把当前角色row中所有的权限的id，组合成一个数组，赋值给checkedRights
            // console.log(row);
            // 获取一级权限的id，组合成数组
            // let level1Ids = [];
            // let level2Ids = [];
            let level3Ids = [];
            // 获取二级权限的id，组合成数组
            row.children.forEach(level1 => {
                // level1Ids.push(level1.id);
                level1.children.forEach(level2 => {
                    // level2Ids.push(level2.id);
                    level2.children.forEach(level3 => {
                        level3Ids.push(level3.id);
                    });
                });
            });

            this.checkedRights = [...level3Ids];
        },
        async getRoleList(callback) {
            let res = await this.$http({
                url: "roles"
            });

            // console.log(res);
            this.roleList = res.data.data;
            callback && callback();
        }
    },
    created() {
        this.getRoleList();
    }
};
</script>

<style scoped>
.level1 {
    border-bottom: 1px dashed #ccc;
    padding: 10px 0;
}

.level1:last-child {
    border-bottom: none;
}

.level2 {
    margin-bottom: 15px;
}

.level3 {
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>