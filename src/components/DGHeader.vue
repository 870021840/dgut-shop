<template>
  <el-header>
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
      <span>xxx管理系统</span>
    </div>
    <el-button type="primary" size="small" @click="logoutClick"
      >退出登录</el-button
    >
  </el-header>
</template>

<script>
import { clearToken } from "@/utils/storage";
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    //退出登录点击事件
    logoutClick() {
      //1.清除token
      clearToken();
      //2.跳转到登录页
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
.el-header {
  background-color: #373d42;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    img {
      width: 20px;
      height: 20px;
    }
    span {
      color: white;
      font-size: 18px;
    }
  }
}
</style>
