<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >运营员管理</el-breadcrumb-item>
        </el-breadcrumb>
         <div class="table">
            <h3 class="cl">
                <span>运营员</span>
                <el-button v-if="userInfo.isSuperAccount==1" type="success" @click="addOperate()" plain>添加</el-button>
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
                width="150">
                </el-table-column> 
                <el-table-column
                prop="account"
                label="账号"
                width="120">
                </el-table-column>             
                 <el-table-column
                prop="password"
                label="密码"
                width="100">
                </el-table-column>
                <el-table-column
                prop="idCard"
                label="身份证"
                width="150">
                </el-table-column>               
                 <el-table-column
                prop="sex"
                label="性别"
                width="50">
                <template slot-scope="scope">
                    <p>{{scope.row.sex==1?'男':'女'}}</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="age"
                label="年龄"
                width="50">   
                </el-table-column>                  
                <el-table-column
                prop="education"
                label="学历"
                 width="160"
                >                      
                </el-table-column>              
                <el-table-column
                prop="phone"
                label="电话"
                width="150"
                >                  
                </el-table-column>
                 <el-table-column
                prop="emergencyContact"
                label="紧急联系人"
                width="150"
                >                  
                </el-table-column>
                 <el-table-column
                prop="emergencyContactPhone"
                label="紧急联系电话"
                width="150"
                >                  
                </el-table-column>
                 <el-table-column
                prop="teacherCertification"
                label="是否有教师资格证"
                width="150"
                >   
                <template slot-scope="scope">
                    <p>{{scope.row.teacherCertification==1?'有':'没有'}}</p>
                </template>               
                </el-table-column>
                 <el-table-column
                prop="phone"
                label="省市区"
                width="150"
                >   
                 <template slot-scope="scope">
                    <p>{{(scope.row.province?scope.row.province.name:'')+(scope.row.city?scope.row.city.name:'')+(scope.row.area?scope.row.area.name:'')}}</p>
                </template>                
                </el-table-column>
                 <el-table-column
                prop="detailAddress"
                label="详细地址"
                width="150"
                >  
                                
                </el-table-column>
                 <el-table-column
                prop="isForbidden"
                label="是否禁用"
                width="150"
                >   
                <template slot-scope="scope">
                    <p>{{scope.row.isForbidden==1?'是':'否'}}</p>
                </template>               
                </el-table-column>
                 <el-table-column
                prop="isSuperAccount"
                label="是否为超级账号"
                width="150"
                >                  
                <template slot-scope="scope">
                    <p>{{scope.row.isSuperAccount==1?'是':'否'}}</p>
                </template>          
                </el-table-column>
                 <el-table-column
                prop="phone"
                label="头像"
                width="150"
                >      
                <template slot-scope="scope">
                    <img :src="$url+'file/readFile/'+scope.row.headUrl" alt="">
                </template>            
                </el-table-column>
                 <el-table-column
                prop="phone"
                label="电话"
                width="150"
                >                  
                </el-table-column>
                 <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">详情</el-button>
                    <!-- <el-button @click="deleteFee(scope.row)" type="text" size="small">删除</el-button> -->
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
            list:[],
            pageNum:1,
            pageSize:10,
            userInfo:{},
            total:''
        }
    },
    created(){
        this.userInfo=JSON.parse(sessionStorage.userInfo)
        this.init()
    },
    methods:{
        handleSizeChange(val){
            console.log(val)
            this.pageSize=val
            this.pageNum=1
            this.init()
        },
        handleCurrentChange(val){
            this.pageNum=val
            this.init()
        },
        init(){
            this.$axios.post(this.$url+"mgManager/listManager",{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                managerId:this.userInfo.id
            }).then(res=>{
                if(res.code==100){
                    this.total=res.info.total
                    this.list=res.info.rows
                }
            })
        },
        addOperate(){
            this.$router.push({
                name:'operateInfo',
            })
        },
        lookDetails(row){
            this.$router.push({
                name:'operateInfo',
                query:{
                    id:row.id
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>

</style>