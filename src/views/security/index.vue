<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >安全员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox">
            <h3><span>筛选</span>
            <el-button type="success" @click="init()" plain>搜索</el-button>
            </h3>
            <div class="schoolbox" @click="checkSchoolShow()">学校：
                 <span>{{schoolName?schoolName:'请选择'}}</span>
           </div>
            <el-form class="cl" ref="form" :model="form" label-width="100px">                
                <el-form-item label="是否禁用">
                    <el-select v-model="form.isForbidden" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="不禁用" value="0"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                    </el-select>
                </el-form-item>  
                <el-form-item label="安全员">
                  <el-input placeholder="请输入安全员姓名" v-model="form.name"></el-input>
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
         <el-drawer
            title="学校列表"
            :visible.sync="schoolshow"
            direction="rtl"
            size="50%">
            <el-input v-model="schoolStr" placeholder="请输入学校名称"></el-input>
            <el-button type="success" @click="getSchool()" plain>搜索</el-button>
            <el-table  ref="yunyTable" :data="gridData1">
                <el-table-column property="id" label="id" width="80"></el-table-column>
                <el-table-column property="name" label="学校" ></el-table-column>
                <el-table-column property="name" label="操作">
                 <template slot-scope="scope">
                    <el-button @click="changeSchool(scope.row)" type="text" size="small">确定</el-button>
                </template>
                </el-table-column>
            </el-table>
             <div class="block">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page.sync="pageNum1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="schooltotal">
                </el-pagination>
            </div>
        </el-drawer>

        <div class="table">
            <h3 class="cl">
                <span>安全员列表</span>
                <el-button type="success" @click="goAdd()" plain>添加</el-button>
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
                prop="birthday"
                label="出生日期"
                width="100">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="电话"
                width="110">
                </el-table-column>                 
                <el-table-column
                prop="schoolName"
                label="学校"
                width="150">
                </el-table-column>
                <el-table-column
                prop="education"
                label="学历"
                width="80">
                </el-table-column>
                 <el-table-column
                prop="sex"
                label="性别"
                width="100">
                  <template slot-scope="scope">
                    <p>{{scope.row.sex==1?'男':'女'}}</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="isForbidden"
                label="是否禁用"
                width="100">
                <template slot-scope="scope">
                    <p>{{scope.row.status==1?'禁用':'不禁用'}}</p>
                </template>
                </el-table-column>
                 <el-table-column
                prop="idCard"
                label="身份证"
                width="200">                  
                </el-table-column>      
                <el-table-column
                prop="area"
                label="地址"
                width="150"> 
                <template slot-scope="scope">
                    <p>{{scope.row.province.name}}{{scope.row.city.name}}{{scope.row.area.name}}</p>
                </template> 
                </el-table-column>  
                <el-table-column
                prop="area"
                label="详细地址"
                width="150"> 
                <template slot-scope="scope">
                    <p>{{scope.row.street+scope.row.village+scope.row.houseNumber}}</p>
                </template>                  
                </el-table-column>              
                 <el-table-column
                prop="emergencyContact"
                label="紧急联系人"
                width="100">                  
                </el-table-column>
                <el-table-column
                prop="emergencyContactPhone"
                label="紧急联系人电话"
                width="120">                  
                </el-table-column>
                <el-table-column
                prop="area"
                label="是否有教师资格证"
                width="150"> 
                <template slot-scope="scope">
                    <p>{{scope.row.teacherCertification?'有':'没有'}}</p>
                </template>                  
                </el-table-column> 
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">详情</el-button>
                    <!-- <el-button @click="deleteCar(scope.row)" type="text" size="small">删除</el-button> -->
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
             this.getSchool()
        },
        handleCurrentChange(val){
            this.form.pageNum=val
             this.init()
        },
        handleSizeChange1(val){
            console.log(val)
            this.pageSize1=val
            this.pageNum1=1
             this.getSchool()
        },
        handleCurrentChange1(val){
            this.pageNum1=val
             this.getSchool()
        },
        getSchool(){//获取学校列表
            this.$axios.post(this.$url+"mgSchool/list",{
               managetId:this.userInfo.id,
               schoolName:this.schoolStr,
               pageNum:this.pageNum1,
               pageSize:this.pageSize1
           }).then(res=>{
               if(res.code==100){
                   this.gridData1=res.info.rows
                   this.schooltotal=res.info.total   
                //    this.getSite()                   
               }
           })
        },
        checkSchoolShow(){
            // 显示学校列表
            this.getSchool()
            this.schoolshow=true
        },
        changeSchool(row){
            this.form.schoolId=row.id
            this.schoolName=row.name
            this.schoolshow=false
        },
        init(){
            let data={}
            data=this.form
            if(this.value1){
                data.start=this.$untils.getDate(this.value1[0])
                data.end=this.$untils.getDate(this.value1[1])
            }
            this.$axios.post(this.$url+"mgSecurity/list",data).then(res=>{
                if(res.code==100){
                    this.list=res.info.rows
                    this.total=res.info.total
                }
            })
            
        },
        goAdd(){
            this.$router.push({name:'securityInfo'})
        },
        lookDetails(row){
            this.$router.push({name:'securityInfo',query:{id:row.id}})
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
.searchbox{
	padding-bottom: 20px;
}
</style>