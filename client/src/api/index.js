/*
与后台交互模块
 */
import ajax from './ajax'

const BASE_URL = 'http://localhost:7001/api'

/**
 * 获取该城市电影信息
 */
export const  reqBannerInfo= () => ajax(BASE_URL + '/getBannerInfo')


// /**
//  * 获取msite页面食品分类列表
//  */
// export const reqCategorys = () => ajax(BASE_URL + '/index_category')


/**
 * 账号密码登录
 */
// export const pwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/login_pwd', {
//   name,
//   pwd,
//   captcha
// }, 'POST')

