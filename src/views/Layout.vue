<template>
  <el-container direction="vertical">
    <dg-header></dg-header>
    <!-- <el-header>
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
        <span>xxx管理系统</span>
      </div>
      <el-button type="primary" size="small" @click="logoutClick"
        >退出登录</el-button
      >
    </el-header> -->
    <el-container>
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="sep" @click="collapseClick">|||</div>
        <el-menu
          :collapse="collapse"
          :collapse-transition="false"
          :default-active="activePath"
          background-color="#353744"
          text-color="#fff"
        >
          <!-- 遍历一级菜单 -->
          <el-submenu
            :index="menu.id + ''"
            v-for="menu of menus"
            :key="menu.id"
          >
            <template slot="title">
              <i :class="icons[menu.id]"></i>
              <span>{{ menu.authName }}</span>
            </template>
            <!-- 遍历二级菜单 -->
            <el-menu-item
              :index="sub.id + ''"
              v-for="sub of menu.children"
              :key="sub.id"
              @click="subMenuClcik(sub.id, sub.path)"
              >{{ sub.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 定义子路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import DGHeader from "@/components/DGHeader.vue";

import { clearToken, getActivePath, setActivePath } from "@/utils/storage";
import { getMenu } from "@/api/rightAPI";
export default {
  data() {
    return {
      //左侧菜单
      menus: [],
      //是否折叠左侧菜单
      collapse: false,
      //当前菜单激活路径
      activePath: "",
      //左侧图标映射
      icons: {
        "125": "el-icon-setting",
        "103": "el-icon-lock",
        "101": "el-icon-location"
      }
    };
  },

  components: {
    "dg-header": DGHeader
  },

  methods: {
    //点击二级菜单的事件
    subMenuClcik(id, path) {
      this.activePath = id + "";
      setActivePath(id + "");
      if (this.$route.path !== "/" + path) this.$router.push(path);
    },
    //左侧菜单栏顶部点击事件
    collapseClick() {
      this.collapse = !this.collapse;
    },
    //退出登录点击事件
    logoutClick() {
      //1.清除token
      clearToken();
      //2.跳转到登录页
      this.$router.push("/login");
    },
    //获取左侧菜单数据
    requestMenu() {
      getMenu().then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("请求左侧菜单有误");
        this.menus = res.data;
      });
    }
  },
  created() {
    this.activePath = getActivePath();
    console.log(getActivePath(), this.activePath);
    //页面加载请求左侧菜单
    this.requestMenu();
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
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #353744;
  .sep {
    text-align: center;
    color: white;
    background-color: #4a5064;
    letter-spacing: 3px;
    font-size: 12px;
    padding: 3px 0px;
    cursor: pointer;
  }
}
.el-main {
  background-color: #ebedf1;
}
.el-menu {
  border-right: 0px;
}
</style>
