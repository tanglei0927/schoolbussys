<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >订单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox">
            <h3><span>筛选</span>
            <el-button type="success" @click="init()" plain>搜索</el-button>
            </h3>
            <div class="schoolbox" @click="checkSchoolShow()">学校：
                 <span>{{schoolName?schoolName:'请选择'}}</span>
           </div>
            <el-form class="cl" ref="form" :model="form" label-width="100px">                
                <el-form-item label="支付状态">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未支付" value="1"></el-option>
                        <el-option label="支付中" value="2"></el-option>
                        <el-option label="支付完成" value="3"></el-option>
                        <el-option label="支付失败" value="4"></el-option>
                    </el-select>
                </el-form-item>  
                <el-form-item label="家长">
                  <el-input placeholder="请输入家长姓名" v-model="form.parentName"></el-input>
                </el-form-item> 
                <el-form-item label="学生">
                  <el-input placeholder="请输入学生姓名" v-model="form.childrenName"></el-input>
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
                <span>订单列表</span>
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
                prop="tradeNo"
                label="订单编号"
                width="150">
                </el-table-column>
                <el-table-column
                prop="orderNo"
                label="微信支付流水号"
                width="150">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="电话"
                width="110">
                </el-table-column>                 
                <el-table-column
                prop="parentName"
                label="家长姓名"
                width="150">
                </el-table-column>
                <el-table-column
                prop="childrenName"
                label="学生姓名"
                width="80">
                </el-table-column>
                 <el-table-column
                prop="clazz"
                label="班级"
                width="100">
                  <template slot-scope="scope">
                    <p>{{scope.row.grade+"年级"+scope.row.clazz+"班"}}</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="price"
                label="价格"
                width="100">
                <template slot-scope="scope">
                    <p>{{scope.row.price}}元</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态"
                width="100">
                <template slot-scope="scope">
                    <p>{{scope.row.state==1?'未支付':(scope.row.state==2?'支付中':(scope.row.state==3?'支付完成':'支付失败'))}}</p>
                </template>
                </el-table-column>
                 <el-table-column
                prop="productId"
                label="产品id"
                width="100">                  
                </el-table-column> 
                <el-table-column
                prop="type"
                label="产品类型"
                width="100">
                <template slot-scope="scope">
                    <p>{{scope.row.type==1?'早':(scope.row.type==2?'晚':'全包')}}</p>
                </template>   
                </el-table-column>
                <el-table-column
                prop="stieName"
                label="站点名称"
                width="150"> 
                </el-table-column>                
                 <el-table-column
                prop="name"
                label="预设线路名称"
                width="150">                  
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间"
				width="150"
                >                  
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
                parentName:'',
                childrenName:''
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
            console.log("学校显示显示")
        },
        init(){
            let data={}
            data=this.form
            if(this.value1){
                data.start=this.$untils.getDate(this.value1[0])
                data.end=this.$untils.getDate(this.value1[1])
            }
            this.$axios.post(this.$url+"mgBuyRecord/list",data).then(res=>{
                if(res.code==100){
                    this.list=res.info.rows
                    this.total=res.info.total
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
.searchbox{
	padding-bottom: 20px;
}
</style>