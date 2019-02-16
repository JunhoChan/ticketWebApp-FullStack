<template>
  <div>
  		    <!-- 面包屑导航 -->
    <div class="breadcrumb">
<!--       <div class="breadcrumb-head flex flex-start">优惠管理</div> -->
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item,i) in $route.meta" :key="i">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content mt20">
    	<div class="flex mb20">
    		<div class="flex flex-center mr20">满减优惠设置&nbsp;</div>
    		<span class="w20 flex flex-center mr20" v-for="item in offerInfo">
    			<el-input v-model="item.saveMoney" :value="item.saveMoney" maxlength="1" class="mr10" @blur="handleOfferMoney(item)"></el-input>
    			元
    		</span>
    		<span class="f14 flex flex-center">提示: 满30减  满60减 满90减</span>  				
    	</div>
    	<el-button type="success" @click="addDialog = true;isCreate = true">添加优惠</el-button>
    	<el-table class="mt20" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column prop="dType" align="center" label="折扣类型">
        </el-table-column>
        <el-table-column prop="dRate"  align="center"  label="折扣比例">
        </el-table-column>
         <el-table-column prop="dValidity"  align="center"  label="有效期(天)">
        </el-table-column>                     
        <el-table-column prop="dNum"   align="center"  label="折扣券总量">
        </el-table-column>
         <el-table-column prop="dRealNum"   align="center"  label="折扣券剩余数量">
        </el-table-column>
<!--         <el-table-column prop="dContent"  align="center" label="注释">
        </el-table-column>   -->              
        <el-table-column label="操作" align="center" width="240px">
          <template slot-scope="scope">
            	<el-button type="warning" @click="editDiscount(scope.row)" >编辑</el-button>
            	<el-button type="danger"  @click="deleteDiscount(scope.row)">删除</el-button>            	
          </template>
        </el-table-column>

      </el-table> 
    </div>   


    	    <!-- Dialog -->
<el-dialog
  title="添加优惠卷"
  :visible.sync="addDialog"
  width="45%"
  center>
        <el-form :model="form">
	        <el-form-item label="优惠比例" >
	      		<el-input-number v-model="form.dRate" :precision="2" :step="0.05" :max="1" :min="0.05"></el-input-number>	
	        </el-form-item>

	        <el-form-item label="优惠类型" >
	              <el-select v-model="form.dType" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					 </el-select>
	        </el-form-item>

	        <el-form-item label="优惠有效天数" >
	              <el-input placeholder="优惠天数" type="number" v-model="form.dValidity" clearable>
				 </el-input>
	        </el-form-item>

	        <el-form-item label="优惠卷数量" >
	              <el-input placeholder="请输入优惠卷数量" type="number" v-model="form.dNum" clearable>
				 </el-input>
	        </el-form-item>


	        <el-form-item label="优惠解释" >
	              <el-input type="textarea" placeholder="注意简洁语言" v-model="form.dContent" maxlength="150"></el-input>
	        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addDiscount">确 定</el-button>
        </span>
</el-dialog>


  </div>
</template>

<script>
export default {
	data() {
		return {
			tableData:[],
			addDialog: false,
			form: {},
			options:[{
	          value: '积分兑换优惠卷',
	          label: '积分兑换优惠卷'
        	},	
        	{
	          value: '普通优惠卷',
	          label: '普通优惠卷'
        	},{
 	          value: '其他',
	          label: '其他'       		
        	}],
        	isCreate: false, // 默认不是创建
        	offerInfo:[], // 满减优惠信息
        	input:'',
		}
	},
 	methods: {
 		// 处理满减优惠更新
 		handleOfferMoney(params){
 			this.$http.post(this.$api.updateOfferMoneyInfo, params ).then((res) => {
 						if(res.data.code === 202) {
 							this.$message.success('满减优惠修改成功!')
 						}else {
 							this.$message.error(res.data.msg)
 						}
 				}) 			
 		},
 		getOfferMoneyInfo() {
 			this.$http.get(this.$api.getOfferMoneyInfo,{}).then( (res) => {
 					this.offerInfo = res.data
 					console.log(this.offerInfo)
 			}).catch(err=>{console.log(err)}) 			
 		},
 		// 编辑优惠卷
 		editDiscount(row) {
 			this.form = row
 			this.isCreate = false
 			this.addDialog = true
 		},
 		// 添加优惠
 		addDiscount() {
 				let params = {}
 				params = this.form;
 				// params.dRate = params.dRate.toString()
 				if(this.isCreate) {
 						this.createDiscount(params)
 				} else {
 						this.editOldDiscount(params)
 				}
 				this.addDialog = false
 		}, // 新建
 		createDiscount(params) {
 			this.$http.post(this.$api.getDiscountAccess, params ).then((res) => {
 						if(res.data.code === 201) {
 							this.$message.success('已成功添加优惠卷!')
 							this.form = {}
 						}else {
 							this.$message.error(res.data.msg)
 						}
 						this.getDicountDataList() // 刷新	
 				})
 		},// 编辑
 		editOldDiscount(params) {
 			let id = params.discountId
 			// delete params.discountId
 			// console.log(params)
 			this.$http.put(this.$api.getDiscountAccess+'/'+ id , params ).then((res) => {
 						if(res.data.code === 202 ) {
 							this.$message.success('已成功修改优惠卷!')
 							this.form = {}
 						}else {
 							this.$message.error(res.data.msg)
 						}
 						this.getDicountDataList() // 刷新	
 				})
 		},
 		deleteDiscount(row) {
 			  this.$confirm('此操作将永久删除该优惠卷, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then( ()=> {
					this.$http.delete( this.$api.getDiscountAccess+ '/'+ row.discountId ).
						then((res) => {
							if(res.data.code === 203) {
								this.$message.success(res.data.msg)
								this.getDicountDataList()
							} else {
								this.$message.error(res.data.msg)
							}
						})
		        }).catch( ()=> {})
 		},
 		getDicountDataList() {
 			this.$http.get(this.$api.getDiscountAccess,{}).then( (res) => {
 					this.tableData = res.data
 			})
 		},
 		handleSelectionChange() {},
 	},
 	created() {
 		this.getDicountDataList()
 		this.getOfferMoneyInfo()
 	},
};
</script>

<style scoped="">
.w20 {
	width: 8%
}

</style>
