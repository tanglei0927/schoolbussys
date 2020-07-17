<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		    <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
		    <el-breadcrumb-item >设备管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="searchbox">
		    <h3><span>筛选</span>
		    <el-button type="success" @click="search()" plain>搜索</el-button>
		    </h3>
		    <el-form class="cl" ref="form" :model="form" label-width="100px">                
		        <el-form-item label="学校">
		            <el-select v-model="form.schoolId" placeholder="请选择">
		                <el-option label="全部" value=""></el-option>
						<el-option v-for="(item,index) in schoolList" :label="item.name" :value="item.id"></el-option>
		            </el-select>
		        </el-form-item>  
		    </el-form>
		</div>
		<div class="table">
		    <h3 class="cl">
		        <span>设备列表</span>
		        <el-button type="success" @click="goAdd()" plain>添加</el-button>
		    </h3>
		     <el-table
		        :data="list"
		        border
		        style="width: 600px;">
		        <el-table-column
		        prop="id"
		        label="id"
		        width="80">
		        </el-table-column>
		        <el-table-column
		        prop="amount"
		        label="账号"
		        width="120">                  
		        </el-table-column>
				<el-table-column
				prop="password"
				label="密码"
				width="120">                  
				</el-table-column>
				<el-table-column
				prop="schoolName"
				label="学校"
				width="120">                  
				</el-table-column>
		        <el-table-column
		        fixed="right"
		        label="操作"
		        width="100">
		        <template slot-scope="scope">
		            <el-button @click="goUpdate(scope.row)" type="text" size="small">修改</el-button>
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
		
		<!-- 添加，修改弹框 -->
		<div class="shadow" v-show="addShow">
			<div class="box">
			    <h3>{{info.id?'修改':'添加'}}
					<i @click="addShow=false" class="el-icon-close"></i>
				</h3>
				<el-form label-width="80px">
				    <el-form-item label="账号">
				        <el-input  v-model="info.amount"></el-input>
				    </el-form-item>
					<el-form-item label="密码">
					    <el-input  v-model="info.password"></el-input>
					</el-form-item>
					<el-form-item label="学校">
					    <el-select v-model="info.schoolId" placeholder="请选择">
							<el-option v-for="(item,index) in schoolList" :label="item.name" :value="item.id"></el-option>
					    </el-select>
					</el-form-item>  
				</el-form>
				<el-button type="success" @click="isOk()" plain>确定</el-button>
				<el-button type="primary" @click="addShow=false" plain>取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					schoolId:'',
					pageNum:1,
					pageSize:10
				},
				userInfo:{},
				schoolList:[],//学校的下拉
				total:'',
				list:[],
				addShow:false,
				info:{}
			}
		},
		created(){
			let userInfo=sessionStorage.userInfo
			if(userInfo){
				this.userInfo=JSON.parse(userInfo)
			}
			this.geSchool()
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
			geSchool(){
				this.$axios.post(this.$url+"mgManager/schoolList",{
					managerId:this.userInfo.id
				}).then(res=>{
					if(res.code==100){
						this.schoolList=res.info
					}
				})
			},
			init(){
				this.$axios.post(this.$url+"mgEquipment/list",{
					pageNum:this.form.pageNum,
					pageSize:this.form.pageSize,
					managerId:this.userInfo.id,
					schoolId:this.form.schoolId
				}).then(res=>{
					if(res.code==100){
						this.list=res.info.rows
						this.total=res.info.total
					}
				})
			},
			search(){
				// 搜索
				this.form.pageNum=1
				this.init()
			},
			goAdd(){
				this.info={}
				this.addShow=true
			},
			goUpdate(row){
				this.$axios.post(this.$url+"mgEquipment/detail",{
					id:row.id
				}).then(res=>{
					if(res.code==100){
						this.info=res.info
						this.addShow=true
					}
				})
			},
			isOk(){
				//添加修改
				let reqUrl=""
				let tsMsg=""
				if(this.info.id){
					// 修改
					reqUrl='mgEquipment/update'
					tsMsg="修改"
				}else{
					reqUrl='mgEquipment/add'
					tsMsg="添加"
				}
				this.$axios.post(this.$url+reqUrl,this.info,'application/json').then(res=>{
					if(res.code==100){
						this.$message({
							type:'success',
							message:tsMsg+"成功"
						})
						this.addShow=false
						this.init()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.box{
		width: 300px;
		height: 290px;
		text-align: center;
		.el-form{
			margin-top: 20px;
		}
	}
</style>
