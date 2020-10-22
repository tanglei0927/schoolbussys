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
						<el-option label="七年级" value="7"></el-option>
						<el-option label="八年级" value="8"></el-option> 
						<el-option label="九年级" value="9"></el-option> 
						<el-option label="高一" value="10"></el-option> 
						<el-option label="高二" value="11"></el-option> 
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
                <span>学生列表</span>
                <el-button type="success" @click="exportExcel()" plain>导出</el-button>
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
                    <p>{{scope.row.grade>9?(scope.row.grade==10?'高一':'高二'):scope.row.grade+"年级"}}{{scope.row.clazz+"班"}}</p>
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
					<template slot-scope="scope">
						<p v-for="(item,index) in scope.row.relations">{{item.parentName?item.parentName:''}}{{item.relation&&item.relation!='null'?'('+item.relation+')':''}}</p>
					</template> 
                </el-table-column>
				<el-table-column
				prop="streetName"
				label="小区"
				width="150"> 
				</el-table-column>  
                <el-table-column
                prop="siteName"
                label="预设线路站点"
                width="150"> 
                </el-table-column>  
				<el-table-column
				prop="expectSiteName"
				label="期望预设线路站点"
				width="150"> 
				</el-table-column>  
				<el-table-column
				prop="expectProductName"
				label="期望的预设线路"
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
					<el-button v-if="userInfo.isSuperAccount==1" @click="deleteChildren(scope.row)" type="text" size="small">删除</el-button>
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
		deleteChildren(row){
		     this.$confirm('是否要删除学生：'+row.name+'?', '提示', {
		         confirmButtonText: '确定',
		         cancelButtonText: '取消',
		         type: 'warning'
		         }).then(() => {
		             this.$axios.post(this.$url+"mgChildren/delete",{
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
		},
		exportExcel(){
			  // 导出成excel表
			  // 获取完整的数据
			   const loading = this.$loading({
					lock: true,
					text: '正在加载数据，请稍等！',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				  let list=[]
				 this.$axios.post(this.$url+"mgChildren/list",{
						pageNum:1, 
						pageSize:this.total,
						managerId:this.form.managerId,
						schoolId:this.form.schoolId,
						name:this.form.name,
						parentName:this.form.parentName,
						grade:this.form.grade,
						clazz:this.form.clazz
					}).then(res=>{
				    if(res.code==100){
						loading.close();
						list=res.info.rows								
						list.forEach((item,index)=>{
							item.sex=item.sex==0?'女':'男'
							item.haveFaceRecognitionIdentification=item.haveFaceRecognitionIdentification==0?'未录入':'已录入'
							let parentlist=item.relations
							let parentStr=''
							parentlist.forEach((item2,index2)=>{
								if(item2.parentName){
									parentStr+=item2.parentName+(item2.relation?'('+item2.relation+')':'')
								}
							})
							item.parentStr=parentStr
						})
						let exportloading = this.$loading({
							lock: true,
							text: '正在生成表格并导出，请稍等！',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});	
						let { export_json_to_excel } = require('../../untils/export2Excel.js');
						let tHeader = ['ID', '姓名', '性别','学校','年级','班级','出生日期','家长','预设线路站点','有效期','人脸识别是否已录入'];
						let filterVal = ['id','name','sex','schoolName','grade','clazz','birthDate','parentStr','siteName','closeDate','haveFaceRecognitionIdentification'];				
						let data = this.formatJson(filterVal, list);
						export_json_to_excel(tHeader, data, '学生');
						exportloading.close();
				    }
				  })
		},
		 formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
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
.el-table{
    img{
        width: 100px;
		// height: 100px;
    }
}
</style>