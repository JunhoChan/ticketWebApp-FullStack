<template>



  <el-container>
    <el-aside width="220px">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header height="64px">
        <app-header></app-header>
      </el-header>
      <el-main>

        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>



</template>

<script>
  import AsideComponent from '../frame/Aside.vue';
  import HeaderComponent from '../frame/Header.vue';
    export default {
      components:{
      "app-aside":AsideComponent,
      "app-header":HeaderComponent
      }
    }
</script>

<style scoped lang="less">
  .el-container{
    height: 100%;
  }

  .el-header{
    background-color: #fff;
    color: #333;
    text-align: left;
    border-bottom: 1px solid RGBA(0, 0, 0, 0.1);
    box-shadow: 2px 0px 4px RGBA(0, 0, 0, 0.4);
  }

  .el-aside {
    /*background: -webkit-gradient(linear, 0 0, 0 100%, from(#2744C1), to(#6852DB));*/
    background: rgba(52,73,94,1);;
    text-align: left;
  }

  .el-main {
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
