<template>
    <div class="page">
           <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>预设线路管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox cl">   
            <h3><span>筛选</span>
                <el-button type="primary" @click="init()">搜索</el-button>
            </h3>
           <!-- <div @click="yyshow=true">运营员：
               <span v-if="checkYy.length==0">全部</span>
               <span v-for="(item,index) in checkYy">{{item.managerName}}</span>
           </div> -->
           <div @click="schoolshow=true">学校：
               <span>{{checkSchool?checkSchool:'全部'}}</span>
           </div>           
            <el-form class="cl" ref="form" :model="form" label-width="100px">
                <el-form-item label="线路名称">
                    <el-input placeholder="请输入线路名称" v-model="form.name"></el-input>
                </el-form-item>
                 
                 <!-- <el-form-item label="途径站点：">
                    <el-input placeholder="请输入途径站点"></el-input>
                </el-form-item>     -->
                <el-form-item label="是否上架">
                    <el-select v-model="form.isShelf" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="上架" value="0"></el-option>
                        <el-option label="下架" value="1"></el-option>
                    </el-select>
                </el-form-item>  
            </el-form>
            
        </div>
        <!-- <el-drawer
            title="运营员列表"
            :visible.sync="yyshow"
            direction="rtl"
            size="30%">
            <el-table  ref="yunyTable" :data="gridData" @selection-change="changeYylist">
                 <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column property="managerId" label="id" width="80"></el-table-column>
                <el-table-column property="managerName" label="姓名" ></el-table-column>
            </el-table>
        </el-drawer> -->
        <el-drawer
            title="学校列表"
            :visible.sync="schoolshow"
            direction="rtl"
            size="30%">
            <el-table  ref="yunyTable" :data="gridData1" @selection-change="changeSchoollist">
                <el-table-column property="id" label="id" width="80"></el-table-column>
                <el-table-column property="name" label="学校" ></el-table-column>
                <el-table-column property="siteName" label="操作">
                 <template slot-scope="scope">
                    <el-button @click="changeSchool(scope.row)" type="text" size="small">确定</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-drawer>
        <el-drawer
            title="站点列表"
            :visible.sync="zdshow"
            direction="rtl"
            size="40%">
            <div>
                <el-input placeholder="请输入站点名称" v-model="siteName" class="zdinput"></el-input>
                <el-button type="primary" @click="getSite()">搜索</el-button>
            </div>
            <el-table  ref="yunyTable" :data="gridData2">   "changezdlist"             
                <el-table-column property="siteId" label="id" width="80"></el-table-column>
                <el-table-column property="siteName" label="站点" ></el-table-column>
                
            </el-table>
        </el-drawer>

        <!-- 运行记录列表 -->
        <div class="table">
            <h3 class="cl">
                <span>预设线路列表</span>
                <el-button type="success" @click="addPreset()" plain>添加预设线路</el-button>
            </h3>
             <el-table
                :data="listData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="id"
                width="80">
                </el-table-column>
                 <el-table-column
                prop="name"
                label="线路名"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="schoolName"
                label="学校名称"
                width="200">                    
                </el-table-column>
                 <el-table-column
                prop="morningPrice"
                label="早接价格"
                width="100">
                  <template slot-scope="scope">
                        <p>{{scope.row.morningPrice}}元</p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="nightPrice"
                label="晚送价格"
                width="100">
                  <template slot-scope="scope">
                        <p>{{scope.row.morningPrice}}元</p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="wholePrice"
                label="全包价格"
                width="100">
                  <template slot-scope="scope">
                        <p>{{scope.row.morningPrice}}元</p>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="status"
                label="是否上架"
                width="130">
                  <template slot-scope="scope">
                       <div :class="scope.row.isShelf==0?'greentxt':''">
                           {{scope.row.shelf==1?'下架':'上架'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="closingDate"
                label="下架时间"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="num"
                label="报名人数"
                width="120" v-if="showMore">
                </el-table-column>
                <el-table-column
                prop="introduceProportion"
                label="介绍所得的比例"
                width="200">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
               >
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">查看/编辑</el-button>
                    <!-- <el-button type="text" size="small">编辑</el-button> -->
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="form.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            form:{
                schoolId:'',
                isShelf:'',
                pageNum:1,
                pageSize:10,
                name:''
            },
            userInfo:{},
            yyshow:false,
            zdshow:false,
            schoolshow:false,
            gridData:[],
            gridData1:[],
            gridData2:[],
            checkYy:[],//选中的运营员
            checkSchool:'',//选中的学校
            checkZd:[],//选中的站点
            value1:'',
            siteName:'',
            total:"",
            listData:[],
        }
    },
    created(){
        if(sessionStorage.userInfo){
            this.userInfo=JSON.parse(sessionStorage.userInfo)
        }
        // this.getManeger()    
        this.getSchool()
    },
    mounted(){       
        this.init()
    },
    methods:{
        handleSizeChange(val){
            console.log(val)
            this.form.pageSize=val
            this.form.pageNum=1
            this.init()
        },
        handleCurrentChange(val){
            this.form.pageNum=val
            this.init()
        },
        lookDetails(row){
            let id=row.id
            this.$router.push({
                name:"presetAdd",
                query:{
                    id:id
                }
            })
        },
        getManeger(){
            // this.yyshow=true
           this.$axios.post(this.$url+"mgManager/managerList",{
               managerId:this.userInfo.id
           }).then(res=>{
               if(res.code==100){
                   this.gridData=res.info    
                                 
               }
           })
        },
        getSchool(){
            this.$axios.post(this.$url+"mgManager/schoolList",{
               managerId:this.userInfo.id
           }).then(res=>{
               if(res.code==100){
                   this.gridData1=res.info    
                //    this.getSite()                   
               }
           })
        },
        getSite(){
            // 站点列表
             this.$axios.post(this.$url+"mgSite/siteList",{
               siteName:this.siteName
           }).then(res=>{
               if(res.code==100){
                   this.gridData2=res.info                    
               }
           })
        },
        changeYylist(val){
            // 运营员多选
            console.log(val)
            this.checkYy=val
        },
        changeSchool(val){
            // 学校多选
            // this.checkSchool=val
            console.log(val)
            this.form.schoolId=val.id
            this.checkSchool=val.name
            this.schoolshow=false
        },
        changezdlist(val){
            this.checkZd=val
        },
        getListStr(list,i){
             let str=""
            list.forEach((item,index)=>{
                let id=""
                if(i==1){
                    id=item.managerId  //获取运营的id
                }else{
                    console.log("站点站点")
                    id=item.siteId   //站点ID
                }
                if(index!=list.length-1){
                    str+=id+","
                }else{
                    str+=id
                }
            })
            return str
        },
        init(){
            console.log(this.value1)
            let data=this.form            
           data.managerId=this.userInfo.id // 运营员id
            console.log(data)
            this.$axios.post(this.$url+"mgProduct/list",data).then(res=>{
                if(res.code==100){
                    this.total=res.info.total
                    this.listData=res.info.rows
                }else if(res.code==250){
                   this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        addPreset(){
            // 添加预设线路
            this.$router.push({name:'presetAdd'})
        }
    }
}
</script>
<style lang="scss" scoped>
.searchbox{
    padding-bottom: 20px;
    .el-date-picker{
        margin: 0 10px;
    }
    >div{
        // float: left;
        display: inline-block;
        padding: 5px 10px;
        span{
            color:#ccc;
        }
    }
    .el-form{
        display: block;
        .el-form-item{
            float: left;
            width: 260px;
        }
        .el-form-item:last-child{
            width: initial;
        }

    }

}
.zdinput{
    width: 200px;
    margin: 0 10px;
}
.table{
    h3{
        color: #ccc;
        font-size: 16px;
        margin-bottom: 10px;
        >span{
            padding-left: 20px;
            border-left:3px solid #fb823c;
        }
        .el-button{
            float: right;
        }
    }
}
</style>