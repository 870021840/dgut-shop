<template>
  <div>
    <dg-breadcrumb></dg-breadcrumb>

    <el-card>
      <el-table :data="rights" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >二级</el-tag
            >
            <el-tag type="danger" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import DGBreadcrumb from "@/components/DGBreadcrumb.vue";
import { getRightList } from "@/api/rightAPI";
export default {
  data() {
    return {
      //所有的权限
      rights: []
    };
  },

  components: {
    "dg-breadcrumb": DGBreadcrumb
  },

  methods: {
    requestRight() {
      getRightList().then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("请求权限列表错误");
        console.log(res);
        this.rights = res.data;
      });
    }
  },
  created() {
    this.requestRight();
  }
};
</script>

<style scoped></style>
