<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'parent' }">家长管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" v-if="isEdit"></el-input>
                    <span v-else>{{form.name}}</span>
                </el-form-item>
                 <el-form-item label="电话">
                    <el-input v-if="isEdit" v-model="form.phone"></el-input>
                    <span v-else>{{form.phone}}</span>
                </el-form-item>
               <!-- <el-form-item label="关系">
                     <el-select  v-if="isEdit" v-model="form.relation" placeholder="请选择关系">
                        <el-option value="父亲"></el-option>
                        <el-option value="母亲"></el-option>
                        <el-option value="爷爷"></el-option>
                        <el-option value="奶奶"></el-option>
                        <el-option value="叔叔"></el-option>
                        <el-option value="阿姨"></el-option>
                    </el-select>
                    <span v-else>{{form.relation}}</span>
                </el-form-item> -->               
               <!-- <el-form-item label="学历">
                     <el-select v-if="isEdit"  v-model="form.education" placeholder="请选择学历">
                        <el-option value="小学"></el-option>
                        <el-option value="初中"></el-option>
                        <el-option value="高中"></el-option>
                        <el-option value="大专"></el-option>
                        <el-option value="本科"></el-option>
                        <el-option value="硕士"></el-option>
                        <el-option value="博士"></el-option>
                    </el-select>
                    <span v-else>{{form.education}}</span>
                </el-form-item> -->
                <el-form-item label="省、市、区" class="address">
                    <el-select v-model="form.province.code" placeholder="请选择省份" @change="changeProvince">
                        <el-option v-for="(item,index) in provinceList" :label="item.label" :value="item.value"></el-option>                  
                    </el-select> 
                    <el-select v-model="form.city.code" placeholder="请选择城市" @change="changeCity">
                         <el-option v-for="(item,index) in cityList" :label="item.label" :value="item.value"></el-option>                  
                    </el-select> 
                    <el-select v-model="form.area.code" placeholder="请选择区域" @change="changeArea">
                        <el-option v-for="(item,index) in areaList" :label="item.label" :value="item.value"></el-option>                  
                    </el-select> 
                    <!-- <span v-else>{{form.compulsoryInsurance==1?'有':'没有'}}</span> -->
                </el-form-item>
                 <el-form-item label="地址">
                    <el-input v-if="isEdit" v-model="form.detailAddreee"></el-input>
                    <span v-else>{{form.detailAddreee}}</span>
                </el-form-item>
                <el-form-item label="头像">
                   <img :src="form.photo" alt="">
                </el-form-item>   
            </el-form>
            <h3><span>下级家长</span></h3>
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
                prop="relation"
                label="关系"
                width="80">                  
                </el-table-column>   
                <el-table-column
                prop="phone"
                label="电话"
                width="100">
                </el-table-column>
                <el-table-column
                prop="detailAddreee"
                label="地址"
                width="150"> 
                <template slot-scope="scope">
                    <p>{{scope.row.province.name}}{{scope.row.city.name}}{{scope.row.area.name}}</p>
                </template> 
                </el-table-column>  
                <el-table-column
                prop="detailAddreee"
                label="详细地址"
                width="200">                  
                </el-table-column> 
                <el-table-column
                prop="detailAddreee"
                label="头像"
                width="150"> 
                <template slot-scope="scope">
                    <!-- <img :src="$url+'eaOss/download/'+scope.row.photo" alt=""> -->
					<img :src="scope.row.photo" mode=""></img>
                </template> 
                </el-table-column>  
                <el-table-column
                prop="createTime"
                label="创建时间">                  
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row)" type="text" size="small">详情</el-button>
                    <!-- <el-button @click="deleteDrivers(scope.row)" type="text" size="small">删除</el-button> -->
                </template>
                </el-table-column>
            </el-table>

            <div class="btns">
                <el-button v-if="isEdit" type="warning" @click="submitInfo()" plain>提交</el-button>
                <el-button v-else type="warning" @click="isEdit=true" plain>修改</el-button>
                <el-button v-if="isEdit" type="primary" @click="isEdit=false" plain>取消</el-button>
                <el-button v-else type="primary" @click="goBack()" plain>返回</el-button>
            </div>
        </div>
        <School :show="showDraw" @changeToSchool="changeToSchool" />
     </div>
