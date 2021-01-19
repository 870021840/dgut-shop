<template>
  <div>
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--  搜索栏 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入搜索内容" size="normal">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button></el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" size="default">查询用户</el-button></el-col
        >
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="users" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column width="175" label="操作">
          <template>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-share"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getUsers } from "@/api/userAPI";

export default {
  data() {
    return {
      //列表用户
      users: [],
      //搜索内容
      query: "",
      //当前页码
      pagenum: 1,
      //每页大小
      pagesize: 3
    };
  },

  components: {},

  methods: {},
  created() {
    getUsers(this.query, this.pagenum, this.pagesize).then(res => {
      console.log(res);
      this.users = res.data.users;
    });
  }
};
</script>

<style scoped></style>
