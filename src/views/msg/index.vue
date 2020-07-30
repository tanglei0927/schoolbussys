<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >消息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox">
            <h3><span>筛选</span>
            <el-button type="success" @click="init()" plain>搜索</el-button>
            </h3>
            <div class="schoolbox" @click="checkSchoolShow()">学校：
                 <span>{{schoolName?schoolName:'请选择'}}</span>
           </div>
            <el-form class="cl" ref="form" :model="form" label-width="100px">                
                <el-form-item label="消息类型">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="家长投诉" value="1"></el-option>
                        <el-option label="请假" value="2"></el-option>
                        <el-option label="回复" value="3"></el-option>
                        <el-option label="安全员群发" value="4"></el-option>
                    </el-select>
                </el-form-item>  
                 <el-form-item label="审核状态">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="通过审核" value="1"></el-option>
                        <el-option label="审核中" value="2"></el-option>
                        <el-option label="未通过" value="0"></el-option>
                    </el-select>
                </el-form-item>
               <el-form-item label="发送人身份">
                    <el-select v-model="form.sendType" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="家长" value="1"></el-option>
                        <el-option label="安全员" value="2"></el-option>
                        <el-option label="后台运营员" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发送人">
                  <el-input placeholder="请输入发送人姓名" v-model="form.sendName"></el-input>
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

        <div class="table">
            <h3 class="cl">
                <span>消息列表</span>
                <el-button v-if="userInfo.isSuperAccount!=1" type="success" @click="addMsgShow=true" plain>群发消息</el-button>
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
                prop="type"
                label="类型"
                width="80">
                 <template slot-scope="scope">
                    <p>{{scope.row.type==1?'家长投诉':(scope.row.type==2?'请假':(scope.row.type==3?'回复':(scope.row.type==4?'安全员群发':'运营员群发')))}}</p>
                </template>
                </el-table-column>                
                <el-table-column
                prop="launchName"
                label="发送人"
                width="150">
                </el-table-column>               
                 <el-table-column
                prop="launchType"
                label="发送人身份"
                width="100">
                  <template slot-scope="scope">
                    <p>{{scope.row.launchType==1?'家长':(scope.row.launchType==2?'安全员':'运营员')}}</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="receiveName"
                label="接收人"
                width="150">
                </el-table-column>               
                 <el-table-column
                prop="receiveType"
                label="接收人身份"
                width="100">
                  <template slot-scope="scope">
                    <p>{{scope.row.launchType==1?'家长':'安全员'}}</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态"
                width="100">
                <template slot-scope="scope">
                    <p>{{scope.row.state==1?'已读':(scope.row.state==2?'已回复':'未读')}}</p>
                </template>   
                </el-table-column>                  
                <el-table-column
                prop="examine"
                label="审核状态"
                 width="160"
                >     
                 <template slot-scope="scope">
                    <p :class="scope.row.examine==2?'redtxt':''">{{scope.row.examine==1?'审核通过':(scope.row.examine==2?'审核中':'审核未通过')}}</p>
                    <!-- <el-select v-model="scope.row.examine" placeholder="请选择">
                        <el-option label="通过审核" :value="1"></el-option>
                        <el-option label="审核中" :value="2"></el-option>
                        <el-option label="未通过" :value="0"></el-option>
                    </el-select> -->
                </template>                  
                </el-table-column>
                <el-table-column
                prop="content"
                label="内容"
                width="200"> 
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
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">详情</el-button>
                    <el-button @click="changeExamine(scope.row)" type="text" size="small">审核</el-button>
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

        <School :show="schoolshow" @changeToSchool="changeToSchool" />
        
        <!-- 审核状态更改 -->
        <div class="shadow" v-if="examineShow">
            <div class="exaboxs">
                <h3>更改状态
                     <i @click="examineShow=false" class="el-icon-close"></i>
                </h3>
                 <el-select v-model="msgInfo.examine" placeholder="请选择">
                        <el-option label="通过审核" :value="1"></el-option>
                        <el-option label="审核中" :value="2"></el-option>
                        <el-option label="未通过" :value="0"></el-option>
                </el-select>
                <div class="btns">
                     <el-button type="success" @click="changeToE()" plain>确定</el-button>
                     <el-button type="warning" @click="examineShow=false" plain>取消</el-button>
                </div>
            </div>
        </div>
