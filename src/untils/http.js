'use strict'

import axios from 'axios'
import router from '@/router/index'
import qs from 'qs'
import { Message } from 'element-ui'

const devUrl ='http://mushroom.runfkj.com' 
//'http://47.94.37.25:3325'
// const devUrl = 'http://192.168.31.248:3324' 



//const proUrl = 'http://47.94.37.25:3325' // 生产环境
const proUrl="http://mushroom.runfkj.com"
const baseUrl=process.env.NODE_ENV == 'development' ? devUrl : proUrl;
axios.interceptors.request.use(config => {
  // loading
  if (store.state.userInfo && store.state.userInfo.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = store.state.userInfo.token;
    config.headers.common['User-Token']= config.headers.Authorization
    console.log("Token")
    console.log(config.headers.Authorization)
  }
  return config
}, error => {
  return Promise.reject(error)
})

// // 添加响应拦截器
axios.interceptors.response.use(response => {
  console.log(response);
  if(response.data.code==300){
    Message.warning('未登录，请重新登录');
    setTimeout(function () {
      router.replace({
        path: '/login'     // 到登录页重新获取token
      })
    },2000)
  }
  if (response.data.code==500) {
    Message.warning(response.data.msg);
  }else if (response.data.code==400 )   {
    Message.warning('登录过期，请重新登录');
    setTimeout(function () {
      router.replace({
        path: '/login'     // 到登录页重新获取token
      })
    },2000)
  }
  return response
}, error => {
  Message.warning('登录异常，请重新登录');
  router.push({path: '/login'})
  return Promise.resolve(error.response)
})

function checkStatus (response,lock) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }else if (response.status === 500 ){
    console.log("500")
  }
  else {
    if(lock){ // 是否提示 true不显示，false 显示
      alert('网络异常')
    }
    return response
  }
  // 异常状态下，把错误信息返回去
  // return {
  //   status: -404,
  //   msg: '网络异常'
  // }
}
function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.code === 1) {
    alert(res.errMsg)
  }else {
    console.log(res.code);
  }
  return res
}

export default {
  post (url, params,lock,baseurl) {
    // params.memberId =store.state.userInfo.memberId
    return axios({
      method: 'post',
      baseURL: baseurl|| baseUrl,
      url:url,
      data: qs.stringify(params),
      timeout: 3000000000,
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function (res) {
        return checkStatus(res,lock)
        console.log(res);
      }
    )
  },
  postImg (url, params,lock,baseurl,header) {
    return axios({
      method: 'post',
      baseURL: baseurl|| baseUrl,
      url:url,
      data: params,
      timeout: 300000000000000,
      headers: header
    }).then(function (res) {
        return checkStatus(res,lock)
      }
    )
  },
  get (url, params,baseurl,header) {
    // params.memberId =store.state.userInfo.memberId
    return axios({
      method: 'get',
      baseURL: baseurl || baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 300000,
      headers: header

    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
  login (url, params,baseurl) {
    var data = {
      loginPassword: md5(params.loginPassword),
      accountName: params.accountName
    }

    return axios({
      method: "get",
      baseURL: baseurl || baseUrl,
      url,
      params:data, // get 请求时带的参数
      timeout: 300000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
  devUrl
}
