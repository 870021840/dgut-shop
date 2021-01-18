// vue.config.js
module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    https: false,
    //配置代理服务器
    // proxy: "http://localhost:9003"
    proxy: {
      [process.env.VUE_APP_BASEURL]: {
        target: process.env.VUE_APP_SERVERURL,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASEURL]: ""
        }
      }
    }
  }
};

// user:    http://localhost:8880/
// order:   http://localhost:8881/
// pay :  http://localhost:8882

//   /user-api/login
// 1.发送 /user-api/login 请求
// 2. 代理服务器匹配到/user-api 转发到 http://localhost:9003/user-api/login
// 3. 配置了pathRewrite，将 /user-api替换为‘’  http://localhost:9003/login