</template>
<script>
import School from "../../components/school"
import area from "../../untils/area"
import province from "../../untils/province"
import city from "../../untils/city"
export default {
    components:{School},
    data(){
        return{
            title:"添加",
            userInfo:{},
            showDraw:false,
            isEdit:true,//是否可编辑
            id:null,
            form:{
                name:'',
                sex:"",
                birthday:'',
                driveCardId:'',
                illegal:0,
                isHaveAccident:0,
                isForbidden:0,
                province:{
                    name:'',
                    code:null
                },
                city:{
                    name:'',
                    code:null
                },
                area:{
                    name:'',
                    code:null
                },
            },
             provinceList:[],
            cityList:[],
            areaList:[],
            value1:'',
            list:[],
        }
    },
    created(){
       this.provinceList=province
        this.userInfo=JSON.parse(sessionStorage.userInfo)
        if(this.$route.query.id){
            this.title="车辆详情"
            this.id=this.$route.query.id
            this.isEdit=false
            this.init()
        }else{
            this.title="添加"
            this.isEdit=true
        }
    },
    methods:{
        changeToSchool(data){
            console.log("选择学校")
            console.log(data)
            this.form.schoolId=data.id
            this.form.schoolName=data.name
            this.showDraw=false
        },
        goBack(){
            this.$router.push({name:'parent'})
        },
         upSuccess(res){
            // 图片上传成功
            console.log(res)
            this.form.photo=res.info
        },
        submitInfo(){
            console.log("添加，修改")
            // console.log(this.form)
            let data=this.form
            let reg=/^1[3456789]\d{9}$/
                console.log(data)
            if(!reg.test(data.phone)){
                 this.$message({
                    type:"warning",
                    message:'电话号码格式不正确'
                })
            }else if(!data.phone||!data.name){
                this.$message({
                    type:"warning",
                    message:'请完善信息'
                })
            }else{
                let reqUrl=""
                reqUrl=data.id?"mgParent/update":"mgParent/add"
                let tsMsg=data.id?'修改':'添加'
                if(this.value1){
                     data.birthday=this.$untils.getDate(this.value1)
                }
                console.log(data)
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
           this.$axios.post(this.$url+"mgParent/detail",{id:this.id}).then(res=>{
               if(res.code==100){
                    this.form=res.info
                    this.changeProvince(this.form.province.code,true)
                    this.changeCity(this.form.city.code,true)
                    this.value1=this.form.birthday
                    this.list=this.form.parentSubs
               }
           })          
       },
        changeProvince(val,status){
         // console.log("省份")
         this.areaList=[]   
         if(!status)     {
            this.form.city.name=""
            this.form.city.code=""
            this.form.area.name=""
            this.form.area.code=""
         }         
         province.forEach((item,index)=>{
            if(item.value==val){
               this.form.province.name=item.label
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
       changeCity(val,status){
        //    console.log(val)
         //  this.areaList=[]  
         if(!status){
            this.form.area.name=""
            this.form.area.code=""
         }

         this.cityList.forEach((item,index)=>{
            if(item.value==val){
               this.form.city.name=item.label
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
                     this.form.area.name=item3.label  
                    //  this.form.area.code=item3.value  
                     // return true
                  }  
               })                          
            })
         })
       },
       lookDetails(row){
           this.$router.push({name:'parentinfo',query:{id:row.id}})
           setTimeout(()=>{
               this.id=row.id
               this.init()
           },1000)
       }
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
.address{
    .el-select{
        width: 150px;
        margin: 0 10px;
    }
}
.el-table{
    margin-top: 10px;
}
</style>