<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >司机管理</el-breadcrumb-item>
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
                <el-form-item label="名称">
                  <el-input placeholder="请输入司机姓名" v-model="form.name"></el-input>
                </el-form-item>  

            </el-form>
        </div>
         
        <School :show="schoolshow" @changeToSchool="changeToSchool" />

        <div class="table">
            <h3 class="cl">
                <span>司机列表</span>
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
                prop="driveAge"
                label="驾龄"
                width="120">                  
                </el-table-column>
                <el-table-column
                prop="driveCardId"
                label="驾驶证号"
                width="120">                  
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
                prop="area"
                label="地址"
                width="150"> 
                <template slot-scope="scope">
                    <p>{{scope.row.province.name}}{{scope.row.city.name}}{{scope.row.area.name}}</p>
                </template> 
                </el-table-column>  
                <el-table-column
                prop="detailAddreee"
                label="详细地址"
                width="150">                  
                </el-table-column>              
                 <el-table-column
                prop="emergencyContact"
                label="紧急联系人"
                width="100">                  
                </el-table-column>
                <el-table-column
                prop="emergencyPhone"
                label="紧急联系人电话"
                width="120">                  
                </el-table-column>                
                <el-table-column
                prop="isHaveAccident"
                label="是否发生过重大交通事故"
                width="150"> 
                <template slot-scope="scope">
                    <p>{{scope.row.isHaveAccident?'有':'没有'}}</p>
                </template>                  
                </el-table-column> 
                 <el-table-column
                prop="illegal"
                label="是否有违法行为"
                width="150"> 
                <template slot-scope="scope">
                    <p>{{scope.row.illegal?'有':'没有'}}</p>
                </template>                  
                </el-table-column> 
                <el-table-column
                prop="createTime"
                label="创建时间"
                width="120">                  
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">详情</el-button>
                    <el-button @click="deleteDrivers(scope.row)" type="text" size="small">删除</el-button>
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
            if(this.value1){
                data.start=this.$untils.getDate(this.value1[0])
                data.end=this.$untils.getDate(this.value1[1])
            }
            this.$axios.post(this.$url+"mgDriver/list",data).then(res=>{
                if(res.code==100){
                    this.list=res.info.rows
                    this.total=res.info.total
                }
            })
            
        },
        goAdd(){
            this.$router.push({name:'driversInfo'})
        },
        lookDetails(row){
            this.$router.push({name:'driversInfo',query:{id:row.id}})
        },
       deleteDrivers(row){
            this.$confirm('是否要删除司机：'+row.name+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios.post(this.$url+"mgDriver/delete",{
                        id:row.id
                    }).then(res=>{
                        if(res.code==100){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.init()
                        }else if(res.code==250){
                             this.$message({
                                type: 'warning',
                                message: res.mssg
                            });
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
</style>