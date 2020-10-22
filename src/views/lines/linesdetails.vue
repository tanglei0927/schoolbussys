<template>
      <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'lines' }">线路</el-breadcrumb-item>
            <el-breadcrumb-item >线路详情</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
            <h3 class="headtit"><span>线路站点</span>
            <el-button type="success" @click="showMore=true" plain>{{sites.length==0?'添加站点':'修改站点'}}</el-button>
            </h3>
            <div v-if="!showMore">
             <Lines v-if="sites.length>0" :list="oldSite" :info="sitesName" @changeSite="changeSite" :checkSite="checkSite.id"/>
              <p class="nonebox" v-else>该线路暂时还没有添加站点</p>
            </div>
            <div v-else>
              <ul class="cl" >
                  <li v-for="(item,index) in sites">
                      <i @click="showSite(index)" class="el-icon-edit"></i>
                      <span>站点{{item.order}}：{{item.name}}</span>
					  <p>上一站到本站所需时长：{{item.time}}分钟
					  <i v-if="index!==0"  @click="changeTime(index,item)" class="el-icon-time"></i>
					  </p>
                      <i @click="deleteSite(index)" class="el-icon-error"></i>
                  </li>
                   
                  <li class="add" @click="showSite()"><i class="el-icon-plus"></i></li>
              </ul>
            <el-button type="success" @click="submitUpdate()" plain>确定</el-button>
            <el-button type="warning" @click="showMore=false" plain>取消</el-button>
            </div>
          </div>
          <div class="box" v-if="sites.length>0">
            <h3><span>站点：{{checkSite.name}} 关联的小区</span></h3>
              <el-table
                :data="commList"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="id"
                width="100">
                </el-table-column>
                 <el-table-column
                prop="name"
                label="小区"
               >
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="getUpChild(scope.row.id)" type="text" size="small">查看可添加的学生</el-button>
                    <!-- <el-button type="text" @click="lookDetails(scope.row)" size="small"></el-button> -->
                </template>
                </el-table-column>
              </el-table>
          </div>
          <div>
            <h3><span>学生列表</span>
            <el-button type="success" @click="exportExcel()" plain>导出</el-button>
            </h3>
            <div>
              <el-table
                :data="childList"
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
                  width="100"
                >
                </el-table-column>
                 <el-table-column
                  prop="sex"
                  label="性别"
                  width="80"
                >
                <templat slot-scope="scope">
                  <p>{{scope.row.sex==1?'男':'女'}}</p>
                </templat>
                </el-table-column>
                <el-table-column
                  prop="birthDate"
                  label="出生日期"
                  width="100"
                >
                </el-table-column>
                 <el-table-column
                  prop="sex"
                  label="班级"
                  width="100"
                >
                <templat slot-scope="scope">
                  <p>{{scope.row.grade>9?(scope.row.grade==10?'高一':'高二'):scope.row.grade+"年级"}}{{(scope.row.clazz?scope.row.clazz+"班":'')}}</p>
                </templat>
                </el-table-column>
                <el-table-column
                  prop="parentname"
                  label="家长"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="家长联系方式"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="relation"
                  label="关系"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="siteName"
                  label="正式线路上车站点"
                  width="100"
                >
                </el-table-column>
				 <el-table-column
				  prop="closeDate"
				  label="到期时间"
				  width="150"
				>
				</el-table-column>
                <el-table-column
                  prop="detailAddreee"
                  label="详细地址"
                >
              </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="deleteChild(scope.row)" type="text" size="small">删除</el-button>
                    <!-- <el-button type="text" @click="lookDetails(scope.row)" size="small"></el-button> -->
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


        <!-- 抽屉 -->
        <el-drawer
            title="站点列表"
            :visible.sync="siteShow"
            direction="rtl"
            size="50%">
            <el-input v-model="siteStr" placeholder="请输入站点名称"></el-input>
            <el-button type="success" @click="getAddSite()" plain>搜索</el-button>
            <el-table  ref="yunyTable" :data="gridData2">
                <el-table-column property="id" label="id" width="80"></el-table-column>
                <el-table-column property="name" label="站点" ></el-table-column>
                <!-- <el-table-column property="name" label="站点" > -->
				<!-- </el-table-column> -->
                <el-table-column property="name" label="操作">
                 <template slot-scope="scope">
                    <el-button @click="changeCheckSite(scope.row)" type="text" size="small">确定</el-button>
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
                    :total="siteTotal">
                    </el-pagination>
            </div>
        </el-drawer>
        <el-drawer
            title="可添加学生列表"
            :visible.sync="childShow"
            direction="rtl"
            size="50%">
            <!-- <el-input v-model="siteStr" placeholder="请输入站点名称"></el-input> -->
            <!-- <el-button type="success" @click="getSite()" plain>搜索</el-button> -->
			<el-button type="success" v-show="childIdList.length>0" @click="addChildToline()">关联</el-button>
            <el-table  ref="yunyTable" :data="gridData3" @selection-change="changeChildList">				
				<el-table-column
				    type="selection" 
				    width="55">
				</el-table-column>
                <el-table-column property="id" label="id" width="80"></el-table-column>
                <el-table-column property="name" label="姓名" ></el-table-column>
                <el-table-column property="grade" label="年级" ></el-table-column>
                <el-table-column property="clazz" label="班级" ></el-table-column>
                <el-table-column property="siteName" label="预设线路站点" ></el-table-column>
                <el-table-column property="clazz" label="产品类型" >
					<template slot-scope="scope">
						<p>{{scope.row.productType==1?'早':(scope.row.productType==2?'晚':(scope.row.productType==3?'全天':''))}}</p>
					</template>
				</el-table-column>
                <el-table-column property="name" label="操作">
                 <template slot-scope="scope">
                    <el-button @click="addChildToline(scope.row)" type="text" size="small">添加</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-drawer>
		<!-- 时间显示弹框 -->
		<div class="shadow" v-show="timeShow">
			<div class="box timebox">
				<h3><span>上一站到达此站时间（分钟）</span></h3>
				<el-input v-model="time"></el-input>
				<el-button  type="primary" @click="addTime()" size="small">确定</el-button>
			</div>
		</div>
      </div>
