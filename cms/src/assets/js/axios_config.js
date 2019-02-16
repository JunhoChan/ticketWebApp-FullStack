import axios from 'axios';

// 这是一个饿了么的弹框
// import {
//   Message
// } from 'element-ui';
// import {
// 	Notification
// } from 'element-ui';
// import Router from '../router/index.js'

import {
  domain
} from './api_config.js';



// 配置默认域名，请求接口时自动添加域名
axios.defaults.baseURL = domain;
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  // 'Content-Type': 'application/x-www-form-urlencoded;'
  // 'Content-Type': 'multipart/form-data'
  // 'Content-Type':'text/plain'
  // "token": localStorage.getItem('token')
},

  // axios.defaults.params={"token":sessionStorage.getItem('token')}
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers = {
  // 	"Content-Type": "application/json"
  // };
  // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  //调用的接口是跨域, 默认不携带cookie, 如果需要携带, 须配置withCredentials为true
  // axios.defaults.withCredentials = true;
// axios.interceptors.request.use(
// 	rsp => {
// 		console.log("axios请求拦截器");
// 		console.log(rsp);
// 		return rsp
// 	}, err => {
// 		console.log("axios请求拦截器");
// 		console.log(err);
// 		Message.error(err.response.data.msg)
// 	}
// )

axios.interceptors.response.use(
  // rsp => {
  //   if (rsp.data.code == 302) {
  //     console.log(`axios响应拦截器---请求成功但返回异常`)
  //     Message.error({
  //       message: '登录超时',
  //       duration: 3000
  //     })
  //     window.location.href = '/#/login'
  //   } else {
  //     return rsp
  //   }

  // }, err => {
  //   console.log("axios响应拦截器---请求失败");
  //   console.log(err);
  //   let state = 500;
  //   if (err.response) {
  //     state = err.response.data.stateCode;
  //   } else {
  //     sessionStorage.removeItem("isLogin");
  //     window.location.href = '/#/login'
  //   }

    // if (state == "E100011") {
    // 	Message.error({
    // 		message: '登录超时，请关闭当前页面或注销后重新登录！',
    // 		duration: 3000
    // 	});
    // 	sessionStorage.removeItem("isLogin");
    // 	window.location.href = '/#/login'
    // } else if (state == "E100201") {
    // 	Message.error({
    // 		message: err.response.data.msg,
    // 		duration: 3000
    // 	});
    // 	sessionStorage.removeItem("isLogin");
    // 	// window.location.href = '/#/login'
    // } else {
    // 	Message.error({
    // 		message: err.response.data.msg,
    // 		duration: 3000
    // 	})
    // 	// Notification.error({
    // 	// 	title: '错误',
    // 	// 	message: err.response.data.msg,
    // 	// 	duration:3000
    // 	// });
    // }
  // }
);

export default axios;
