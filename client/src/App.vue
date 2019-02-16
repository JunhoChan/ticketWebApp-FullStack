<template>
  <div id="app">
    <router-view/> 
    <footerGuide  v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import footerGuide from './components/footer/footer.vue'
export default {
  name: 'App',
  data () {
      return {
        
      }
  },
  created() {
          this.checkLocalhasItem() // 检查本地是否已经有推送消息item         
  },
  mounted() {
          this.__initUserPushMessage()
  },
  methods: {
      __initUserPushMessage() {
          let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')),
          obj = {},
           vm = this,
          oIndex = -1           
          if(userInfo) { // 表示登录了
               // this.checkPushUsers(userInfo.userId) // 检查推送列表是否有用户 没有就添加
                let objArr = JSON.parse(window.localStorage.getItem('pushMessageList'))
                objArr.filter((item,index) => {
                      if(userInfo.userId === item.userId ) {
                          oIndex = index
                       }
                })
          // 建立socket连接，使用websocket协议，端口号是服务器端监听端口号                 
                vm.socket = io('ws://localhost:8088');
          // receivev Message
                vm.socket.on('receiveMessage',function(data){
                  objArr[oIndex].msgList.push(data.message)
                  window.localStorage.setItem('pushMessageList',
                    JSON.stringify(objArr))
                })
          }
      },
      // 检查推送列表是否有用户 没有就添加
      // checkPushUsers(id) {
      //       let objArr = JSON.parse(window.localStorage.getItem('pushMessageList')),
      //           obj = {},oIndex = -1
      //       objArr.forEach((item,index) => { //看是否用户在里面
      //           if(item.userId === id) { oIndex = index }
      //       })
      //       console.log(oIndex)
      //       if(parseInt(oIndex) === -1)  { // 没有就新建
      //           obj.userId = id
      //           obj.msgList = ["欢迎来到JunhoChan购票平台..😘😘😘.."]
      //           objArr.push(obj)
      //           window.localStorage.setItem('pushMessageList',
      //             JSON.stringify(objArr))
      //       }
      // },
      // 检查本地是否有推送消息的item
      checkLocalhasItem () {
            // window.localStorage.removeItem('pushMessageList')
            let pushMsgList = window.localStorage.getItem('pushMessageList')
            if(!pushMsgList) {
                let newArr = []
                window.localStorage.setItem('pushMessageList', 
                  JSON.stringify(newArr))
            }
      },


  },
  components: {
  		footerGuide
  }
}
</script>

<style>
  body {
    background-color: #f5f5f5;
  }
</style>
