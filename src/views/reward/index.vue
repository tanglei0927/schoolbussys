<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >奖励管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox">
            <h3><span>筛选</span>
            <el-button type="success" @click="init()" plain>搜索</el-button>
            </h3>
            <div class="schoolbox" @click="checkSchoolShow()">学校：
                 <span>{{schoolName?schoolName:'请选择'}}</span>
           </div>
            <el-form class="cl" ref="form" :model="form" label-width="100px">                
                <!-- <el-form-item label="支付状态">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未支付" value="1"></el-option>
                        <el-option label="支付中" value="2"></el-option>
                        <el-option label="支付完成" value="3"></el-option>
                        <el-option label="支付失败" value="4"></el-option>
                    </el-select>
                </el-form-item>  -->
                <el-form-item label="购买的家长">
                  <el-input placeholder="请输入购买家长姓名" v-model="form.buyName"></el-input>
                </el-form-item> 
                <el-form-item label="奖励的家长">
                  <el-input placeholder="请输入奖励家长姓名" v-model="form.distributionName"></el-input>
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
                <span>奖励列表</span>
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
                prop="partnerTradeNo"
                label="订单号"
                width="150">
                </el-table-column>
                 <el-table-column
                prop="productName"
                label="产品"
                width="100">
                </el-table-column>
                <el-table-column
                prop="buyName"
                label="购买人"
                width="100">
                </el-table-column>
                <el-table-column
                prop="buyPhone"
                label="购买人电话"
                width="100">
                </el-table-column>                    
                <el-table-column
                prop="distributionName"
                label="分销人"
                width="150">
                </el-table-column>   
                <el-table-column
                prop="distributionPhone"
                label="分销人电话"
                width="150">
                </el-table-column>   
                <el-table-column
                prop="distributionAmount"
                label="分销人所得金额"
                width="150">
                </el-table-column>             
                <!-- <el-table-column
                prop="buyRecordName"
                label="购买记录"
                width="150">
                </el-table-column> -->
                <el-table-column
                prop="isDistribution"
                label="是否已经分销"
                width="110">
					<template slot-scope="scope">
						<p>{{scope.row.isDistribution==0?'未分销':'已分销'}}</p>
					</template>   
                </el-table-column>                      
                <el-table-column
                prop="createTime"
				width="140"
                label="创建时间"
                >                  
                </el-table-column>
				<el-table-column
				fixed="right"
				label="操作">
					<template slot-scope="scope">
						<el-button @click="updateStaus(scope.row)" type="text" size="small">操作</el-button>
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
		<div class="shadow" v-if="examineShow">
		    <div class="exaboxs">
		        <h3>更改分销状态
		             <i @click="examineShow=false" class="el-icon-close"></i>
		        </h3>
		         <el-select v-model="examine" placeholder="请选择">
		                <el-option label="未分销" :value="0"></el-option>
		                <el-option label="已分销" :value="1"></el-option>
		        </el-select>
		        <div class="btns">
		             <el-button type="success" @click="changeToE()" plain>确定</el-button>
		             <el-button type="warning" @click="examineShow=false" plain>取消</el-button>
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
                buyName:'',
                distributionName:'',
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
			examineShow:false,
			examine:'',
			id:null
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
            this.$axios.post(this.$url+"mgDistribution/list",data).then(res=>{
                if(res.code==100){
                    this.list=res.info.rows
                    this.total=res.info.total
                }
            })
            
        },
       updateStaus(row){
		   // 更改状态
		   this.examineShow=true
		   this.id=row.id
		   this.examine=row.isDistribution
	   },
	   changeToE(){
		   this.$axios.post(this.$url+"mgDistribution/isDistribution",{
			   id:this.id,
			   isDistribution:this.examine
		   }).then(res=>{
			   if(res.code==100){
				   this.$message({
					   type:"success",
					   message:"修改成功"
				   })
				   this.examineShow=false
				   this.init()
			   }else if(res.code==250){
				   this.$message({
					   type:"warning",
					   message:res.msg
				   })
			   }
		   })
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
	height: 200px;
	width: 300px;
	text-align: center;
	.el-select{
		margin-top: 20px;
		margin-bottom: 20px;
	}
}
.searchbox{
	padding-bottom: 20px;
}
</style>