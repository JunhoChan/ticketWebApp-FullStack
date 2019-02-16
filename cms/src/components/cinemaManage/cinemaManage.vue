<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="breadcrumb-head flex flex-start">影院管理</div>
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item,i) in $route.meta" :key="i">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="4">
        <el-input placeholder="搜索影院关键字" prefix-icon="el-icon-search" v-model="query.searchName" @blur="getAllCinemaList"></el-input>
      </el-col>
      <!-- <el-button type="primary" @click="search" class="ml20">查询</el-button> -->
<!--       <el-button type="primary" @click="addDialog=true" class="ml20">新增</el-button>   -->
    </el-row>
    <div class="content mt20">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" v-loading="loading"     element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="cName" label="电影院名">
        </el-table-column>
        <el-table-column prop="coverImg" label="影院封面">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" alt="" width="80px" height="80px">
          </template>
        </el-table-column>
        <el-table-column prop="cProvince" label="直辖市或省市">
        </el-table-column>
        <el-table-column prop="cAddress" label="地址">
        </el-table-column>
        <el-table-column prop="cPhone" label="联系电话">
        </el-table-column>
        <el-table-column prop="cState" label="状态">
          <template slot-scope="scope">
            <el-tag :type="tags[scope.row.cState].type">{{tags[scope.row.cState].name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="orange-txt" @click="checkDetail(scope.row)">查看影院详情
            </el-button>
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
      tags:[
        { name:'规划中' ,type: 'warning'},
        { name:'整改中' ,type: 'danger'},
        { name:'营业中' ,type: ''},
      ],
      total: 1,
      tableData: [],
      loading:true,
    };
  },
  methods: {
    // 获取影院数据
    getAllCinemaList() {
        let params = this.query;
        this.$http.get(this.$api.getAllCinemaData, {params: params}).then( (res) => {
            console.log(res.data)
             this.$message.success('请求成功!')
            this.total = res.data.total
             this.tableData = res.data.data
             this.loading = false
        }).catch((err)=> {
            this.$message.error(err)
        })
    },
    // 查看影院详情
    checkDetail(row) {
        let id = row.cinemaId
        this.$router.push('/cDetail/'+id)
    },

    handleSizeChange(res) {
      this.query.pageSize = res
      this.getAllCinemaList()
      this.loading = true
    },
    handleCurrentChange(res) {
      this.query.pageNum = res;
      this.getAllCinemaList()
      this.loading = true
    },


    handleSelectionChange() {},
  },
  created() {
      this.getAllCinemaList();
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