</template>
<script>
import Lines from "../../components/lines2"
export default {
    components:{Lines,},
    data(){
      return{
        sites:[],
        oldSite:[],
        lineId:null,
        sitesName:"",
        userInfo:{},
        checkSite:{},//选中的站点
        commList:[],
        pageSize:10,
        pageNum:1,
        total:null,
        childList:[],
        showMore:false,
        siteShow:false,
        siteStr:"",
        siteTotal:null,
        pageNum1:1,
        pageSize1:10,
        gridData2:[],
        gridData3:[],
        siteIndex:false,
        childShow:false,
		time:'',
		timeShow:false,
		timeChangeId:null,
		childIdList:[]
      }
    },
    created(){
      if(sessionStorage.userInfo){
        this.userInfo=JSON.parse(sessionStorage.userInfo)
      }
      this.lineId=this.$route.query.id
      this.getSites()
      this.getChild()
	  this.sitesName=this.$route.query.name
    },
    methods:{
      handleSizeChange(val){
            console.log(val)
            this.pageSize=val
            this.pageNum=1
            this.getChild()
        },
        handleCurrentChange(val){
            this.pageNum=val
            this.getChild()
        },
         handleSizeChange1(val){
            console.log(val)
            this.pageSize1=val
            this.pageNum1=1
            // this.getChild()
            this.getAddSite()
        },
        handleCurrentChange1(val){
            this.pageNum1=val
            this.getAddSite()
        },
      getSites(){
          // 获取线路所有站点
          this.$axios.post(this.$url+"mgLine/querySite",{
            lineId:this.lineId
          }).then(res=>{
            if(res.code==100){
              // this.sites=res.info?res.info:[]
              this.sites=res.info
              let list=""
              // 深拷贝
              list=JSON.stringify(res.info)
              this.oldSite=JSON.parse(list)
              // if(!this.oldSite){
              //   this.oldSite=[]
              // }
              if(res.info){
                this.checkSite=this.sites[0]
              }
              this.getCommunity()
            }
          })
      },
      getCommunity(){
        // 站点关联的小区
        this.$axios.post(this.$url+"mgSite/streetSelect",{
          siteId:this.checkSite.id
        }).then(res=>{
          if(res.code==100){
            this.commList=res.info
          }
        })
      },
      changeSite(val){
        // 选择站点
        console.log("选择站点")
        this.checkSite=val
        this.getCommunity()
      },
      getChild(){
        //获取线路学生列表
        this.$axios.post(this.$url+"mgLine/childrenList",{
          lineId:this.lineId,
          pageSize:this.pageSize,
          pageNum:this.pageNum
        }).then(res=>{
          if(res.code==100){
            this.childList=res.info.rows
            this.total=res.info.total
          }
        })
      },
      getAddSite(){
            this.$axios.post(this.$url+"mgSite/list",{
              name:this.siteStr,
              pageNum:this.pageNum1,
              pageSize:this.pageSize1
          }).then(res=>{
              if(res.code==100){
                  this.gridData2=res.info.rows
                  this.siteTotal=res.info.total   
              //    this.getSite()                   
              }
          })
      },
      showSite(index){
		  // console.log("修改2222222222")
          if(index||index===0){
              this.siteIndex=index
			  // console.log("修改")
          }else{
              this.siteIndex=null
          }
          this.pageNum1=1
          this.getAddSite()
          this.siteShow=true
      },
       changeCheckSite(item){
          console.log(item)
          if(!this.sites){
            this.sites=[]
            this.oldSite=[]
          }
          if(this.siteIndex||this.siteIndex===0){
              // 修改
			  console.log("是否修改")
              this.sites[this.siteIndex].id=item.id
              this.sites[this.siteIndex].name=item.name
          }else{     
             let data={}
              data.id=item.id
              data.name=item.name
              data.order=this.sites.length+1   
			  // data.time=0
              this.sites.push(data)
              if(this.sites.length==1){
                this.checkSite=data
              }
              console.log(this.sites)
          }
		  if(this.sites.length==1||this.siteIndex==0){
			  this.sites[0].time=0
		  }else{
			  this.timeShow=true
			  this.timeChangeId=item.id
		  }
          this.siteShow=false 
      },
	  addTime(){
		  // 给站点设定时间
		  let list=this.sites
		  let lastIndex=null
		  let newsItem={}
		  list.forEach((item,index)=>{
			  if(item.id==this.timeChangeId){
				  item.time=this.time
				  if(this.time==0){
					  //时间为0时为始发站
					  item.order=0
					  lastIndex=index
					  newsItem=item
				  }
			  }
		  })
		let list2=[]
		if(lastIndex){
			list2.push(newsItem)
			list.forEach((item,index)=>{
				if(lastIndex!=index){
					item.order=index+1
					list2.push(item)
				}					
			})
			this.sites=list2
		}
		this.timeShow=false
	  },
	  changeTime(index,item){
		  this.timeShow=true
		  this.siteIndex=index
		  this.time=item.time
		  this.timeChangeId=item.id
	  },
        deleteSite(index){
          // 根据下标删除选中的站点
          let list=this.sites
          list.splice(index,1)
          // console.log(list)
          list.forEach((item,index)=>{
              item.order=index+1
          })          
          this.sites2=list
      },
      submitUpdate(){
        // 提交修改的站点
        let data={}
        data.lineId=this.lineId
        data.sites=this.sites
       this.$axios.post(this.$url+"mgLine/updateSite",data,"application/json").then(res=>{
         if(res.code==100){
           this.$message({
             message:"修改成功",
             type:"success"
           })
           this.getSites()
           this.showMore=false
         }
       })
      },
      getUpChild(id){
        // 获取小区可添加的学生
        this.childShow=true
        this.$axios.post(this.$url+"mgLine/childrenSimpleList",{
          streetId:id,
          lineId:this.lineId
        }).then(res=>{
          if(res.code==100){
            this.gridData3=res.info            
          }
        })
      },
	 changeChildList(val){
		 this.childIdList=[]
		 val.forEach((item,index)=>{
			this.childIdList.push(item.id)
		 })
	 },
      addChildToline(row){
        // 向线路添加学生
		let id=''
		if(!row){
			id=this.childIdList.join(",")
		}else{
			id=row.id
		}
        this.$axios.post(this.$url+"mgLine/childrenAdd",{
          lineId:this.lineId,
          childrenIds:id,
          siteId:this.checkSite.id
        }).then(res=>{
          if(res.code==100){
            this.$message({
              type:"success",
              message:"添加成功！"
            })
            this.childShow=false
            this.getChild()
          }else if(res.code==250){
            this.$message({
              type:"warning",
              message:res.msg
            })
          }
        })
      },
      deleteChild(row){
          this.$confirm('是否要删除学生'+row.name+"?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(this.$url+"mgLine/childrenDelete",{
            lineId:this.lineId,
            childrenId:row.id
          }).then(res=>{
            if(res.code==100){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getChild()
            }else if(res.code==250){
            this.$message({
              type:"warning",
              message:res.msg
            })
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
		  this.$axios.post(this.$url+"mgLine/childrenList",{
		    lineId:this.lineId,
		    pageSize:this.total,
		    pageNum:1
		  }).then(res=>{
		    if(res.code==100){
				loading.close();
				list=res.info.rows	
				list.forEach((item,index)=>{
					item.sex=item.sex==0?'女':'男'
				})
				const exportloading = this.$loading({
					lock: true,
					text: '正在生成表格并导出，请稍等！',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});	
				const { export_json_to_excel } = require('../../untils/export2Excel.js');
				const tHeader = ['ID', '姓名', '性别','出生日期','年级','班','家长','家长联系方式','关系','正式线路上车站点','到期时间','详细地址'];
				const filterVal = ['id','name','sex','birthDate','grade','clazz','parentname','phone','relation','siteName','closeDate','detailAddreee'];				
				const data = this.formatJson(filterVal, list);
				let titleE=''
				titleE=this.sitesName?this.sitesName:'线路学生'
				export_json_to_excel(tHeader, data, this.sitesName);
				exportloading.close();
		    }
		  })
	  },
	   formatJson(filterVal, jsonData) {
		  return jsonData.map(v => filterVal.map(j => v[j]))
	  }
    },
}
</script>
<style lang="scss" scoped>
$borderColor:#fb823c;
.box{
  margin: 20px 0;
}
.nonebox{
  line-height: 60px;
  color:#999;
  text-align: center;
}
h3{
  margin-bottom: 10px;
}
ul{
  li{
      float: left;
      padding:10px;
      margin: 10px;
        border: 1px dashed $borderColor;
        position: relative;
        span,p{
            font-size: 12px;
        }
        i{
            color: $borderColor;
          font-size: 20px;
        }
        .el-icon-edit{
          margin-right:10px;
        }
        .el-icon-error{
            position: absolute;
            right: -10px;
            top: -10px;
        }
  }
  .add{
      // padding: 10px 30px;
  }
}
.el-drawer{
  overflow-x: hidden;
  overflow-y: scroll;
  .el-input{
    width: 200px;
    margin: 10px;
  }
}
.timebox{
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	width: 300px;
	height: 180px;
	text-align: center;
	.el-input{
		margin: 10px 0;
	}
	.el-button{
		margin-top: 20px;
		width: 150px;
	}
}
.headtit{
	margin-bottom: 20px;
}
</style>