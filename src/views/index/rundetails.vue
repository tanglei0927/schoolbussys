<template>
    <div class="page">
        <!-- 面包屑 -->        
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'run' }">运行详情</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'rundetails' }">单次详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox cl">
            <h3><span>筛选</span>
            </h3>
             <el-form class="cl"ref="form" :model="form" label-width="100px">                
                  <el-form-item label="学校：">
                   <el-input placeholder="" disabled="" v-model="lineInfo.schoolName"></el-input>
                </el-form-item>
                <el-form-item label="学生姓名：">
                   <el-input placeholder="请输入学生姓名" v-model="form.childrenName"></el-input>
                </el-form-item>
                <el-button type="primary" @click="getStatic()">确认</el-button>
            </el-form>
        </div>
        <div class="searchbox cl">
            <h3><span>详情 &nbsp;&nbsp;{{" "+date}}</span>
                <!-- <el-button type="primary" @click="showMore=!showMore">{{showMore?'收起更多':'查看更多'}}</el-button> -->
            </h3>
            <div class="info cl">
                <p><span>开始时间：</span>{{lineInfo.startTime}}</p>
                <p><span>结束时间：</span></span>{{lineInfo.endTime}}</p>
                <p><span>当前状态：</span>{{lineInfo.lineName}}</p>
                <p><span>线路状态：</span>{{lineInfo.lineType==1?'早':'晚'}}</p>
            </div>
            <div class="info cl">
                <p><span>车牌号：</span>{{lineInfo.vehicleCard}}</p>
                <p><span>司机名：</span>{{lineInfo.driverName}}</p>
                <p><span>安全员名：</span>{{lineInfo.securityName}}</p>
                <!-- <p><span>运营员名：</span>{{lineInfo.manager}}</p> -->
            </div>
        </div>
        <!-- 学生列表 -->
         <div class="table">
             <el-table
                :data="listData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="序号"
                width="80">
                </el-table-column>
                 <el-table-column
                prop="grade"
                label="班级"
                width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.grade+'年级'}}{{scope.row.clazz?scope.row.clazz+"班":''}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="childrenName"
                label="学生"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="boardSiteName"
                label="上车信息"
                width="150">
                 <template slot-scope="scope">
                        <p>{{scope.row.boardTime?scope.row.boardTime+"在":''}}{{scope.row.boardSiteName?scope.row.boardSiteName+"站点上车":''}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="takeSiteName"
                label="下车信息"
                width="150">
                 <template slot-scope="scope">
                        <p>{{scope.row.takeTime?scope.row.takeTime+"在":''}}{{scope.row.takeSiteName?scope.row.takeSiteName+"站点下车":''}}</p>
                    </template>
                </el-table-column>
               <!--  <el-table-column
                prop="isInAbnormal"
                label="上车行程"
                width="100">
                    <template slot-scope="scope">
                        <p>
                            <span v-if="scope.row.isInAbnormal==1" style="color:red;">上车异常</span>
                            <span v-if="scope.row.isInAbnormal==2" style="color:red;">未上车</span>
                            <span v-if="scope.row.isInAbnormal==0" style="color:green;">无异常</span>
                            <span v-if="scope.row.isInAbnormal==3">请假</span>
                        </p>
                    </template>
                </el-table-column>     
				<el-table-column
				prop="isOutnAbnormal"
				label="下车行程"
				width="100">
				    <template slot-scope="scope">
				        <p>
				            <span v-if="scope.row.isOutnAbnormal==1" style="color:red;">上车异常</span>
				            <span v-if="scope.row.isOutnAbnormal==2" style="color:red;">未上车</span>
				            <span v-if="scope.row.isOutnAbnormal==0" style="color:green;">无异常</span>
				            <span v-if="scope.row.isOutnAbnormal==3">请假</span>
				        </p>
				    </template>
				</el-table-column>  -->
                 <el-table-column
                prop="status"
                label="乘车状态"
               >
                  <template slot-scope="scope">
                       <div>
                           <p v-if="scope.row.status==0">没问题</p>
                           <p v-if="scope.row.status==1" class="redtxt">打闹离座</p>
                           <p v-if="scope.row.status==2" class="redtxt">携带危险物品</p>
                           <p v-if="scope.row.status==3">{{scope.row.otherReson}}</p>
                       </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="parentName"
                label="家长名"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="phone"
                label="家长联系方式"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="detailAddreee"
                label="家庭住所"
                width="120">
                </el-table-column>   
                <el-table-column label="操作" fixed="right" >
                    <template slot-scope="scope">
                        <el-button type="text" @click="lookReport(scope.row)" size="small">安全报告</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNum"
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
                childrenName:''
            },
            date:"",
            listData:[],
            lineId:null,
            pageNum:1,
            pageSize:10,
            total:"",
            showMore:false,
            lineInfo:{}
        }
    },
    created(){
         console.log("获取id")
        console.log(this.$route)
        this.lineId=this.$route.query.id
        this.lineInfo=this.$route.params
        let date=this.lineInfo.startTime.split("日")
        this.date=date[0]+"日"
        this.lineInfo.startTime=date[1]
       let date2=this.lineInfo.endTime.split("日")
       this.lineInfo.endTime=date2[1]
    },
    mounted(){       
        this.init()
    },
    methods:{
         handleSizeChange(val){
            console.log(val)
            this.pageSize=val
            this.pageNum=1
            this.searchIndex()
        },
        handleCurrentChange(val){
            this.pageNum=val
            this.searchIndex()
        },
        init(){
            this.$axios.post(this.$url+"mgLineRecord/detail",{
                childrenName:this.form.childrenName,
                lineRecordId:this.lineId,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then(res=>{
                if(res.code==100){
                    this.listData=res.info.rows
                    this.total=res.info.total
                }
            })
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
    padding-bottom: 10px;
}
.el-form{
    .el-form-item{
        width: 300px;
        float: left;
    }
}
.info{
    padding:0 10px;
    p{
        width: 25%;
        float: left;
        line-height: 40px;
        span{
            display: inline-block;
            width: 80px;
        }
    }
}
.redtxt{
    color:red;
}
</style>