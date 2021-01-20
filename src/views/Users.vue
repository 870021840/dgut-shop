<template>
  <div>
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--  搜索栏 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input v-model="query" placeholder="请输入搜索内容" size="normal">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button></el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" size="default" @click="requestUsers"
            >查询用户</el-button
          ></el-col
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
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditFormDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-share"
            ></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogEditFormVisible">
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="editFormRules"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="editForm.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserClick('editForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, getUserById, editUser } from "@/api/userAPI";

export default {
  data() {
    var validateMoblie = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入手机号"));
      } else {
        let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入合法的手机号"));
        }
        callback();
      }
    };
    return {
      //列表用户
      users: [],
      //搜索内容
      query: "",
      //当前页码
      pagenum: 1,
      //每页大小
      pagesize: 2,
      //总数
      total: 0,
      //是否弹出编辑框，默认不显示
      dialogEditFormVisible: false,
      //编辑表单
      editForm: {},
      //编辑表单的规则
      editFormRules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请输入合法的邮箱",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            validator: validateMoblie,
            required: true,
            message: "请输入合法的手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },

  components: {},

  methods: {
    //编辑用户提交
    editUserClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验成功才发生编辑请求
          editUser(
            this.editForm.id,
            this.editForm.email,
            this.editForm.mobile
          ).then(res => {
            if (res.meta.status !== 200)
              return this.$message.error("编辑用户失败");
            this.$message.success("编辑用户成功");
            //关闭dialog
            this.dialogEditFormVisible = false;
            //获取用户的最新列表信息
            this.requestUsers();
          });
        } else {
          return false;
        }
      });
    },
    //显示编辑表单按钮点击
    showEditFormDialog(user) {
      getUserById(user.id).then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("请求用户详情有误");
        this.editForm = res.data;
        this.dialogEditFormVisible = true;
      });
    },
    //每页大小发生变化的时候调用
    handleSizeChange(val) {
      this.pagesize = val;
      //请求用户数据
      this.requestUsers();
    },
    //当前页发生变化的时候调用
    handleCurrentChange(val) {
      console.log(val);
      this.pagenum = val;
      //请求用户数据
      this.requestUsers();
    },
    requestUsers() {
      //请求用户数据
      getUsers(this.query, this.pagenum, this.pagesize).then(res => {
        console.log(res);
        if (res.meta.status !== 200)
          return this.$message("请求用户数据列表错误");
        this.total = res.data.total;
        this.users = res.data.users;
      });
    }
  },
  created() {
    //请求用户数据
    this.requestUsers();
  }
};
</script>

<style scoped></style>
