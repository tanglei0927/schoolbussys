<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >信息反馈</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox">
            <h3><span>筛选</span>
            </h3>          
            <el-form class="cl" ref="form" :model="form" label-width="120px">                
                 <el-form-item label="学校是否已录入">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="没有录入" value="0"></el-option>
                        <el-option label="已录入" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学校名称：">
                  <el-input placeholder="请输入学校名称" v-model="form.name"></el-input>
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
                <el-button type="success" @click="init()" plain>搜索</el-button>
            </el-form>
        </div>

        <div class="table">
            <h3 class="cl">
                <span>反馈信息</span>
                <!-- <el-button v-if="userInfo.isSuperAccount!=1" type="success" @click="addMsgShow=true" plain>群发消息</el-button> -->
            </h3>
             <el-table
                :data="list"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="id"
                width="80">
                </el-table-column>
                <el-table-column
                prop="schoolName"
                label="学校名"
                width="120">
                </el-table-column>                
                <el-table-column
                prop="status"
                label="学校是否已录入"
                width="150">
                    <template slot-scope="scope">
                        <p>{{scope.row.status==0?'未录入':'已录入'}}</p>
                    </template>
                </el-table-column>               
                 <el-table-column
                prop="parentName"
                label="家长"
                width="100">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="电话"
                width="150">
                </el-table-column>               
                 <el-table-column
                prop="childrenName"
                label="学生"
                width="100">
                </el-table-column>
                <el-table-column
                prop="state"
                label="班级"
                width="100">
                <template slot-scope="scope">
                    <p>{{(scope.row.grade?scope.row.grade+"年级":'')+(scope.row.clazz?scope.row.clazz+"班":'')}}</p>
                </template>   
                </el-table-column>                  
                <el-table-column
                prop="detailAddreee"
                label="详细地址"
                 width="160"
                >                      
                </el-table-column>              
                <el-table-column
                prop="createTime"
                label="创建时间"
                width="150"
                >                  
                </el-table-column>
                 <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">查看定位</el-button>
                    <el-button @click="deleteFee(scope.row)" type="text" size="small">删除</el-button>
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
        
    
<!-- 群发消息 -->
        <div class="shadow" v-if="addMsgShow">
            <div class="addbox">
                <h3>学校位置
                     <i @click="addMsgShow=false" class="el-icon-close"></i>
                </h3>
                <Mapmarker :lngs="lngs" />                
                <div class="btns">
                    <el-button type="success" @click="addMsgShow=false" plain>确定</el-button>
                   <!-- <el-button type="warning" @click="" plain>取消</el-button> -->
                </div>
            </div>
        </div>

     </div>
</template>
<script>
import Mapmarker from "../../components/showmap"

export default {
    components:{Mapmarker},
    data(){
        return{
            form:{
                pageNum:1,
                pageSize:10,
                status:null,//状态  0没录入  1已录入
                start:"",
                end:"",
                name:""
            },
            value1:"",
            schoolshow:false,
            pageNum1:1,
            pageSize1:10,
            total:null,
            schooltotal:null,
            schoolStr:'',
            schoolName:'',
            userInfo:{},
            gridData1:[],
            list:[],
            msgInfo:{},
            examineShow:false,
            addMsgShow:false,
            addInfo:{},
            schoolName2:"",
            lngs:[]
        }
    },
    created(){
        this.userInfo=JSON.parse(sessionStorage.userInfo)
        // this.form.managerId=this.userInfo.id
        this.init()
    },
    methods:{
        handleSizeChange(val){
            console.log(val)
            this.form.pageSize=val
            this.form.pageNum=1
            //  this.getSchool()
            this.init()
        },
        handleCurrentChange(val){
            this.form.pageNum=val
             this.init()
        },
        init(){
            let data={}
            data=this.form
            if(this.value1){
                data.start=this.$untils.getDate(this.value1[0])
                data.end=this.$untils.getDate(this.value1[1])
            }
            this.$axios.post(this.$url+"mgFeedback/list",data).then(res=>{
                if(res.code==100){
                    this.list=res.info.rows
                    this.total=res.info.total
                }else{

                }
            })
            
        },
       lookDetails(row){
           this.$axios.post(this.$url+"mgFeedback/detail",{
               id:row.id
           }).then(res=>{
               if(res.code==100){
                    this.addMsgShow=true
                    this.lngs[0]=res.info.longitude
                    this.lngs[1]=res.info.latitude
               }
           })           
       },
       deleteFee(row){
            this.$confirm('是否要删除'+row.schoolName+'的反馈信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios.post(this.$url+"mgFeedback/delete",{
                        id:row.id
                    }).then(res=>{
                        if(res.code==100){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.init()
                        }
                    })
              
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
       }
    }
}
</script>
<style lang="scss" scoped>

.el-form-item{
    display: inline-block;
}
.schoolbox{
    padding:10px;
    span{
        color:#999;
    }
}
.exaboxs{
    width: 300px;
    height: 200px;
    text-align: center;
    .el-select{
        margin-top: 20px;
    }
    .el-button{
        margin-top: 50px;
        width: 100px;
    }
}
.addbox{
    width: 400px;
    height: 360px;
    .el-form{
        margin-top: 20px;
        .el-form-item{
            display: block;
            margin: 0;
            .el-textarea{
                height: 100px;
            }
        }
    }
    .btns{
        text-align: center;
    }
}
</style>