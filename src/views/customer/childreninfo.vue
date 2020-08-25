<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'children' }">学生管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form ref="form" :model="form" label-width="160px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" v-if="isEdit"></el-input>
                    <span v-else>{{form.name}}</span>
                </el-form-item>
                 <el-form-item label="家长">
                    <!-- <el-input v-model="form.prentName" v-if="isEdit"></el-input> -->
                    <span>{{form.parentName}}</span>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-if="isEdit" v-model="form.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.sex==1?'男':'女'}}</span>
                </el-form-item>
                <el-form-item label="学校">
                    <span style="margin-right:20px;">{{form.schoolName}}</span>
                    <!-- <el-button v-if="isEdit" type="warning" @click="showDraw=true" plain>选择学校</el-button> -->
                    <!-- <span v-else>{{form.ascription==1?'学校':(form.ascription==2?'个人':'')}}</span> -->
                </el-form-item>
                <el-form-item label="年级">
                     <el-select v-model="form.grade" placeholder="请选择年级">
                       <el-option label="一年级" :value="1"></el-option>                  
                        <el-option label="二年级" :value="2"></el-option>                  
                        <el-option label="三年级" :value="3"></el-option>                  
                        <el-option label="四年级" :value="4"></el-option>                  
                        <el-option label="五年级" :value="5"></el-option>                  
                        <el-option label="六年级" :value="6"></el-option> 
                        <el-option label="七年级" :value="7"></el-option> 
                        <el-option label="八年级" :value="8"></el-option> 
                        <el-option label="九年级" :value="9"></el-option> 
                        <el-option label="高一" :value="10"></el-option> 
                        <el-option label="高二" :value="11"></el-option> 
                    </el-select>
                    <!-- <span v-else>{{form.grade}}</span> -->
                </el-form-item>
                 <el-form-item label="班">
                    <el-input v-model="form.clazz" v-if="isEdit"></el-input>
                    <span v-else>{{form.clazz}}</span>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        v-if="isEdit"
                        placeholder="选择日期">
                     </el-date-picker>
                    <span v-else>{{form.birthDate}}</span>
                </el-form-item>
                 <el-form-item label="预设线路站点">
                     <span>{{form.siteName}}</span>
                </el-form-item>
                 <el-form-item label="产品ID">
                    <span >{{form.productId}}</span>
                </el-form-item>
                 <el-form-item label="产品名称">
                    <span >{{form.productName}}</span>
					<el-button @click="getProductList()" type="text">修改</el-button>
                </el-form-item>
                 <el-form-item label="产品类型">
                    <span >{{form.productType==1?'早':(form.productType==2?'晚':(form.productType==3?'全包':''))}}</span>
                    <!-- <span>{{productInfo.productType}}</span> -->
                </el-form-item>
                 <el-form-item label="有效期">
                    <span >{{form.closeDate}}</span>
                </el-form-item>
				<el-form-item label="期望预设线路">
				    <span >{{form.closeDate}}</span>
				</el-form-item>
				<el-form-item label="期望预设线路站点">
				    <span >{{form.expectProductName}}</span>
				</el-form-item>
				<el-form-item label="期望预设线路产品类型">
				    <span >{{form.expectProductType==1?'早':(form.expectProductType==2?'晚':(form.expectProductType==3?'全包':''))}}</span>
				    <!-- <span>{{productInfo.productType}}</span> -->
				</el-form-item>
                <el-form-item label="是否录入人脸识别">
                    <span>{{form.haveFaceRecognitionIdentification==1?'已录入':'未录入'}}</span>
                </el-form-item>
                
                 <el-form-item class="uplaodbox" label="头像">
                     <img v-if="form.photo" :src="$url+'eaOss/download/'+form.photo" alt="">
                </el-form-item>

            </el-form>
			<h3 class="titleline"><span>正式线路</span></h3>
			<el-table
			class="linelist"
			  :data="form.lineVos"
			  border
			  style="width: 710px">
			  <el-table-column
				prop="lineId"
				label="id"
				width="180">
			  </el-table-column>
			  <el-table-column
				prop="lineName"
				label="名称"
				width="180">
			  </el-table-column>
			  <el-table-column
				prop="siteName"
				label="站点"
				width="180">
			  </el-table-column>
			  <el-table-column
				prop="startName"
				label="起点">
			  </el-table-column>
			  <el-table-column
				prop="endName"
				label="终点">
			  </el-table-column>
			</el-table>
            <div class="btns">
                <el-button v-if="isEdit" type="warning" @click="submitInfo()" plain>提交</el-button>
                <el-button v-else type="warning" @click="isEdit=true" plain>修改</el-button>
                <el-button v-if="isEdit" type="primary" @click="isEdit=false" plain>取消</el-button>
                <el-button v-else type="primary" @click="goBack()" plain>返回</el-button>
            </div>
        </div>
        <!-- <School :show="showDraw" @changeToSchool="changeToSchool" /> -->
		<el-drawer
		       title="产品列表"
		       :visible.sync="showDraw"
		       direction="rtl"
		       :before-close="closeDraw"
		       size="700px">
		       <el-input v-model="productName" placeholder="请输入产品名称"></el-input>
		       <el-button type="success" @click="getProductList()" plain>搜索</el-button>
		       <el-table  ref="yunyTable" :data="productList">
		           <el-table-column property="id" label="id" width="60"></el-table-column>
		           <el-table-column property="name" label="名称" ></el-table-column>
		           <el-table-column property="morning" label="早接" >
					   <template slot-scope="scope">
						 <span>{{scope.row.morning==1?'是':'否'}}</span> 
					   </template>
				   </el-table-column>
		           <el-table-column property="night" label="晚送" >
					  <template slot-scope="scope">
					  		<span>{{scope.row.night==1?'是':'否'}}</span>				   
					  </template>
				   </el-table-column>
		           <el-table-column property="whole" label="全包" >
					   <template slot-scope="scope">
							<span>{{scope.row.whole==1?'是':'否'}}</span>			   
					   </template>
				   </el-table-column>
		           <el-table-column property="closingDate" label="到期时间" width="150" ></el-table-column>
		           <el-table-column property="name" label="操作">
		            <template slot-scope="scope">
		               <el-button @click="changeProduct(scope.row)" type="text" size="small">确定</el-button>
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
		   </el-drawer>
		   <div class="shadow" v-show="typeShow">
			   <div class="checkbox">
				   <h3>请选择</h3>
				   <el-form label-width="80px">
					   <el-form-item label="类型">
							<el-radio-group v-model="checkType">
							   <el-radio v-if="this.changeInfo.morning" :label="1">早接</el-radio>
							   <el-radio v-if="this.changeInfo.night" :label="2">晚送</el-radio>
							   <el-radio v-if="this.changeInfo.whole" :label="3">全包</el-radio>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="站点">
							<el-radio-group class="sites" v-model="site">
							   <el-radio v-for="(item,index) in changeInfo.sites" :label="item.id">{{item.name}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
					<el-button type="success" @click="changeP()">确定</el-button>
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
            title:"添加",
            userInfo:{},
            showDraw:false,
            isEdit:true,//是否可编辑
            id:null,
            value1:'',
            valueClose:'',
            form:{
                type:4,
                yearlyInspection:1,
                compulsoryInsurance:1,
                driverInsurance:1,
                passengerInsurance:1,
                thirdInsurance:1,
                ascription:'',
                status:1,
                drivingLicense:'',
				site:null
            },
            productInfo:{},//产品信息
			productList:[],//预设线路列表
			total:'',
			pageNum:1,
			pageSize:10,
			productName:'',
			changeInfo:{},
			checkType:null,
			typeShow:false,
			site:null
        }
    },
	watch:{
		
	},
    created(){
        this.userInfo=JSON.parse(sessionStorage.userInfo)
        if(this.$route.query.id){
            this.title="学生详情"
            this.id=this.$route.query.id
            this.isEdit=false
            this.init()
        }else{
            this.title="添加"
            this.isEdit=true
        }
    },
    methods:{
		handleCurrentChange(val){
			console.log(val)
			this.pageNum=val
			this.getProductList()
		},
		handleSizeChange(val){
			this.pageSize=val
			this.getProductList()
		},
        changeToSchool(data){
            console.log("选择学校")
            console.log(data)
            this.form.schoolId=data.id
            this.form.schoolNmae=data.name
            this.showDraw=false
        },
        goBack(){
            this.$router.push({name:'children'})
        },
        submitInfo(){
            console.log("添加，修改")
            console.log(this.form)
            let data=this.form
            if(!data.name||!data.clazz){
                this.$message({
                    type:"warning",
                    message:'请完善信息'
                })
            }else{
                let reqUrl=""
                data.birthDate=this.$untils.getDate2(this.value1)
                // data.closeDate=this.$untils.getDate(this.valueClose)
                reqUrl=data.id?"mgChildren/update":"mgChildren/add"
                let tsMsg=data.id?'修改':'添加'
                this.$axios.post(this.$url+reqUrl,data,'application/json').then(res=>{
                    if(res.code==100){
                        this.$message({
                            type:"success",
                            message:tsMsg+"成功！"
                        })
                        if(!data.id){
                            this.goBack()
                        }else{
                            this.isEdit=false
                            this.init()
                        }
                    }else if(res.code==250){
                        this.$message({
                            type:"warning",
                            message:res.msg
                        })
                    }
                })
            }
        },
       init(){
           this.$axios.post(this.$url+"mgChildren/detail",{id:this.id}).then(res=>{
               if(res.code==100){
                   this.form=res.info
                   this.value1=this.form.birthDate
                   this.valueClose=this.form.closeDate
               }
           })
            this.$axios.post(this.$url+"mgChildren/updatDetail",{id:this.id}).then(res=>{
               if(res.code==100){
                   this.productInfo=res.info				   
               }
           })
       },
	   getProductList(){
		   if(this.showDraw==false){
			   this.showDraw=true
		   }
			this.$axios.post(this.$url+"mgChildren/listProduct",{
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				name:this.productName,
				childrenId:this.id
			}).then(res=>{
				if(res.code==100){
					this.productList=res.info.rows
					this.total=res.info.total
				}
			})
	   },
	   closeDraw(val){
		   // console.log(val)
		   this.showDraw=false
	   },
	   changeProduct(val){
		   this.showDraw=false
		   console.log(val)
		   this.changeInfo=val
		   this.typeShow=true
		   if(this.form.expectSite){
			   this.checkType=this.form.expectProductType*1
			   this.form.site=this.form.expectSite*1
			   this.site=this.form.expectSite*1
		   }		  
	   },
	   changeP(){
		  this.form.productName=this.changeInfo.name
		  this.form.productType=this.checkType
		  this.productInfo.productType=this.checkType
		  this.form.productId=this.changeInfo.id
		  this.form.closeDate=this.changeInfo.closingDate
		  let list=this.changeInfo.sites
		  let siteId=this.site
		  list.forEach((item,index)=>{
			  if(item.id==siteId){
				  this.form.siteName=item.name
			  }
		  })
		  console.log(this.changeInfo)
		  this.isEdit=true
		  this.typeShow=false
	   },
    }    
}
</script>
<style lang="scss" scoped>
.uplaodbox{
    img{
        width:150px;
        // height:150px;
        float: left;
    }
    .el-form-item__content{
        div{
            float: left;
            margin-left: 20px;
        }
    }    
}
.btns{
    .el-button{
        margin:0 20px;
        width: 100px;
    }
}
.el-input{
    width: 300px;
}
.el-button--text{
	margin-left: 20px;
}
.checkbox{
	width: 400px;
	margin-top: 150px;
	position: static;
	padding-bottom: 20px;
	.el-radio-group{
		margin-top: 20px;
	}
	.el-button{
		display: block;
		margin: auto;
		margin-top:30px ;
		width: 150px;
	}
	.sites{
		.el-radio{
			margin: 10px;
		}
	}
}
.titleline{
	margin: 20px 0;
}
.linelist{
	margin-bottom:30px ;
}
</style>