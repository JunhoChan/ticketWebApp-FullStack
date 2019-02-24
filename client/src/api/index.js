/*
与后台交互模块
 */
import ajax from './ajax'

const BASE_URL = 'http://localhost:7001/api'

/**
 * 获取该城市电影信息
 */
export const  reqBannerInfo= () => ajax(BASE_URL + '/getBannerInfo')
