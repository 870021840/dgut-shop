<template>
  <div class="login-container">
    <div class="box">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
      </div>

      <el-form :model="loginForm" :rules="loginRules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitLoginForm('ruleForm')"
            >登录</el-button
          >
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from "@/api/userAPI.js";
import { setToken } from "@/utils/storage.js";
export default {
  data() {
    return {
      //表单数据
      loginForm: {
        username: "admin",
        password: "123456"
      },
      //表单验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 9, message: "用户名在 3 到 9 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  components: {},

  methods: {
    //点击提交按钮
    submitLoginForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //发送提交请求
          loginAPI(this.loginForm.username, this.loginForm.password).then(
            res => {
              if (res.meta.status !== 200)
                return this.$message.error("用户名或密码错误");
              //登录成功的逻辑
              //1.保存token
              setToken(res.data.token);
              //2.跳转到后台页面
              this.$router.push("/");
            }
          );
        } else {
          return false;
        }
      });
    },
    //重置表单点击
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  background-color: #2a4b6b;
  height: 100%;
  position: relative;

  .box {
    width: 450px;
    height: 300px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); //挪动自身的一半

    .logo {
      background-color: white;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0px 0px 10px #ddd;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
      }
    }
    .el-form {
      margin: 120px 20px 0;
      .btns {
        float: right;
      }
    }
  }
}
</style>
