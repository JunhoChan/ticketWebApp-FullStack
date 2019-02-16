<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="breadcrumb-head flex flex-start">用户管理</div>
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item,i) in $route.meta" :key="i">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="4">
        <el-input placeholder="搜索用户关键字" prefix-icon="el-icon-search" v-model="query.searchName" @blur="getUserInfoList"></el-input>
      </el-col>
    </el-row>
    <div class="content mt20">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" v-loading="loading"     element-loading-text="拼命加载中"
			    element-loading-spinner="el-icon-loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
        
        <el-table-column prop="userId" label="用户标识码">
        </el-table-column>
<!--         <el-table-column prop="coverImg" label="影院封面">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" alt="" width="80px" height="80px">
          </template>
        </el-table-column> -->
        <el-table-column prop="username" label="用户名(账号)">
        </el-table-column>        
        <el-table-column prop="phone" label="手机">
        </el-table-column>
        <el-table-column prop="loginLocation" label="登录地点">
        </el-table-column>        
        <el-table-column prop="createTime" label="注册时间">
        </el-table-column>
<!--         <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="orange-txt" @click="checkDetail(scope.row)">查看影院详情
            </el-button>
          </template>
        </el-table-column> -->

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

  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 5,
        searchName: ""
      },
      total: 1,
      tableData: [],
      loading: true,
    };
  },
  methods: {
    // 获取影院数据
    getUserInfoList() {
        let params = this.query;
        this.$http.get(this.$api.getUserInfoList, {params: params}).then( (res) => {
            console.log(res.data)
             this.$message.success('请求成功!')
             this.total = res.data.total
             this.tableData = res.data.data
             this.loading = false
        }).catch((err)=> {
            this.$message.error(err)
        })
    },

    handleSizeChange(res) {
      this.query.pageSize = res;
      this.loading = true
      this.getUserInfoList()
    },
    handleCurrentChange(res) {
      this.query.pageNum = res;
      this.loading = true
      this.getUserInfoList()
    },


    handleSelectionChange() {},
  },
  created() {
      this.getUserInfoList();
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
