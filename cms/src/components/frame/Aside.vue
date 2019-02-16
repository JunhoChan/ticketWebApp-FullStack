<template>
  <div style="overflow:hidden">
    <!-- 头像 -->
    <el-menu style="background:rgba(0,0,0,0)" background-color="transparent" text-color="#eee" active-text-color="#eee"
             unique-opened router :default-openeds="['商品管理']">
      <div class="avator mt20">
        <img src="./../../img/avator.jpg">
        <p>River</p>
      </div>


      <el-menu-item index="/cManage" default-active><img src="./../../img/aside1.png" alt="" class="iconfont">  影院管理
      </el-menu-item>

      <el-menu-item index="/fManage" default-active><img src="./../../img/aside1.png" alt="" class="iconfont">  影片管理
      </el-menu-item>

      <el-menu-item index="/uManager" default-active><img src="./../../img/aside3.png" alt="" class="iconfont">
      用户管理
      </el-menu-item>

      <el-menu-item index="/dManage" default-active><img src="./../../img/aside2.png" alt="" class="iconfont">
      优惠管理
      </el-menu-item>

      <el-menu-item index="/mManage" default-active><img src="./../../img/aside4.png" alt="" class="iconfont">
      推送管理
      </el-menu-item>

      <el-menu-item index="/dAnalysis" default-active><img src="./../../img/aside1.png" alt="" class="iconfont">
      数据统计
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user_name: "",
        storeLogo: "",
        storeName: ""
      };
    },
    methods: {},
    created() {
      this.$router.push("/cManage");
      // this.userName = sessionStorage.getItem("userName");
      // this.storeName = sessionStorage.getItem("storeName");
      // this.storeLogo = sessionStorage.getItem("storeLogo");
    }
  };
</script>

<style scoped lang="less">
  .avator {
    text-align: center;
    & img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    & p {
      text-align: center;
      color: #fff;
    }
  }

  .iconfont {
    width: 18px;
    height: 18px;
    margin-left: 10px;
    margin-right: 6px;
  }

  .sub-to {
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  .el-menu,
  .el-menu-item,
  .el-submenu,
  .el-submenu__title,
  .left_nav {
    width: 220px;
  }

  //侧边栏二级菜单hover背景
  .el-menu-item:hover,
  .el-menu-item:focus {
    background: rgba(0, 0, 0, 0.3) !important;
  }

  //修改左侧导航栏二级菜单点击后的样式
  .el-menu-item.is-active {
    background: rgba(0, 0, 0, 0.3) !important;
  }
</style>
