<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="breadcrumb-head flex flex-start">影片管理</div>
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item,i) in $route.meta" :key="i">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="4">
        <el-input placeholder="搜索相关电影" prefix-icon="el-icon-search" v-model="query.searchName"></el-input>
      </el-col>
      <el-button type="primary" @click="search" class="ml20">查询</el-button>
      <el-button type="primary" @click="addDialog=true" class="ml20">上映电影</el-button>
    </el-row>
    <div class="content mt20">
        
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange"  v-loading="loading"    
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="filmName" label="电影">
            <template slot-scope="scope">
            <el-button type="text" size="small" class="orange-txt" @click="checkFilmDetail(scope.row)">{{scope.row.filmName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="coverImg" label="电影封面">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" alt="" width="80px" height="80px">
          </template>
        </el-table-column>
        <el-table-column prop="filmDiretor" label="导演">
        </el-table-column>
        <el-table-column prop="fimeAtor" label="主演">
        </el-table-column>
        <el-table-column prop="makingArea" label="制片地区">
        </el-table-column>
        <el-table-column prop="type" label="影片类型">
        </el-table-column>        
        <el-table-column prop="filmScore" label="评分">
        </el-table-column>
        <el-table-column prop="startTime" label="上映时间">
        </el-table-column>

        <el-table-column prop="cState" label="已上线影院量">
<!--           <template slot-scope="scope">
            <el-tag :type="tags[status].type">{{tags[status].name}}</el-tag>
          </template> -->
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            
          </template>
        </el-table-column>

      </el-table> 
      <div class="block mt20 flex flex-end">
         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNum"
      :page-sizes="[5, 10, 20]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </div>
      

    </div>


    <!-- Dialog -->
<el-dialog
  title="上映影片"
  :visible.sync="addDialog"
  width="45%"
  center>
        <el-form :model="form">
          <el-form-item label="电影名" >
            <el-input v-model="form.filmName" autocomplete="off"></el-input>
          </el-form-item>
      <el-form-item  class="flex flex-column">
              <span>电影封面</span>
              <el-upload
                  class="avatar-uploader ml20"
                  action=""
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
      </el-form-item>
      <el-form-item label="导演" >
            <el-input v-model="form.filmDiretor" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="主演">
            <el-input v-model="form.fimeAtor" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="评分">
                 <el-rate class="mt10" v-model="form.filmScore" show-text>
                 </el-rate>
       </el-form-item>
       <el-form-item class="flex" label="制作区域">
                 <span class="ml20">
                    <el-date-picker
                        v-model="form.startTime" 
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                  </span>
        </el-form-item>
        <el-form-item label="制作区域">
              <el-select v-model="form.makingArea" placeholder="请选择制片地区">
                 <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
      </el-form-item>
        <el-form-item label="电影介绍" >
              <el-input type="textarea" placeholder="电影介绍不能超过150个字" v-model="form.filmIntroduction" maxlength="150"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFilm">取 消</el-button>
          <el-button type="primary" @click="addFilm">确 定</el-button>
        </span>
</el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 5,
        searchName: "",
      },
      Time: [], // 上映时间
      imageUrl: '',
      form: {},
      imageUrl: '',//上传图片路径
      addDialog: false, // 是否显示dialog
      total: 1, // 总数
      tableData: [],// 获取的表格数据
      AreaOptions: [], //区域信息
      tableData:[], // 表格数据
      loading:true,
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
             this.loading = false
        }).catch((err)=> {
            this.$message.error(err)
        })
    },

    search () {

    },
    // 数量改变
    handleSizeChange(res) {
        this.query.pageSize = res
        this.loading = true
        this.getReadyFilmDataList()
    },
    // 页面改变    
    handleCurrentChange(res) {
        this.query.pageNum = res
        this.loading = true
        this.getReadyFilmDataList()
    },
    // 添加电影
    addFilm() {
        this.form.coverImg = this.imageUrl
        this.form.type = '1,2'
        this.form.startTime = this.form.startTime.getFullYear() +'-' + this.form.startTime.getMonth() +  '-' + this.form.startTime.getDate()
        this.form.filmScore =  this.form.filmScore.toString()
        let params = {}
        params = JSON.stringify(this.form)
        // console.log(params)
        this.$http.post(this.$api.getFilmAccess, params).then( (res) => {
                let result = res.data
                if (result.code === 201) {
                  this.$message.success('成功！')
                  this.form = {} // 重新赋值
                  this.imageUrl = ''
                }else {
                  this.$message.error('失败!')
                }
        }).catch( ()=> {
        })
        this.addDialog = false;
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
    // 获取区域信息
    getAreaOrCountryInfo() {
        this.$http.get(this.$api.getAreaOrCountryInfo).then((res)=> {
              let arr = [],
                  oData = res.data
              for (let i=0;i<oData.length;i++) {
                  let obj = {}
                  obj.label = oData[i].areaName;
                  obj.value = oData[i].areaName;
                  arr.push(obj); 
              }
              this.AreaOptions = arr;
              // console.log(this.AreaOptions)
        })
    }
  },
  created() {
    this.getAreaOrCountryInfo()
    this.getReadyFilmDataList()
  },
  components: {
    
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
