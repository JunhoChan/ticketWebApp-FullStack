<template>
  <div>
   <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="breadcrumb-head flex flex-start">影院详情</div>
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item,i) in $route.meta" :key="i">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

      <div class="content mt20">
      	<el-container>
      	<el-header class="flex flex-aie flex-center">
      		<span class="f30 bold orange-txt">
					{{cinemaInfo.cName}}
					<el-tooltip placement="top">
					  <div slot="content">
					  	{{cinemaInfo.cProvince}} {{cinemaInfo.cAddress}}
					  </div>
					  <el-button style="border:none;color:red;font-weight:600">地点</el-button>
					</el-tooltip>
      		</span>
      	</el-header>
     	<el-main>
	      <div class="flex flex-bt mr20">
	      	<div>
	      		<span class="f20 ml20 purple-txt">电影: {{filmInfo.filmName}}</span>
<!-- 	      		<span class="f20 ml20">注:场次以天为单位显示</span> -->
	      	</div>
	      	 <el-button type="primary"  @click="Dialog1= true" class="ml20">添加场次</el-button>
	      </div>	
	      <!--  表格  -->
	      <div class="flex flex-center mt20">
	      	  <el-table :data="tableData" class="ml50" style="width: 100%">
			    <el-table-column
				      type="index"
				      label="场次"
				      align="center"
				      width="200">
				    </el-table-column>
				<el-table-column
				      prop="startTime"
				      label="开始时间"
				      align="center"
				      width="300">
				    </el-table-column>
				<el-table-column
				      prop="endTime"
				      label="结束时间"
				      align="center"
				      width="300">
				    </el-table-column>
		<el-table-column label="操作" align="center">
          <template slot-scope="scope">
          	<el-button type="info" size="small" class="orange-txt">编辑
            </el-button>
            <el-button type="danger" size="small" class="orange-txt" @click="deleteIt(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>	
			</el-table>
	      </div>

      	</el-main>
      	<el-footer class="flex flex-end c666">注:场次以天显示</el-footer>
      	</el-container>	
      </div>

      	<!--  对话框 -->
      	<el-dialog
			  title="选择时段放映电影"
			  :visible.sync="Dialog1"
			  width="30%"
			  center>
			  		<el-form ref="form" :model="form" label-width="200px">
			  			  <el-form-item label="开始时间">
						 		<el-time-select
									  v-model="form.startTime"
									  :picker-options="{
									    start: '09:30',
									    step: '00:30',
									    end: '23:30'
									  }"
									  placeholder="选择时间">
									</el-time-select>
						  </el-form-item>
			  			  <el-form-item label="结束时间">
						 		<el-time-select
									  v-model="form.endTime"
									  :picker-options="{
									    start: '10:30',
									    step: '00:30',
									    end: '23:30'
									  }"
									  placeholder="选择时间">
									</el-time-select>
						  </el-form-item>						  
			  		</el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="submitForm">确 定</el-button>
			  </span>
		</el-dialog>

  </div>
</template>

<script>
export default {
	data () {
		return {
			value1:'',
			form: {}, // 上传表格数据
			Dialog1: false, // 默认对话框不显示
			cinemaInfo: {}, // 影院信息
			filmInfo:{},
			tableData: [],
		}		
	},
	methods: {

		__init() {
			this.filmInfo  = this.$route.query.filmData
			this.$http.get(this.$api.getCinemaAccess+'/'+this.$route.query.cinemaId).then( (res)=> {
	            this.cinemaInfo = res.data.data
	            console.log(this.cinemaInfo)  // cAddress cProvince
	        		}).catch( () => {
	            this.$message.error('系统出现问题!')
	        })
	    },

	    // 获取电影时间段数据
	    getFilmTimeData() {
	    	let params = {}
	    	params.cinemaId = this.$route.query.cinemaId
	    	params.filmId   = this.filmInfo.filmId
	    	params = JSON.stringify(params)
	    	this.$http.get(this.$api.getFilmTimeAccess, {params:params}).then( (res) => {
	    				this.tableData = res.data
	    				console.log(res.data)
	    		})
	    },
	    // 传递表单
	    submitForm() {
	    		let params = {}
	    		params.cinemaId = this.$route.query.cinemaId
	    		params.filmId   = this.filmInfo.filmId
	    		params.startTime = this.form.startTime
	    		params.endTime = this.form.endTime
	    		this.form = {}
	    		params = JSON.stringify(params)
	    		this.$http.post(this.$api.getFilmTimeAccess, params).then( (res) => {
	    					if(res.data.code === 201) {
	    						this.$message.success(res.data.msg)
	    					} else {
	    						this.$message.error(res.data.msg)
	    					}
	    					this.getFilmTimeData()			
	    			})
	    		this.Dialog1 = false
	    },

	    // 删除
	    deleteIt(row) {
	    	console.log(row.id)
		    this.$confirm('您确定删除上映时段电影, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				  this.$http.delete(this.$api.getFilmTimeAccess+'/'+ row.id).then((res)=> {
				  					if(res.data.code = 203) {
				  						this.$message.success('已成功删除')
				  					}else {
				  						this.$message.error(res.data.msg)
				  					}
				  					this.getFilmTimeData()
				     	})
	        }).catch(()=> {})
	   }
	},
	created () {
		this.__init()
		this.getFilmTimeData()
		// console.log('测试')
		// console.log(this.$route.query.cinemaId)
		console.log(this.$route.query)
	}
}
</script>

<style scoped>

</style>
