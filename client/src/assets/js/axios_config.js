import axios from 'axios';


const domain = "http://127.0.0.1:7001/api/"  // 域名
// 配置默认域名，请求接口时自动添加域名
axios.defaults.baseURL = domain;
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  // 'Content-Type': 'application/x-www-form-urlencoded;'
  // 'Content-Type': 'multipart/form-data'
  // 'Content-Type':'text/plain'
  // "token": localStorage.getItem('token')
}


export default axios;