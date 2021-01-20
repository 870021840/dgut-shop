import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/globle.css";

Vue.config.productionTip = false;

Vue.filter("dateFormate", function(val) {
  var date = new Date(val * 1000);
  var YY = date.getFullYear() + "-";
  var MM =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hh =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var mm =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return YY + MM + DD + " " + hh + mm + ss;
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
