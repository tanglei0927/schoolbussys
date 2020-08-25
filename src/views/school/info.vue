<template>
   <div>
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'school' }">学校管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{schoolName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="headinfo">
           <h3>学校信息</h3>
           <ul>
              <li>
                 <span>学校ID：{{form.school.id}}</span>
                 <span class="schoolname">学校名：</span>{{form.school.name}}
              </li>
              <li>
                 <!-- <div><span>报名总数：</span></div>  -->
                 <div><span>创建时间：</span>{{form.school.createTime?form.school.createTime:''}}</div>
              </li>
              <li class="cl">
                 <span>学校地址：</span>{{form.school.address}}
                  <el-button type="warning" @click="getUpdateMsg()">编辑</el-button>
              </li>
           </ul>
        </div>
        <div class="lines">
           <P>开通线路：{{form.lines.length}}条</P>
           <div v-for="(item,index) in form.lines">
               <Lines :info="item.name" :list="item.sites" />
           </div>
        </div>
        <div class="details">
           <P>下属安全员：{{form.securities.length}}人</P>
           <div>
              <span v-for="(item,index) in form.securities">{{item.name}}
                     <em v-if="item.isForbidden==1" class="redtxt">(离职)</em>
              </span>
             <!-- <span>张是哪 </span> -->              
           </div>
        </div>
        <div class="details">
           <P>下属车辆：{{form.vehicles.length}}人</P>
           <div>
              <!-- <span>张是哪 <em class="redtxt">(离职)</em></span> -->
             <span v-for="(item,index) in form.vehicles" >{{item.licenseId}}
                     <em v-if="item.status==1" class="redtxt">(离职)</em>
             </span>
           </div>
        </div>
        <div class="details">
           <P>归属运营员：{{form.managers.length}}人</P>
           <div>
               <span v-for="(item,index) in form.managers">{{item.name}}
                     <em v-if="item.isForbidden==1" class="redtxt">(离职)</em>
               </span>
              <!-- <span>张是哪 <em>(离职)</em></span> -->
           </div>
        </div>
        <p>当前营收：{{form.income}}元</p>
        <p>活动支出：{{form.expend}}元</p>
        <div class="btns">           
         <el-button type="danger" @click="goBack()" plain>确定</el-button>
         <!-- <el-button type="success" plain>编辑</el-button> -->
        </div>
          <div class="shadow" v-if="updateShow">
         <div class="addbox">
            <h3>    
               <el-button type="primary" @click="addSchool()" icon="el-icon-s-claim">保存</el-button>
               <!-- <i class=""></i> -->
               <span>编辑学校</span>
             <i class="el-icon-close" @click="updateShow=false"></i>
            </h3>
            <el-form  ref="form" label-width="100px">
                <el-form-item class="schoolinput" label="学校名称：">
                  <el-input placeholder="请输入学校名称" v-model="update.name"></el-input>
                  <!-- <el-button @click="yyshow=true">分配运营员</el-button> -->
               </el-form-item>
               <el-form-item class="details" label="详细地址：">
                  <el-input v-model="addressFrom.address" placeholder="请在下方地图中选择位置"></el-input>
                  <el-button type="danger" @click="isUpdate=true" plain>更改定位</el-button>
               </el-form-item>
            </el-form>
            <Map v-if="isUpdate" @changeAddress="changeAddress"/>
            <Mapmarker v-else :lngs="lngs" />
         </div>          
      </div>

   </div> 
</template>
<script>
import Lines from "../../components/lines"
import Map from "../../components/map"
import Mapmarker from "../../components/showmap"
import area from "../../untils/area"
import province from "../../untils/province"
import city from "../../untils/city"
export default {
   components:{
      Lines,Map,Mapmarker
   },
    data(){
       return{
         schoolId:null,
         schoolName:"",
         form:{},
         updateShow:false,
         update:{},
         lngs:[],
         isUpdate:false,
         addressFrom:{}
       }
    },
    created(){
       let route=this.$route
      //  console.log()
       this.schoolId=route.query.id
       this.schoolName=route.query.schoolName
       this.init()
    },
    methods:{
		goBack(){
			this.$router.go(-1)
		},
       init(){
          this.$axios.post(this.$url+"mgSchool/detail",{
             schoolId:this.schoolId
          }).then(res=>{
             if(res.code==100){
                this.form=res.info
                this.schoolName=this.form.school.name
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
       getUpdateMsg(){
          this.$axios.post(this.$url+"mgSchool/detailx",{
             schoolId:this.schoolId
          }).then(res=>{
             if(res.code==100){
               this.update=res.info
               this.addressFrom.address=this.update.address
               this.lngs[0]=this.update.longitude
               this.lngs[1]=this.update.latitude
               console.log(this.lngs)
               this.updateShow=true
             }
          })
       },
       addSchool(){
         //  保存
         let data={}
         if(this.addressFrom.latitude){
            // 已经更改了地图位置
            data=this.addressFrom
         }else{
            data=this.update
         }
         data.address=this.addressFrom.address
         data.name=this.update.name
         data.id=this.schoolId
         console.log(data)
         if(data.name==""){
            this.$message({
               message: '请填写学校名称',
               type: 'error'
            })
         }else if(data.address==""){
            this.$message({
               message: '请填写或在地图上选择学校位置',
               type: 'error'
            })
         }else{
            this.$axios.post(this.$url+"mgSchool/update",data,'application/json;charset=UTF-8').then(res=>{
               if(res.code==100){
                  this.$message({
                     message: '修改成功',
                     type: 'success'
                  })
                  this.updateShow=false
                  this.init()
               }
            })
         }
       }
    }
}
</script>
<style lang="scss" scoped>
   .headinfo{
        border: 1px solid #ccc;
         padding: 10px;
         border-radius: 10px;
         margin-bottom: 10px;
      h3{
         text-align: center;
      }
      ul{     
         span{
               color: #999;            
         }  
         .schoolname{
            margin-left: 20px;
         }
         div{
            display: inline-block;
            width: 32%;
            line-height: 40px;
            span{
               display: inline-block;
               width: 80px;
               text-align: right;
            }
         }
         .el-button{
            float: right;
         }
      }
   }
   .redtxt{
      color: red;
      font-style: normal;
      font-size: 14px;
   }
   .details{
      span{
         display:inline-block ;
         line-height: 40px;
         padding: 0 20px;
      }
   }
   p{
      line-height: 40px;
   }
   .btns{
      text-align: center;
      .el-button{
         width:150px;
         margin: 5px 20px;
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
            font-size: 28px;
         }
         .el-icon-close{
            right:0;
         }
         .el-button{
            left:0;
            font-size: 14px;
            padding: 5px;
         }
      }
      .el-form{
         margin-top: 20px;
         .details{
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