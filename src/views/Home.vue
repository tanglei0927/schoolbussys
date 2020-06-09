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
              <el-menu-item index="4-2">车辆管理</el-menu-item>
              <el-menu-item index="4-3">安全员管理</el-menu-item>
              <el-menu-item index="4-4">司机管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>          
          <el-submenu index="5">
            <template slot="title"><i class="iconfont icon-customer"></i>客户管理</template>
            <el-menu-item-group>
              <el-menu-item index="5-1">家长管理</el-menu-item>
              <el-menu-item index="5-2">学生管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="iconfont icon-dingdan"></i>订单管理</template>
            <el-menu-item-group>
              <el-menu-item index="6-1">订单管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
           <el-submenu index="7">
            <template slot="title"><i class="iconfont icon-ziyuan206"></i>请假管理</template>
            <el-menu-item-group>
              <el-menu-item index="7-1">请假管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
        <el-submenu index="8">
            <template slot="title"><i class="iconfont icon-jianglijili"></i>奖励管理</template>
            <el-menu-item-group>
              <el-menu-item index="8-1">奖励管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>
          <el-submenu index="8">
            <template slot="title"><i class="iconfont icon-ziyuan1"></i>消息管理</template>
            <el-menu-item-group>
              <el-menu-item index="8-1">消息管理</el-menu-item>
            </el-menu-item-group>            
          </el-submenu>          
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right;">
          <!-- <el-dropdown> -->
            <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
            <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>-->
          <!-- </el-dropdown>  -->
          <span>admin</span>
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
  },
  methods:{
    goRouter(pathName,index){
      this.$router.push({name:pathName})
      // 存session 进入页面默认高亮
      sessionStorage.activePath=index
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
    }
    next()
  }
}
</script>
<style lang="scss" scoped>
    .iconfont{
      margin-right: 10px;
    }
   
</style> 
