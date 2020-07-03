<template>
  <div class="home">
 <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 默认展开 -->
        <el-menu :default-openeds="openeds" :default-active="activePath">
          <el-submenu index="1">
            <template slot="title"><i class="iconfont icon-shouye"></i>主页</template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="1-1" @click="goRouter('index','1-1')">统计详情</el-menu-item>
              <el-menu-item index="1-2"  @click="goRouter('run','1-2')">运行详情</el-menu-item>
            </el-menu-item-group>         
            <!-- <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="iconfont icon-xuexiao"></i>学校管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1"  @click="goRouter('school','2-1')">学校管理</el-menu-item>
            </el-menu-item-group>
          
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="iconfont icon-xianlucanshu"></i>线路管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="goRouter('site','3-1')">站点管理</el-menu-item>
              <el-menu-item index="3-2" @click="goRouter('preset','3-2')">线路预设</el-menu-item>
              <!-- <el-menu-item index="3-3">未知线路</el-menu-item> -->
              <el-menu-item index="3-3" @click="goRouter('lines','3-3')">正式线路</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
          <el-submenu index="9">
            <template slot="title"><i class="iconfont icon-xiaoqu"></i>小区管理</template>
            <el-menu-item-group>
              <el-menu-item index="9-1" @click="goRouter('community','9-1')">小区管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="iconfont icon-ziyuan"></i>资源管理</template>
            <el-menu-item-group>
              <el-menu-item index="4-1">设备管理</el-menu-item>
              <el-menu-item index="4-2"  @click="goRouter('car','4-2')">车辆管理</el-menu-item>
              <el-menu-item index="4-3"  @click="goRouter('security','4-3')">安全员管理</el-menu-item>
              <el-menu-item index="4-4"  @click="goRouter('drivers','4-4')">司机管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>          
          <el-submenu index="5">
            <template slot="title"><i class="iconfont icon-customer"></i>客户管理</template>
            <el-menu-item-group>
              <el-menu-item index="5-1"  @click="goRouter('parent','5-1')">家长管理</el-menu-item>
              <el-menu-item index="5-2" @click="goRouter('children','5-2')">学生管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="iconfont icon-dingdan"></i>订单管理</template>
            <el-menu-item-group>
              <el-menu-item index="6-1" @click="goRouter('order','6-1')">订单管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
           <el-submenu index="7">
            <template slot="title"><i class="iconfont icon-ziyuan206"></i>请假管理</template>
            <el-menu-item-group>
              <el-menu-item index="7-1" @click="goRouter('leave','7-1')">请假管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
        <el-submenu index="8">
            <template slot="title"><i class="iconfont icon-jianglijili"></i>奖励管理</template>
            <el-menu-item-group>
              <el-menu-item index="8-1" @click="goRouter('reward','8-1')">奖励管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
          <el-submenu index="10">
            <template slot="title"><i class="iconfont icon-ziyuan1"></i>消息管理</template>
            <el-menu-item-group>
              <el-menu-item index="10-1" @click="goRouter('msg','10-1')">消息管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>  
          <el-submenu index="11">
            <template slot="title"><i class="iconfont icon-ziyuan1"></i>信息反馈</template>
            <el-menu-item-group>
              <el-menu-item index="11-1" @click="goRouter('feedback','11-1')">信息反馈</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>  
          <el-submenu index="12">
            <template slot="title"><i class="iconfont icon-customer"></i>运营员管理</template>
            <el-menu-item-group>
              <el-menu-item index="12-1"  @click="goRouter('operate','5-1')">运营员管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>        
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right;">
          <h3>智享校车运营管理系统</h3>
          <!-- <el-dropdown> -->
            <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
            <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>-->
          <!-- </el-dropdown>  -->
          <span>{{userInfo.name}}</span>
          <span class="logout" @click="logOut()">退出登录</span>
        </el-header>
        
        <el-main>
          <!-- 主页出口 -->
          <router-view/>          
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return{
      activePath:"1-1",
      openeds:['1']
    }
  },
  created(){
    let activePath=""
    activePath=sessionStorage.activePath
    if(activePath){
      this.activePath=activePath
      this.openeds[0]=activePath.split("-")[0]
    }
	let userInfo=sessionStorage.userInfo
	this.userInfo=JSON.parse(userInfo)
  },
  methods:{
    goRouter(pathName,index){
      this.$router.push({name:pathName})
      // 存session 进入页面默认高亮
      sessionStorage.activePath=index
    },
    logOut(){
      sessionStorage.removeItem('userInfo')
      this.$router.push({name:'login'})
    },
  },
  beforeRouteUpdate (to, from, next) {
    // console.log("路由监听")
    // console.log(to)
    let urlName=to.name
    switch(urlName){
      case 'index':
        sessionStorage.activePath="1-1"
        this.activePath='1-1'
        break
      case 'run':
      case 'rundetails':
        sessionStorage.activePath="1-2"
        this.activePath='1-2'
        break
      case 'schoolInfo':
      case 'school':
        sessionStorage.activePath="2-1"
        this.activePath='2-1'
        break
      case 'siteInfo':
      case 'site':
          sessionStorage.activePath="3-1"
          this.activePath='3-1'
          break
      case 'presetInfo':
      case 'preset':
      case 'presetAdd':
          sessionStorage.activePath="3-2"
          this.activePath='3-2'
          break
      case 'lines':
      case 'linesdetails':
          sessionStorage.activePath="3-3"
          this.activePath='3-3'
      break
      case 'community':
          sessionStorage.activePath='9-1'
          this.activePath='9-1'
          break
      case 'carInfo':
      case 'car':
          sessionStorage.activePath='4-2'
          this.activePath='4-2'
          break
      case 'security':
      case 'securityInfo':
          sessionStorage.activePath='4-3'
          this.activePath='4-3'
          break
      case 'drivers':
      case 'driversInfo':
          sessionStorage.activePath='4-4'
          this.activePath='4-4'
          break
      case 'parent':
      case 'parentinfo':
          sessionStorage.activePath='5-1'
          this.activePath='5-1'
          break
          case 'children':
      case 'childreninfo':
          sessionStorage.activePath='5-2'
          this.activePath='5-2'
          break
      case 'order':
          sessionStorage.activePath='6-1'
          this.activePath='6-1'
          break
      case 'leave':
          sessionStorage.activePath='7-1'
          this.activePath='7-1'
          break
      case 'reward':
          sessionStorage.activePath='8-1'
          this.activePath='8-1'
          break
      case 'msg':
      case 'msginfo':
          sessionStorage.activePath='10-1'
          this.activePath='10-1'
          break    
      case 'feedback':
          sessionStorage.activePath='11-1'
          this.activePath='11-1'
          break  
      case 'operate':
      case 'operateInfo':
          sessionStorage.activePath='12-1'
          this.activePath='12-1'
          break  
    }
    next()
  }
}
</script>
<style lang="scss" scoped>
    .iconfont{
      margin-right: 10px;
    }
   .el-aside{
     position: fixed;
     overflow-x: hidden;
     overflow-y: scroll;
    //  height: 100%;
     top: 60px;
     bottom: 0;
     margin: auto;
   }
   .el-main{
     margin-left: 200px;
     margin-top: 60px;
   }
   .el-header{
     position: fixed;
     top: 0;
     z-index: 1000;
     width: 100%;
    //  left:;
     h3{
       float: left;
       color: #fff;
       letter-spacing: 5px;
       font-size: 20px;
     }
   }
   .logout{
     padding: 0 10px;
     margin-left: 10px;
   }
</style> 
