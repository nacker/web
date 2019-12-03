<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table
            ref="singleTable"
            :data="rightsList"
            highlight-current-row
            style="width: 100%"
        >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column property="authName" label="权限名称" width="120"></el-table-column>
            <el-table-column property="path" label="路径" width="120"></el-table-column>
            <el-table-column label="层级">
              <template v-slot="{row}">
                <span>{{row.level | levelfilter}}</span>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    filters: {
        levelfilter(value) {
            switch (value) {
                case "0":
                    return "一级";
                case "1":
                    return "二级";
                case "2":
                    return "三级";
            }
        }
    },
    data() {
        return {
            rightsList: []
        };
    },
    async created() {
        let res = await this.$http({
            url: "rights/list"
        });

        // console.log(res);
        this.rightsList = res.data.data;
    }
};
</script>