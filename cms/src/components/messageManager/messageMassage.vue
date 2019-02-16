<template>
	<section class="flex flex-column" id="push-container">
		<div class="push-wrapper flex flex-column">
			<h1>系统消息推送</h1>
			<el-input
			  type="textarea"
			  :rows="5"
			  class="textarea"
			  placeholder="请输入内容"
			  v-model="textarea">
			</el-input>
			<div class="flex flex-center flex-bt">
			<div class="tip f12">*提示:请别乱发推送消息到客户端!</div>	
		 	<el-button type="success" class="btn-push" @click="submitBtn">推送信息</el-button>
			</div>
		</div>

		<div class="message-wrapper flex flex-column">
			<h1>当前影院主页信息</h1>
			<el-input
			  type="textarea"
			  :rows="5"
			  class="textarea"
			  placeholder="请输入内容"
			  v-model="noticeMessage">
			</el-input>
			<div class="flex flex-end">
		 	<el-button type="info" class="btn-push" @click="submitMsg">发送影院主页信息</el-button>				
			</div>
		</div>		
	</section>
</template>

<script>
export default {
	data() {
		return {
			textarea:'',   //   推送信息
			noticeMessage: '', // 影院注意信息
		}
	},
	created() {
		this.getMessageInfo()
	},
	mounted() {
		let that = this
		that.socket = io('ws://localhost:8088')
	    that.socket.on('receiveMessage',function(data){ // receive message from server
	    	if(data) {
	    		that.$message.success('推送成功!')
	    	} else {
	    		that.$message.error('推送失败!')
	    	}
	    })

	},
	methods: {  // http://127.0.0.1:7001/api/getMessageInfo
		// 按钮发送
		submitBtn() {
			let that = this
			that.socket.emit('sendMessage', this.textarea);
			this.textarea = ""
		},
		submitMsg() {
			let params = {}
			params.content = this.noticeMessage
			this.$http.post(this.$api.updateMessageInfo,params).then(res => {
					if(res.data.code === 202) {
						this.$message.success('修改主页消息成功!')
					} else {
						this.$message.error('服务器出现问题!')
					}
			}).catch( err=> {  this.$message.error(err) } )
		},
		// 获取主页消息
		getMessageInfo() {
			this.$http.get(this.$api.getMessageInfo).then(res => {
					this.noticeMessage = res.data.content
			}).catch( err => {  this.$message.error(err)    }) 
		}

	},
}
</script>

<style>
#push-container {
	width:100%;
	height:100%;
}
.push-wrapper,.message-wrapper {
	width:50%;
	font-size:20px;
}

.btn-push {
	margin-top:20px;
	width:200px;
}
</style>
