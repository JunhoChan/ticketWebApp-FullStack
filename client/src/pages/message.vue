<template>
	<section class="flex flex-column" id="server-message">
		<headerTop title="系统消息" leftNav="1" />
		<div class="message-container mt50">
			<ul class="message-list" id="oUl">
				<li v-for="item in pmArr">
					<div class="avator"></div>
					<div class="message">{{item}}</div>
				</li>								
			</ul>
		</div>
	</section>
</template>

<script>
// 将信息存进本地localStorage systemMessage
import headerTop from './../components/header/header.vue'
export default {
	data() {
		return {
			pmArr: [],
		}
	},
	created() {
		this.checkPushUsers()
		this.__initMessageInfo()
	},
	mounted() {
		oUl.scrollTop = document.getElementById("oUl").scrollHeight;
	},
	methods: {
		__initMessageInfo() {
		   let oUl = document.getElementById("oUl"),
		   userInfo = JSON.parse(window.sessionStorage.getItem("userInfo")),
		   pushMessageArr = JSON.parse(window.localStorage.getItem("pushMessageList")),
		   oIndex = -1
		   pushMessageArr.forEach((item,index) => {
		   		if (item.userId === userInfo.userId) {
		   				oIndex = index
		   		}
		   })
		   this.pmArr = pushMessageArr[oIndex].msgList
		},
      // 检查推送列表是否有用户 没有就添加
      checkPushUsers() {
      		let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')),
            	objArr = JSON.parse(window.localStorage.getItem('pushMessageList')),
                obj = {},oIndex = -1,
                id = userInfo.userId
            objArr.forEach((item,index) => { //看是否用户在里面
                if(item.userId === id) { oIndex = index }
            })
            if(parseInt(oIndex) === -1)  { // 没有就新建
                obj.userId = id
                obj.msgList = ["欢迎来到JunhoChan购票平台..😘😘😘.."]
                objArr.push(obj)
                window.localStorage.setItem('pushMessageList',
                  JSON.stringify(objArr))
            }
      },		

	},
	components: {
		headerTop,
	},

}
</script>

<style>
#server-message .message-container {
	height: 93vh;
	width: 92vw;
	overflow: hidden;
}

#server-message .message-container .message-list {
	width: 100%;
	height: 100%;
	overflow-y: scroll;
    overflow-x: hidden;
	padding: 0vw 4vw 0vw 6vw;    
}
#server-message .message-container ul li {
	display: flex;
	margin-top:1rem;
}
#server-message .message-container ul li:first-child {
	margin-top: 2rem;
}

#server-message .message-container ul li:last-child {
	margin-bottom: 2rem;
}
 /* for Chrome */
#server-message .message-container .message-list::-webkit-scrollbar {
    display: none;
}

#server-message .message-container ul li .avator {
	height: 3rem;
	width: 3rem;
	background-color: black;
	background-repeat: no-repeat;
	background-position: 29% 28%;
}

#server-message .message-container ul li .message:before {
	content: "";
	display: block;
	position: absolute;
	width: 0;
	height: 0;
	border-style: solid;
	border-color:  transparent  #32cd3e transparent transparent;
	border-width: 10px;
	left: -6%;
	top: 20%;
}

#server-message .message-container ul li .message {
	display: flex;
	align-items: center;		
	background-color: #32cd3e;
	width: 70%;
	border-bottom-right-radius: 5px;
	border-top-right-radius: 5px;
	padding: 5px 5px 5px 20px;
	margin-left: 16px;
	position: relative;
	align-items: center;
	word-wrap: break-word;
	word-break: break-all;
	font-size:1.3rem;
}

</style>