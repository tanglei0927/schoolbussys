<template>
    <div class="page">
        <div class="searchbox cl">   
            <h3><span>筛选</span>
                <el-button type="primary" @click="searchIndex()">搜索</el-button>
                <el-button type="primary" @click="gof5()">清空</el-button>
            </h3>
           <!-- <div @click="yyshow=true">运营员：
               <span v-if="checkYy.length==0">全部</span>
               <span v-for="(item,index) in checkYy">{{item.managerName}}</span>
           </div> -->
           <div @click="schoolshow=true">学校：
               <span v-if="checkSchool.length==0">全部</span>
               <span v-for="(item,index) in checkSchool">{{item.name?item.name:''+" "}}</span>
           </div>
           <div @click="zdshow=true">途径站点：
               <span v-if="checkZd.length==0">全部</span>
               <span v-for="(item,index) in checkZd">{{item.siteName+" "}}</span>
           </div>
            <el-form class="cl"ref="form" :model="form" label-width="100px">
                <el-form-item label="安全员：">
                    <el-input placeholder="请输入安全员姓名" v-model="form.securityName"></el-input>
                </el-form-item>
                <el-form-item label="司机：">
                    <el-input placeholder="请输入司机姓名" v-model="form.driverName"></el-input>
                </el-form-item> 
                <el-form-item label="车牌：">
                    <el-input placeholder="请输入车牌" v-model="form.vehicleCard"></el-input>
                </el-form-item>   
                 <!-- <el-form-item label="途径站点：">
                    <el-input placeholder="请输入途径站点"></el-input>
                </el-form-item>     -->
                <el-form-item label="线路状态：">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="结束" value="0"></el-option>
                        <el-option label="正在运行" value="1"></el-option>
                    </el-select>
                </el-form-item>     
                <el-form-item label="线路类型：">
                    <el-select v-model="form.lineType" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="早" value="1"></el-option>
                        <el-option label="晚" value="2"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="时间:">
                <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>  
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
                 <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column property="id" label="id" width="80"></el-table-column>
                <el-table-column property="name" label="学校" ></el-table-column>
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
            <el-table  ref="yunyTable" :data="gridData2" @selection-change="changezdlist">
                 <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column property="siteId" label="id" width="80"></el-table-column>
                <el-table-column property="siteName" label="站点" ></el-table-column>               
            </el-table>
        </el-drawer>

        <!-- 运行记录列表 -->
        <div class="table">
            <h3 class="cl">
                <span>运行记录</span>
                <el-button type="primary" @click="showMore=!showMore">{{showMore?'收起更多':'查看更多'}}</el-button>
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
                prop="manager"
                label="运营员"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="lineName"
                label="线路名"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="lineType"
                label="线路类型"
                width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.lineType==1?'早':'晚'}}</p>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="status"
                label="发车状态"
                width="100">
                  <template slot-scope="scope">
                        <p :style="scope.row.status==1?'color:green;':'color:red;'">{{scope.row.status==1?'开启':'结束'}}</p>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="status"
                label="车内状况"
                width="130">
                  <template slot-scope="scope">
                       <div>
                           <p><span>预计：</span>{{scope.row.shouldNumber}}人</p>
                           <p><span>上车人数：</span>{{scope.row.alreadyNumber}}</p>
                           <p><span>车内人数：</span>{{scope.row.inNumber}}</p>
                           <p><span>异常人数：</span>{{scope.row.abnormalNumber}}</p>
                       </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="securityName"
                label="车牌"
                width="120" v-if="showMore">
                </el-table-column>
                 <el-table-column
                prop="securityName"
                label="司机"
                width="120" v-if="showMore">
                </el-table-column>
                 <el-table-column
                prop="securityName"
                label="安全员"
                width="120" v-if="showMore">
                </el-table-column>
                <el-table-column
                prop="schoolName"
                label="学校"
                width="200">
                </el-table-column>
               <el-table-column
                prop="startTime"
                label="开始时间"
                width="200">
                </el-table-column>
                <el-table-column
                prop="endTime"
                label="结束时间"
                width="200">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
               >
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">查看详情</el-button>
                    <!-- <el-button type="text" size="small">编辑</el-button> -->
                    <el-button type="text" @click="lookReport(scope.row)" size="small">安全报告</el-button>
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
                status:'',
                lineType:'',
                pageNum:1,
                pageSize:10,
                vehicleCard:'',
                driverName:'',
                securityName:'',
            },
            userInfo:{},
            yyshow:false,
            zdshow:false,
            schoolshow:false,
            gridData:[],
            gridData1:[],
            gridData2:[],
            checkYy:[],//选中的运营员
            checkSchool:[],//选中的学校
            checkZd:[],//选中的站点
            value1:'',
            siteName:'',
            total:"",
            listData:[],
            showMore:false
        }
    },
    created(){
        if(sessionStorage.userInfo){
            this.userInfo=JSON.parse(sessionStorage.userInfo)
        }
        console.log(this.$route)
        if(this.$route.query.childId){
            this.form.childrenId=this.$route.query.childId
        }
        if(this.$route.query.lineId){
            this.form.lineId=this.$route.query.lineId
        }
        // this.getManeger()    
        this.getSchool()
    },
    mounted(){       
        this.searchIndex()
    },
    methods:{
        handleSizeChange(val){
            console.log(val)
            this.form.pageSize=val
            this.form.pageNum=1
            this.searchIndex()
        },
        handleCurrentChange(val){
            this.form.pageNum=val
            this.searchIndex()
        },
        lookDetails(row){
            let id=row.id
            this.$router.push({
                name:"rundetails",
                query:{
                    id:id
                },
                params:row
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
                   this.getSite()                   
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
        changeSchoollist(val){
            // 学校多选
            this.checkSchool=val
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
        searchIndex(){
            console.log(this.value1)
            let data=this.form
            if(this.value1){
                data.start=this.$untils.getDate(this.value1[0])
                data.end=this.$untils.getDate(this.value1[1])
            }else{
                data.start=""
                data.end=""
            }
           data.managetId=this.userInfo.id // 运营员id
            data.siteIds=this.getListStr(this.checkZd,3)
            data.schoolIds=this.getListStr(this.checkSchool,2)
            console.log(data)
            this.$axios.post(this.$url+"mgLineRecord/list",data).then(res=>{
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
        gof5(){
            // 刷新
            if(this.form.childrenId||this.form.lineId){
                 this.$router.push({name:'run'})
            }else{
                this.form={
                status:'',
                lineType:'',
                pageNum:1,
                pageSize:10,
                vehicleCard:'',
                driverName:'',
                securityName:'',
             }
             this.searchIndex()
            }
            
        },
          lookReport(row){
            // 查看安全报告
            this.$router.push({name:'report',query:{id:row.id}})
        },
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