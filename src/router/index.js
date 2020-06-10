import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {//首页：统计详情
        path:"/",
        name:'index',
        component:()=> import('../views/index/index.vue')
      },
      {//运行详情
        path:"/run",
        name:"run",
        component:()=> import('../views/index/runinfo.vue')
      },
      {
        // 运行单次详情
        path:"/rundetails",
        name:"rundetails",
        component:()=> import('../views/index/rundetails.vue')
      },
      {
        //学校管理
        path:"/school",
        name:"school",
        component:()=> import('../views/school/index.vue')
      },
      {
        //学校详情
        path:"/schoolInfo",
        name:"schoolInfo",
        component:()=> import('../views/school/info.vue')
      },
      {//站点管理
        path:"/site",
        name:"site",
        component:()=> import('../views/lines/siteindex.vue')
      },
      {//站点详情
        path:"/siteInfo",
        name:"siteInfo",
        component:()=> import('../views/lines/siteInfo.vue')
      },
      {//线路预设管理
        path:"/preset",
        name:"preset",
        component:()=> import('../views/lines/preset.vue')
      },
      {//线路预设详情
        path:"/presetInfo",
        name:"presetInfo",
        component:()=> import('../views/lines/presetInfo.vue')
      },
      {//线路预设添加
        path:"/presetAdd",
        name:"presetAdd",
        component:()=> import('../views/lines/presetAdd.vue')
      },
      {//正式线路
        path:"/lines",
        name:"lines",
        component:()=> import('../views/lines/lines.vue')
      },
      {//正式线路详情
        path:"/linesdetails",
        name:"linesdetails",
        component:()=> import('../views/lines/linesdetails.vue')
      },
      {//小区
        path:"/community",
        name:"community",
        component:()=> import('../views/community/index.vue')
      },
      {//车辆管理
        path:"/car",
        name:"car",
        component:()=> import('../views/car/index.vue')
      },
      {//车辆添加、修改、详情
        path:"/carInfo",
        name:"carInfo",
        component:()=> import('../views/car/info.vue')
      },
      {//安全员管理
        path:"/security",
        name:"security",
        component:()=> import('../views/security/index.vue')
      },
      {//安全员添加、修改、详情
        path:"/securityInfo",
        name:"securityInfo",
        component:()=> import('../views/security/info.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
