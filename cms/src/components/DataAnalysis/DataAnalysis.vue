<template>
  <div class="container">
  	    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item,i) in $route.meta" :key="i">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>  
     <ve-line :data="chartData" height="700px" v-loading="loading"    
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"></ve-line>
  </div>
</template>

<script>
export default {
 	data() {
 		return {
 			 analysisData:{},
		 	 chartData: {
		          columns: ['上映时段', '上映数量', '影片结束量'],
		          rows: []
		        },
        loading:true,    
 		}
 	},
 	methods: {
 		getDataAnalysis() { 
 				this.$http.get(this.$api.getDataAnalysis).then( (res)=> {
 						this.$message.success('成功!')
 						// console.log(res.data)
 					let	arr	 = this.unifiedObjct(res.data.startData, res.data.endData)
 					this.chartData.rows = this.convertData(arr)
          this.loading = false
 				}).catch( ()=> {  this.$message.error('服务器出现错误!') })	
 		},

 		// 换成统一格式对象数组 Arr1 开始  Arr2结束
 		unifiedObjct(Arr1,Arr2) {
 			// Arr1处理相同部分
 			for (let n=0;n<Arr1.length;n++) {
 				for (let k=0;k<Arr2.length;k++) {
 					if( Arr1[n].time === Arr2[k].time ) {
 								console.log('测试')
 								Arr1[n].endNum = Arr2[k].endNum
 								Arr2.splice(k,1)
 						}
 					}
 			}
 			Arr2.forEach((item,index,self) => {
 					Arr1.push(item)
 			})
 			Arr1.filter((item,index,self) => {
 				if(!item.endNum) item.endNum = 0
 				if(!item.startNum) item.startNum = 0	
 			})

 			console.log(Arr1)
 			return Arr1
 		},
 		// 换成图片格式数据
 		convertData(Arr) {
 				let newArr = Arr
 				newArr.forEach( (item,index,self) => {
 					item.上映时段 = item.time
 					item.上映数量 = item.startNum
 					item.影片结束量 = item.endNum
 					delete item.time
 					delete item.startNum
 					delete item.endNum
 				})
 				console.log(newArr)
 				return newArr
 		},

 	},
 	created () {
 		this.getDataAnalysis()
 	}
 
};
</script>

<style scoped lang="less">
	.container {
		width: 100%;
		height:100%;
	}

</style>
