import axios from "axios";
import qs from 'qs'
import router from "../router"
const devUrl ='http://192.168.0.116:3326/' 
import { Message } from 'element-ui'


let token="";
// axios.defaults.withCredentials = false;
// axios.defaults.headers.common['token'] = token;   // 请求头  token 空 
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

// import {Indicator,Toast} from "vant"
// axios 拦截器 
//  添加一个请求拦截器  request 
axios.interceptors.request.use(function (config) {
    //获取存储的token，判断是否有存储的token   每次做请求的时候带过header 去后台对比判断token===》checklogin
    let userInfo = window.sessionStorage.userInfo;
    console.log("请求头")
    // console.log(window.localStorage.userinfo)
    // conso
    if(userInfo){
        // userInfo = JSON.parse(userInfo);
        token =JSON.parse(userInfo);
    }
    // config.headers.common['token'] = token.token;
    // config.headers.common['Project-Type'] = 0;//后台类型1:代理  0平台
    // Toast.loading({
    //   mask: true,
    //   message: '加载中...'
    // });
    return config;
  }, function (error) {
    // Do something with request error
    // Toast({message:"未知错误-req",duration:500})
    return Promise.reject(error);
});


// 添加一个响应拦截器 response 
axios.interceptors.response.use(function (response) {
    console.log(response);
  console.log("响应")
    // Indicator.close();
    // if(!!response.data.msg){
    //   Toast({message:response.data.msg,duration:500});
    // }   
    if(response.data.code ==250){
        // 未登录，请重新登录 
        Message.warning(response.data.msg)
        
      // setTimeout(()=>{
        // router.push({name:'login'});
      // },2000)
       
    }

    if (response.data.code==9500) {//系统繁忙
      // Message.warning(response.data.msg)
    
    }else if (response.data.code==9400 )   {
      Message.warning('登录过期，请重新登录')
      // setTimeout(function () {
        // router.replace({
        //   path: '/login'     // 到登录页重新获取token
        // })
      // },500)
    }
    return response;
  }, function (error) {
    // Toast({message:"未知错误-res",duration:500})
    Message.warning('网络异常，请重新登录')

    // setTimeout(()=>{
    //   router.push({name:'login'});
    // },3000)
    return Promise.reject(error.response);
  })


  function checkStatus (response,lock) {
    // loading
    // 如果http状态码正常，则直接返回数据
    // console.log("响应11111")
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      // console.log("想学习")
      return response.data
      // 如果不需要除了data之外的数据，可以直接 return response.data
    }else if (response.status === 500 ){
      console.log("500")
    }
    else {
      if(lock){ // 是否提示 true不显示，false 显示
        alert('网络异常')
      }
      // console.log("想学习222222")

      return response
    }
    // 异常状态下，把错误信息返回去
    // return {
    //   status: -404,
    //   msg: '网络异常'
    // }
  }




export default {
  post (url, params,type,lock,baseurl) {
    // params.memberId =store.state.userInfo.memberId  
    let contentType=""
    contentType=type?type:'application/x-www-form-urlencoded'  
    // console.log("post请求")   
    // console.log(lock)
    // console.log(baseurl)
    // console.log(type)
    // return new Promise((resolve,reject)=>{  
      let data=null
      data=type?params:qs.stringify(params)   
      // data=qs.stringify(params)
     return axios({
        method: 'post',
        url:url,
        // data: qs.stringify(params),
        data:data,
        timeout: 3000000000,   
         headers: {
        // 'Accept' : 'application/json;charset=UTF-8',
        'Content-Type': contentType//application/json
        // 'Content-Type':'application/json'
      }    
      }).then(function (res) {
        // console.log()
          return checkStatus(res,lock)
          // console.log(res);
        }).catch((err)=>{
          console.log("请求出错")
          console.log(err)
        })
    // })
  },
  postImg (url, params,lock,baseurl,header) {
    return axios({
      method: 'post',
      baseURL: baseurl,
      url:url,
      data: params,
      timeout: 300000000000000,
      headers: header
    }).then(function (res) {
      console.log("上传图片")
        return checkStatus(res,lock)
      }
    )
  },
};