<template>
   <div class="page">
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'school' }">学校管理</el-breadcrumb-item>
        </el-breadcrumb>
      <div class="searchbox cl">
         <h3><span>筛选</span></h3>
         <el-form class="cl" ref="form" :model="form" label-width="80px"> 
         <div class="cl">
            <el-form-item label="省">
               <el-select v-model="form.provinceCode" placeholder="请选择省份" @change="changeProvince">
                  <el-option v-for="(item,index) in provinceList" :label="item.label" :value="item.value"></el-option>                  
               </el-select> 
            </el-form-item>
            <el-form-item label="市">
               <el-select v-model="form.cityCode" placeholder="请选择城市" @change="changeCity">
                  <el-option v-for="(item,index) in cityList" :label="item.label" :value="item.value"></el-option>                  
               </el-select> 
            </el-form-item>
            <el-form-item label="区">
               <el-select v-model="form.areaCode" placeholder="请选择区域" @change="changeArea">
                  <el-option v-for="(item,index) in areaList" :label="item.label" :value="item.value"></el-option>                  
               </el-select> 
            </el-form-item>
            </div>
             <el-form-item class="schoolinput" label="学校：">
               <el-input placeholder="请输入学校名称" v-model="form.schoolName"></el-input>
            </el-form-item>
            <el-button type="primary" @click="searchIfo()">搜索</el-button>
            <el-button type="warning" @click="showMore=!showMore">{{showMore?'收起更多':'查看更多'}}</el-button>
            <el-button type="success" v-if="userInfo.isSuperAccount==1" @click="showAdd()">新增</el-button>

         </el-form>
      </div>
      <div class="table">
         <el-table
                :data="listData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="id"
                width="80">
                </el-table-column>                               
                <el-table-column
                prop="name"
                label="学校"
                width="200">
                </el-table-column>   
                 <el-table-column
                prop="province"
                label="省份"
                width="150">
                </el-table-column>   
                <el-table-column
                prop="province"
                label="城市区域"
                width="200">
                <template slot-scope="scope">
                     <p>{{scope.row.city+" "+scope.row.area}}</p>
                </template>
                </el-table-column>   
                <el-table-column
                prop="address"
                label="详细地址"
                width="200">
                </el-table-column>           
                <el-table-column
                prop="createTime"
                label="创建时间"
                width="200">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">查看详情</el-button>
                    <!-- <el-button type="text" size="small">编辑</el-button> -->
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
<!--新增学校  -->
      <div class="shadow" v-if="addShow">
         <div class="addbox">
            <h3>    
               <el-button type="primary" @click="addSchool()" icon="el-icon-s-claim">保存</el-button>
               <!-- <i class=""></i> -->
               <span>添加学校</span>
             <i class="el-icon-close" @click="addShow=false"></i>
            </h3>
            <el-form  ref="form" label-width="100px">
                <el-form-item class="schoolinput" label="学校名称：">
                  <el-input placeholder="请输入学校名称" v-model="schoolName"></el-input>
                  <el-button @click="yyshow=true">分配运营员</el-button>
               </el-form-item>
               <el-form-item class="details" label="详细地址：">
                  <el-input v-model="addressFrom.address" disabled="" placeholder="请在下方地图中选择位置"></el-input>
               </el-form-item>
            </el-form>
            <Map @changeAddress="changeAddress" />
         </div>          
      </div>
      <el-drawer
            title="运营员列表"
            :visible.sync="yyshow"
            direction="rtl"
            size="30%">
            <el-table  ref="yunyTable" :data="gridData" @selection-change="changeYylist">
                 <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column property="managerId" label="id" width="80"></el-table-column>
                <el-table-column property="managerName" label="姓名" ></el-table-column>
            </el-table>
        </el-drawer>
   </div> 
