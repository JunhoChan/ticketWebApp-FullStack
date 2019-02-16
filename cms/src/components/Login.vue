<template>
  <div class="login">
    <div class="loginBox flex flex-ais flex-column pad20" style="padding-left: 60px;padding-right: 60px">
      <div class="login_title">后台登录</div>
      <el-input type="text" v-model="userName" placeholder="请输入用户名" style="width:80%;margin-top: 20px"></el-input>
      <el-input class="mb20" type="password" v-model="userPassword" placeholder="请输入密码"
                style="width: 80%;margin-top: 20px"></el-input>
      <!--<el-checkbox v-model="remember_on">记住账号</el-checkbox>-->
      <el-button type="primary" style="width: 100%;background:#4D6CF3;margin-top: 34px;height: 56px; font-size: 20px"
                 @click="login">登 录
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "admin",
      userPassword: "admin"
    };
  },
  methods: {
    login() {
      if (this.userName && this.userPassword) {
            console.log('跳转!');
           this.$router.replace('/');
        // let params = {};
        // params.username = this.userName; 
        // params.password = this.userPassword;
        // this.$http.post(this.$api.login, params).then(res => {
        //   console.log("登录");
        //   console.log(res);
        //   if (res.data.flag) {
        //      sessionStorage.setItem("isLogin", 1);
        //     localStorage.setItem("token",res.data.data.token);
        //     console.log('返回的token')
        //     console.log(localStorage.getItem('token'));
        //     this.$http.defaults.headers.token=localStorage.getItem('token')
        //     console.log(this.$http.defaults.headers)

        //     // console.log("检查token");
        //     // console.log(window.sessionStorage.getItem("token"));
        //     this.$router.push("/");
        //   } else {
        //     this.$message.error(res.data.msg);
        //   }
        // });
      } else {
        this.$message.error("请输入账号密码");
      }
    }
  },
  created() {}
};
</script>

<style scoped lang="less">
#app {
  margin: 0;
  padding: 0;
}

.login {
  background: url("../img/login_bg1.jpeg");
  width: 100%;
  height: 100%;
  background-position: right;
  background-repeat: no-repeat;
}

.loginBox {
  position: fixed;
  right: 200px;
  top: 26%;
  width: 24%;
  background: #ffffff;
  border-radius: 12px;
}

.login_title {
  color: #676975;
  font-size: 18px;
}

.input {
  width: 100px;
  height: 50px;
}
</style>
