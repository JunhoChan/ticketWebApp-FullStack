<template>
  <div class="header">
    <div class="header-title">
      影院管理后台
    </div>

    <!-- <el-tooltip class="item" content="待发货订单数(点击更新)" placement="top-start">
      <el-badge :value="total" :max="99" class="item">
        <el-button type="text" @click="getOrderList" icon="el-icon-bell" class="item_1"></el-button>
      </el-badge>
    </el-tooltip> -->

    <el-dropdown @command="handleCommand">

      <!-- 菜单标题 -->
      <span class="el-dropdown-link top-menu">
        <!-- <span>你好, 若数据无法显示请注销后重新登录。</span> -->
        <i class="el-icon-arrow-down el-icon--right"></i>
        <!--<img src="../../../img/avator.jpg" class="avator">-->
      </span>

      <!-- 菜单列表 -->
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: "",
        storeLogo: "",
        total: 0,
        toggleFlag: false,
        query: {
          pageNum: 1,
          pageSize: 1,
          orderStatus: "2"
        }
      };
    },

    methods: {
      logout() {
        // sessionStorage.removeItem("isLogin");
        console.log("请求注销");
        this.$http.get(this.$api.logout).then(rsp => {  
          this.$message.error("注销成功!!!");
        });
        this.$router.push("/login");
      },
      // // 下拉菜单控制器
      handleCommand(command) {
        switch (command) {
          case "logout":
            this.logout();
            break;
        }
      }
    },
    created() {
    }
  };
</script>

<style scoped lang="less">
  .header {
    text-align: right;
    height: 64px;
    line-height: 64px;
    padding-right: 40px;
    .header-title {
      float: left;
      font-size: 24px;
      font-family: MicrosoftYaHei;
      color: rgba(96, 98, 102, 1);
    }
  }
  .top-menu {
    position: relative;
  }
  .avator {
    width: 40px;
    height: 40px !important;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    height: 50%;
    margin-left: 10px;
    transform: translate(0, -50%);
  }
  .item {
    line-height: 36px !important;
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
