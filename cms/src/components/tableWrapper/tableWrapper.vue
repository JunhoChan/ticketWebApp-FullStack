<template>
	<div>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
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
<!--         <el-table-column prop="type" label="影片类型">
        </el-table-column>     -->    
        <el-table-column prop="filmScore" label="评分">
        </el-table-column>
        <el-table-column prop="startTime" label="上映时间">
        </el-table-column>

        <el-table-column prop="cState" label="当前状态">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.status === 1">已上映</el-tag>
            <el-tag :type="tags[status].type" v-else>{{tags[status].name}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="140px" v-if="status !== 2">
          <template slot-scope="scope">
            <el-button type="danger" size="small" class="orange-txt" v-if="scope.row.status === 1">已上映
            </el-button>
            <el-button type="warning" size="small" class="orange-txt" @click="selectedShowFilm(scope.row)" v-else-if="status === 0 && scope.row.status === 0">选择上映
            </el-button>

            <el-button type="danger" size="small" class="orange-txt" @click="seletedLowerFilm(scope.row)" v-else="status === 1">选择下映
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

</template>


<script>
  export default {
    data() {
      return {
      // 	  query: { //查询
      //   pageNum:  1,
      //   pageSize: 5,
      //   id:-1,
      // },
      	  tags:[ // 样式标签
        { name:'待上映中' ,type: 'warning'},
        { name:'上映中...' ,type: 'danger'},
        { name:'已下映' ,type: ''},
     			 ],
      }
    },
    methods: {
    	// 选择改变时
  		handleSelectionChange() {},
      	handleSizeChange(res) {
	      console.log(res);
	      this.query.pageSize = res;
	      let params = this.query
	      this.$emit('getDataList',params) 
	    },
	    handleCurrentChange(res) {
	      console.log(res);
	      this.query.pageNum = res;
	      let params = this.query
	      this.$emit('getDataList',params) // 调用父组件方法
	    },

      // 查看电影详情
      checkFilmDetail(row) {
        let filmData = row
        if(this.status === 1) {
          this.$router.push({ path:'/setFilmShowTime', query: 
            {
             cinemaId:this.$route.params.id,
             filmData: filmData
            } 
          })
        }
      },

      // 选择上映电影
      selectedShowFilm(row) {
        this.$prompt('请输入管理员密码', '您选择上映电影: ' + row.filmName, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType:  'password',
        }).then(({ value }) => {
                if( value === '123456') {
                   this.setFilmState( row.filmId, 1 )
                   this.$message.success('上映电影成功')
                } else {
                  this.$message.error('密码错误!');
                }
        }).catch(()=>{})
      },
      // 选择下映电影
      seletedLowerFilm(row) {
             this.$confirm('此操作将下映该电影, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( ()=> {
              this.setFilmState( row.filmId, 2 )
              this.$message.warning('下映电影成功')
        }).catch( ()=> {})
      },
      // 设置电影状态 0等待上映  1 上映 2 下映
      setFilmState(filmId,status) {
         let params = {}
         params.filmId = filmId
         params.cinemaId = this.$route.params.id
         params.status = status
         this.$http.get(this.$api.setFilmState, {params:params}).then( (res) => {
                    this.$emit('getDataList')
         })
      }

    },
    props: { //父到子数据
    	tableData: Array,
    	total: Number,
      status: Number,
      query: Object,
      cinemaInfo:	Object,
    },
    created() {
	     // this.$emit('getDataList', this.query) 
       console.log('--路由--')
       console.log(this.$route.params.id)
    },
  };
</script>



<style scoped="">

</style>	