<!-- 群发消息 -->
        <div class="shadow" v-if="addMsgShow">
            <div class="addbox">
                <h3>群发消息
                     <i @click="addMsgShow=false" class="el-icon-close"></i>
                </h3>
                <el-form ref="form" :model="addInfo" label-width="80px">
                    <el-form-item label="学校：">
                        <span>
                            {{schoolName2}}
                        </span>
                     <el-button @click="schoolshow=true" type="text" size="small">选择学校</el-button>
                    </el-form-item>
                     <el-form-item label="类型：">
                        <el-radio-group v-model="addInfo.type">
                            <el-radio label="1">家长</el-radio>
                            <el-radio label="2">安全员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="内容：">
                        <el-input type="textarea" v-model="addInfo.content"></el-input>
                    </el-form-item>
                </el-form>
                <div class="btns">
                    <el-button type="success" @click="isOk()" plain>确定</el-button>
                   <el-button type="warning" @click="addMsgShow=false" plain>取消</el-button>
                </div>
            </div>
        </div>

     </div>
</template>
<script>
import School from "../../components/school"

export default {
    components:{School},
    data(){
        return{
            form:{
                pageNum:1,
                pageSize:10,
                managerId:null,
                schoolId:null,
                status:null,//状态  1：未支付  2支付中 3支付完成
                start:"",
                end:"",
                sendName:'',
                sendType:'',
                type:''
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
            schoolName2:""
        }
    },
    created(){
        this.userInfo=JSON.parse(sessionStorage.userInfo)
        this.form.managerId=this.userInfo.id
        this.init()
    },
    methods:{
        handleSizeChange(val){
            console.log(val)
            this.form.pageSize=val
            this.form.pageNum=1
             this.getSchool()
        },
        handleCurrentChange(val){
            this.form.pageNum=val
             this.init()
        },
         changeToSchool(data){
            console.log("选择学校")
            console.log(data)
            if(this.addMsgShow){
                this.schoolName2=data.name
                this.addInfo.schoolId=data.id
            }else{
                this.form.schoolId=data.id
                this.schoolName=data.name
            }           
             this.schoolshow=false

        },       
        checkSchoolShow(){
            // 显示学校列表
            // this.getSchool()
            this.schoolshow=true
            console.log("学校显示显示")
        },
        init(){
            let data={}
            data=this.form
            if(this.value1){
                data.start=this.$untils.getDate(this.value1[0])
                data.end=this.$untils.getDate(this.value1[1])
            }
            this.$axios.post(this.$url+"mgNews/list",data).then(res=>{
                if(res.code==100){
                    this.list=res.info.rows
                    this.total=res.info.total
                }else if(res.code==200){
                    this.$message({
                        message:"状态更改失败",
                        type:"error"
                    })
                }
            })
            
        },
       changeExamine(row){
           let data=JSON.stringify(row)
           this.msgInfo=JSON.parse(data)
           this.examineShow=true
       },
       changeToE(){
        //    更改审核状态
            this.$axios.post(this.$url+"mgNews/updateExamine",{
                id:this.msgInfo.id,
                examine:this.msgInfo.examine
            }).then(res=>{             
             if(res.code==100){
                 this.$message({
                     message:"更改成功!",
                     type:"success"
                 })
                 this.examineShow=false
                 this.init()
             }
            })
       },
       lookDetails(row){
           this.$router.push({name:'msginfo',query:{id:row.id}})
       },
       isOk(){
           this.addInfo.managerId=this.userInfo.id
           this.$axios.post(this.$url+"mgNews/add",this.addInfo).then(res=>{
               if(res.code==100){
                   this.$message({
                       message:"发送成功"
                   })
                   this.addMsgShow=false
                   this.init()
               }
           })
       },
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
    height: 340px;
	// top: 50px !important;
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
.searchbox{
	padding: 20px 0;
}
.table{
	h3{
		margin-bottom: 20px;
	}
}
</style>