<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >学生管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox">
            <h3><span>筛选</span>
            <el-button type="success" @click="init()" plain>搜索</el-button>
            </h3>
            <div class="schoolbox" @click="checkSchoolShow()">学校：
                 <span>{{schoolName?schoolName:'请选择'}}</span>
           </div>
            <el-form class="cl" ref="form" :model="form" label-width="100px">                
                <el-form-item label="学生">
                  <el-input placeholder="请输入学生姓名" v-model="form.name"></el-input>   
                </el-form-item>  
                <el-form-item label="家长">
                  <el-input placeholder="请输入家长姓名" v-model="form.parentName"></el-input>
                </el-form-item>  
                <el-form-item label="年级">
                    <el-select v-model="form.grade" placeholder="请选择年级" @change="changeProvince">
                        <el-option label="全部" value=""></el-option>                  
                        <el-option label="一年级" value="1"></el-option>                  
                        <el-option label="二年级" value="2"></el-option>                  
                        <el-option label="三年级" value="3"></el-option>                  
                        <el-option label="四年级" value="4"></el-option>                  
                        <el-option label="五年级" value="5"></el-option>                  
                        <el-option label="六年级" value="6"></el-option>                  
                    </el-select> 
                </el-form-item>
                <el-form-item label="班级">
                  <el-input placeholder="请输入班级" v-model="form.clazz"></el-input>
                </el-form-item> 
            </el-form>
        </div>
         
        <School :show="schoolshow" @changeToSchool="changeToSchool" />

        <div class="table">
            <h3 class="cl">
                <span学生列表</span>
                <!-- <el-button type="success" @click="goAdd()" plain>添加</el-button> -->
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
                prop="name"
                label="姓名"
                width="80">
                </el-table-column>
                <el-table-column
                prop="sex"
                label="性别"
                width="80"> 
                <template slot-scope="scope">
                    <p>{{scope.row.sex==1?'男':'女'}}</p>
                </template>                 
                </el-table-column>  
                <el-table-column
                prop="schoolName"
                label="学校"
                width="100">
                </el-table-column> 
                <el-table-column
                prop="sex"
                label="班级"
                width="80"> 
                <template slot-scope="scope">
                    <p>{{scope.row.grade+"年级"}}{{scope.row.clazz+"班"}}</p>
                </template> 
                </el-table-column> 
                <el-table-column
                prop="birthDate"
                label="出生日期"
                width="100">
                </el-table-column>
                <el-table-column
                prop="parentName"
                label="家长"
                width="100">
                </el-table-column>
                <el-table-column
                prop="siteName"
                label="站点"
                width="150"> 
                </el-table-column>  
                <el-table-column
                prop="closeDate"
                label="有效期"
                width="200">                  
                </el-table-column> 
                <el-table-column
                prop="photo"
                label="头像"
                width="150"> 
                <template slot-scope="scope">
                    <img :src="$url+'eaOss/download/'+scope.row.photo" alt="">
                </template> 
                </el-table-column>  
                <el-table-column
                prop="haveFaceRecognitionIdentification"
                label="人脸识别是否录入">  
                  <template slot-scope="scope">
                      <P>{{scope.row.haveFaceRecognitionIdentification==1?'已录入':"未录入"}}</P>
                </template>                
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">详情</el-button>
                    <el-button @click="lineRunDtails(scope.row)" type="text" size="small">线路运行记录</el-button>
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
                status:null,//状态  1在职  0不在职
                start:"",
                end:""
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
            list:[]
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
            this.init()
        },
        handleCurrentChange(val){
            this.form.pageNum=val
             this.init()
        },
        changeToSchool(data){
            console.log("选择学校")
            console.log(data)
            this.form.schoolId=data.id
            this.schoolName=data.name
            this.schoolshow=false
        },
         checkSchoolShow(){
            // 显示学校列表
            // this.getSchool()
            this.schoolshow=true
        },
        init(){
            let data={}
            data=this.form
            this.$axios.post(this.$url+"mgChildren/list",data).then(res=>{
                if(res.code==100){
                    this.list=res.info.rows
                    this.total=res.info.total
                }
            })
            
        },
        goAdd(){
            this.$router.push({name:'childreninfo'})
        },
        lookDetails(row){
            this.$router.push({name:'childreninfo',query:{id:row.id}})
        },
        lineRunDtails(row){
            // 线路运行记录
            this.$router.push({name:"run",query:{childId:row.id}})
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
.el-table{
    img{
        width: 100px;
		// height: 100px;
    }
}
</style>