</template>
<script>
import area from "../../untils/area"
import province from "../../untils/province"
import city from "../../untils/city"
import Map from "../../components/map"
export default {
   components:{Map},
   data(){
      return{
         form:{
            provinceCode:'',
            provinceName:'',
            cityCode:'',
            cityName:'',
            areaName:'',
            areaCode:'',
            schoolName:'',
            pageNum:1,
            pageSize:10,
            managetId:null
         },
         userInfo:{},
         provinceList:[],
         cityList:[],
         areaList:[],
         listData:[],
         total:"",
         showMore:false,
        schoolName:'',
         addressFrom:{},
         addShow:false,
         yyshow:false,
         gridData:[],
         checkYy:[]
      }
   },
    created(){
      //  console.log(province)
       this.provinceList=province
       let userInfo=sessionStorage.userInfo
       userInfo=JSON.parse(userInfo)
       this.form.managetId=userInfo.id
       this.userInfo=userInfo
       this.searchIfo()
    },
    methods:{
       showAdd(){
         //  显示新增
         this.addShow=true
         this.addressFrom={}
         this.schoolName=""
         this.getmaneger()
       },
       changeYylist(val){
            // 运营员多选
            console.log(val)
            this.checkYy=val
        },
       getmaneger(){
          this.$axios.post(this.$url+"mgManager/managerList",{
               managerId:this.userInfo.id
           }).then(res=>{
               if(res.code==100){
                   this.gridData=res.info  
               }
           })
       },
        handleSizeChange(val){
            console.log(val)
            this.form.pageSize=val
            this.form.pageNum=1
            this.searchIfo()
        },
        handleCurrentChange(val){
            this.form.pageNum=val
            this.searchIfo()
        },
       changeProvince(val){
         // console.log("省份")
         this.areaList=[]        
         this.form.cityName=""
         this.form.cityCode=""
         this.form.areaName=""
         this.form.areaCode=""
         province.forEach((item,index)=>{
            if(item.value==val){
               this.form.provinceName=item.label
            }
         })
         city.forEach((item,index)=>{
            let str=item[0].value
            str=str.substr(0,2)
            // console.log(str)
            if(str==val){
               // console.log(item)
               this.cityList=item
            }
         })
       },
       changeCity(val){
         //  this.areaList=[]  
         this.form.areaName=""
         this.form.areaCode=""
         this.cityList.forEach((item,index)=>{
            if(item.value==val){
               this.form.cityName=item.label
            }
         })
         area.forEach((item,index)=>{
            let cityList=item
            cityList.forEach((item2,index)=>{
                  let str=item2[0].value
               str=str.substr(0,4)
               // console.log(str)
               if(str==val){
                  // console.log(item)
                  this.areaList=item2
               }
            })
         })
       },
       changeArea(val){
          console.log("选择区域")
         //  console.log(val)
          area.forEach((item,index)=>{
            let cityList=item
            cityList.forEach((item2,index)=>{
               // console.log(item2)
               let areaList=item2
               areaList.forEach((item3,index)=>{
                  if(item3.value==val){
                     console.log("区域")
                     this.form.areaName=item3.label  
                     // return true
                  }  
               })                          
            })
         })
       },
       searchIfo(){
          console.log(this.form)
          this.$axios.post(this.$url+"mgSchool/list",this.form).then(res=>{
             if(res.code==100){
                this.listData=res.info.rows
                this.total=res.info.total
             }
          })
       },
       getCode(val){
          let proIndex=null
          let cityIndex=null
          let areaIndex=null
          let data={
             province:{
                code:null,
                name:''
             },
              city:{
                code:null,
                name:''
             },
              area:{
                code:null,
                name:''
             }
          }
          console.log("获取")
         //  获取省code
          province.forEach((item,index)=>{
             if(item.label==val.province){
                proIndex=index
               data.province.code=item.value
               data.province.name=val.province   
               let list=city[index]
               list.forEach((item2,index2)=>{
                  if(item2.label==val.city){
                     cityIndex=index2
                     data.city.code=item2.value
                     data.city.name=item2.label
                     let list2=area[proIndex][cityIndex]
                     list2.forEach((item3,index3)=>{
                        if(item3.label==val.area){
                           data.area.code=item3.value
                           data.area.name=item3.label
                           this.addressFrom=data
                           this.addressFrom.address=val.address
                           this.addressFrom.longitude=val.longitude
                           this.addressFrom.latitude=val.latitude
                        }
                     })
                  }
               })             
             }
          })
          return data
       },
       changeAddress(val){
          console.log(val)
         //  通过省市区，查询编码
        let data=this.getCode(val)
       },
       addSchool(){
         //  添加学校
          console.log(this.addressFrom)
          console.log(this.userInfo)
          if(this.schoolName==""){
             this.$message({
               message: '请填写学校名称',
               type: 'error'
            })
          }else if(!this.addressFrom.latitude){
             this.$message({
               message: '请在地图中选择学校位置',
               type: 'error'
            })
          }else if(this.checkYy.length==0){
            this.$message({
               message: '请分配运营员',
               type: 'error'
            })
          }else{
             let data={
                address:this.addressFrom.address,
               longitude:this.addressFrom.longitude,
               latitude:this.addressFrom.latitude,
               name:this.schoolName,
               province:{
                  code:this.addressFrom.province.code,
                  name:this.addressFrom.province.name
               },
               city:{
                  code:this.addressFrom.city.code,
                  name:this.addressFrom.city.name
               },
               area:{
                  code:this.addressFrom.area.code,
                  name:this.addressFrom.area.name
               },
               managers:this.checkYy
             }
            //  data.managers=this.checkYy
            //  data.name=this.schoolName
               // data=JSON.stringify(data)
             console.log("请求的数据")
             console.log(data)
             this.$axios.post(this.$url+"mgSchool/add",data,'application/json;charset=UTF-8').then(res=>{
                if(res.code==100){
                     this.$message({
                     message: '添加学校成功',
                     type: 'success'
                  })
                  this.addShow=false
                  this.searchIfo()
                }
             })
            
          }
       },
       lookDetails(item){
         //  查看详情
         this.$router.push({
            name:'schoolInfo',
            query:{
               id:item.id,
               schoolName:item.name
            }
         })
       },
    }
}
</script>
<style lang="scss" scoped>
   .searchbox{
      padding-bottom: 10px;
      .el-form{
         .el-form-item{
            float: left;
            width:230px;
         }
         .schoolinput{
            width:300px;
         }
         .el-button{
            float: right;
            margin-right: 10px;
         }
      }
   }
   .shadow{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background:rgba(0,0,0,.5);
      z-index: 10;
      >div{
         padding: 10px 20px;
         position: absolute;
         top: 0;
         right: 0;
         bottom: 0;
         left: 0;
         margin: auto;
         background: #fff;
         border-radius: 10px;  
      }
      .addbox{
         width: 500px;
         height: 450px;        
      }
       h3{
         text-align: center;
         position: relative;
         color: #999;
         border-bottom: 1px solid #ccc;
         padding-bottom: 10px;
         i,.el-button{
            position: absolute;
            font-size: 16px;
         }
         .el-icon-close{
            right:0;
            font-size: 28px;
         }
         .el-button{
            left:0;
            font-size: 14px;
            padding: 5px;
         }
      }
      .el-form{
         margin-top: 20px;
         .schoolinput{
            .el-input{
               width: 250px;
            }
            .el-button{
               float: right;
            }
         }
      }
   }
</style>