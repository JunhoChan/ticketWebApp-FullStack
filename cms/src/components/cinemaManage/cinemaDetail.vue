<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="breadcrumb-head flex flex-start">影院详情</div>
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item,i) in $route.meta" :key="i">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="4">
        <el-input placeholder="搜索相关电影" prefix-icon="el-icon-search" v-model="query.searchName" @blur="getReadyFilmDataList"></el-input>
      </el-col>
      <el-button type="primary" @click="search" class="ml20">查询</el-button>
      <el-button type="primary" @click="addDialog=true" class="ml20">上映电影</el-button>
      <el-button type="text" class="ml20" disabled>当前影院>  {{cinemaInfo.cName}}</el-button>  
    </el-row>
    <div class="content mt20">

    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部电影" name="1">
          <tableWrapper  :tableData ="tableData" :total ="total" @getDataList="getReadyFilmDataList"  :status ="status" :query = "query" :cinemaInfo="cinemaInfo"/>
        </el-tab-pane>
        <el-tab-pane label="上映电影" name="2">
            <tableWrapper  :tableData ="tableData" :total ="total" :status ="status"
             @getDataList="getHotShowFilmList"  :query = "query" :cinemaInfo="cinemaInfo" />
        </el-tab-pane>
        <el-tab-pane label="历史上映电影" name="3">
             <tableWrapper  :tableData ="tableData" :total ="total" :status ="status"
                    :query = "query"  :cinemaInfo="cinemaInfo"/>
        </el-tab-pane>
        <el-tab-pane label="影院信息" name="4">
            <div class="wrapper-Info flex">
                      <div class="info-title">
                        <span>{{cinemaInfo.cName}}</span>
                        <span class="ml10 orange-txt f30">评分:</span>
                      </div>
                      <div class="info-content flex">
                        <div class="info-cover">
                          <img :src="cinemaInfo.coverImg" alt="影院图片" title="影院" />
                       <!--   <img src="./../../img/avator.jpg" alt="影院图片" title="影院" /> -->
                        </div>  
                        <div class="info-instroduction flex flex-column mr20">
                          <div class="address f26">详细地址: {{cinemaInfo.cProvince}} {{cinemaInfo.cAddress}}</div>
                          <div class="phone f26 mt20">联系电话: {{cinemaInfo.cPhone}}</div>
                          <div class="more f26 mt20">影院当前状态: {{cinemaInfo.cState}}</div>
                        </div>  
                      </div>
            </div>
        </el-tab-pane>
    </el-tabs>


    </div>

  </div>
</template>

<script>
  import tableWrapper from './../tableWrapper/tableWrapper'
export default {
  data() {
    return {
      query: {
        id:-1,
        pageNum: 1,
        pageSize: 5,
        searchName: "",
      },
      status: -1, // 当前电影状态 0 暂未上映 1 上映 2 下映
      Time: [], // 上映时间
      form: {
        name: '',
        instroduction: '',
      },
      activeName: '4', //选项卡名字
      imageUrl: '',
      addDialog: false, // 是否显示dialog
      total: 1, // 总数
      tableData: [],// 获取的表格数据
      cinemaInfo:{}, // 影院数据
      id:-1,
    };
  },
  methods: {
    // 获取待上映电影
    getReadyFilmDataList() {
        let params = this.query;
            params.id = this.$route.params.id;
        this.$http.get(this.$api.getFilmAccess, {params: params}).then( (res) => {
             this.status = 0
             this.total = res.data.total
             this.tableData = res.data.data
        }).catch((err)=> {
            this.$message.error(err)
        })
    },
    // 获取热映电影
    getHotShowFilmList() {
         let params = this.query;
            params.id = this.$route.params.id;
        this.$http.get(this.$api.getHotShowFilm, {params: params}).then( (res) => {
             this.status = 1
             this.total = res.data.total
             this.tableData = res.data.data
        }).catch((err)=> {
            this.$message.error(err)
        })
    },
    // 获取历史电影
    getHistoryFilmList() {
         let params = this.query;
            params.id = this.$route.params.id;
        this.$http.get(this.$api.getHistoryFilm, {params: params}).then( (res) => {
             this.status = 2
             this.total = res.data.total
             this.tableData = res.data.data
        }).catch((err)=> {
            this.$message.error(err)
        })
    },
    // 查看影院详情
    getCinemaDetail() {
        this.$http.get(this.$api.getCinemaAccess+'/'+this.$route.params.id).then( (res)=> {
            this.cinemaInfo = res.data.data
        }).catch( () => {
            this.$message.error('系统出现问题!')
        })
    },
    search () {

    },
    // 添加电影
    addFilm() {
        this.$message.success('成功上映！');
        this.addDialog = false;
    },
    // 选项卡切换
    handleClick(tab, event) {
      let seletedPosition = parseInt(tab.name)
      switch(seletedPosition) {
        case 1:
                this.getReadyFilmDataList()    
                break;
        case 2:
                this.getHotShowFilmList()
                break;
        case 3:
                this.getHistoryFilmList()
                break;        
      }
    },
    // 处理选择
    handleSelectionChange() {},

    // 处理图片上传
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
  },
  created() {
     this.getCinemaDetail()
  },
  components: {
      tableWrapper
  },
};
</script>

<style scoped="">
.avatar-uploader ,.el-upload {
  border: 1px black #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 158px;
  height: 158px;
  line-height: 158px;
  text-align: center;
}
.avatar {
  width: 158px;
  height: 158px;
  display: block;
}

.wrapper-Info {
   height: 570px;
   width: 100%;
   background-image: url('./../../assets/images/bg.jpg');
   position: relative;
}

.info-title {
  width: 80%;
  position: absolute;
  z-index: 20;
  color: #fff;
  font-weight: 700;
  font-size: 40px;
  top: 80px;
  left: 150px;
  padding-bottom: 18px;
  border-bottom: 1px rgba(255,255,255,.6) solid;
}

.info-content {
  width: 80%;
  position: absolute;
  z-index: 20;
  color: #fff;
  font-weight: 700;
  top: 180px;
  left: 150px;
}
 .info-cover {
  width: 40%;
  height: 100%;
 }
 .info-cover img {
  width: 420px;
  height: 286px;
 }
</style>
