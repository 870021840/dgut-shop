import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Layout from "@/views/Layout.vue";
import Users from "@/views/Users.vue";
import Roles from "@/views/Roles.vue";

// 使用ElementUI插件
Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/users",
        component: Users
      },
      {
        path: "/roles",
        component: Roles
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
