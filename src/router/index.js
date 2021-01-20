import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Layout from "@/views/Layout.vue";
import Users from "@/views/Users.vue";
import Roles from "@/views/Roles.vue";
import { getToken } from "@/utils/storage";
// import Rights from "@/views/rights/index.vue";
import Rights from "@/views/rights";
// import Orders from "@/views/orders/index.vue";
import Orders from "@/views/orders";

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
      },
      {
        path: "/rights",
        component: Rights
      },
      {
        path: "/orders",
        component: Orders
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// 全局守卫（拦截页面跳转）
// to:即将跳转的页面
// from:从哪里跳转的页面
// next:函数
//      next(); 跳转to页面
//      next('/xxx') 跳转到xxx页面
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    //如果去登录页面，直接放行
    next();
  } else {
    const token = getToken();
    if (token !== null) {
      //直接放行
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
