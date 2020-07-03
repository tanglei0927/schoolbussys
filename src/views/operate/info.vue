<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'operate' }">运营员管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" v-if="isEdit"></el-input>
                    <span v-else>{{form.name}}</span>
                </el-form-item>
                <el-form-item label="性别">
                     <el-select  v-if="isEdit" v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="2"></el-option>
                    </el-select>
                    <span v-else>{{form.sex==1?'男':'女'}}</span>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" v-if="isEdit"></el-input>
                    <span v-else>{{form.age}}</span>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.idCard" v-if="isEdit"></el-input>
                    <span v-else>{{form.idCard}}</span>
                </el-form-item>
                <el-form-item label="学历">
                     <el-select v-if="isEdit"  v-model="form.education" placeholder="请选择学历">
                        <el-option :value="'小学'"></el-option>
                        <el-option :value="'初中'"></el-option>
                        <el-option :value="'高中'"></el-option>
                        <el-option :value="'大专'"></el-option>
                        <el-option :value="'本科'"></el-option>
                        <el-option :value="'硕士'"></el-option>
                        <el-option :value="'博士'"></el-option>
                    </el-select>
                    <span v-else>{{form.education}}</span>
                </el-form-item>
                 <el-form-item label="电话">
                    <el-input v-if="isEdit" v-model="form.phone"></el-input>
                    <span v-else>{{form.phone}}</span>
                </el-form-item>
                 <el-form-item label="紧急联系人">
                    <el-input v-if="isEdit" v-model="form.emergencyContact"></el-input>
                    <span v-else>{{form.emergencyContact}}</span>
                </el-form-item>
                 <el-form-item label="紧急联系人电话">
                    <el-input v-if="isEdit" v-model="form.emergencyContactPhone"></el-input>
                    <span v-else>{{form.emergencyContactPhone}}</span>
                </el-form-item> 
                <el-form-item label="是否有教师资格证">
                    <el-radio-group v-if="isEdit" v-model="form.teacherCertification">
                        <el-radio :label="1">有</el-radio>
                        <el-radio :label="0">没有</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.teacherCertification==1?'有':'没有'}}</span>
                </el-form-item>
                <el-form-item label="是否是超级账号">
                    <el-radio-group v-if="isEdit" v-model="form.isSuperAccount">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">不是</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.isSuperAccount==1?'有':'没有'}}</span>
                </el-form-item>
           <!--     <el-form-item label="省、市、区" v-if="userInfo.isSuperAccount!=1" class="address">
                    <el-select v-model="form.province.code" placeholder="请选择省份" @change="changeProvince">
                        <el-option v-for="(item,index) in provinceList" :label="item.label" :value="item.value"></el-option>                  
                    </el-select> 
                    <el-select v-model="form.city.code" placeholder="请选择城市" @change="changeCity">
                         <el-option v-for="(item,index) in cityList" :label="item.label" :value="item.value"></el-option>                  
                    </el-select> 
                    <el-select v-model="form.area.code" placeholder="请选择区域" @change="changeArea">
                        <el-option v-for="(item,index) in areaList" :label="item.label" :value="item.value"></el-option>                  
                    </el-select> 
                </el-form-item>    -->                           
                 <el-form-item label="详细地址">
                    <el-input v-if="isEdit" v-model="form.detailAddress"></el-input>
                    <span v-else>{{form.detailAddress}}</span>
                </el-form-item>
                <el-form-item label="是否禁用">
                    <el-radio-group v-if="isEdit"  v-model="form.isForbidden">
                        <el-radio :label="1">禁用</el-radio>
                        <el-radio :label="0">不禁用</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.isForbidden==1?'禁用':'不禁用'}}</span>
                </el-form-item>
                  <el-form-item label="账号">
                    <el-input v-model="form.account" v-if="isEdit"></el-input>
                    <span v-else>{{form.account}}</span>
                </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="form.password" v-if="isEdit"></el-input>
                    <span v-else>{{form.password}}</span>
                </el-form-item>
                 <el-form-item class="uplaodbox" label="头像">
                     <img v-if="form.headUrl" :src="$url+'file/readFile/'+form.headUrl" alt="">
                    <el-upload
                        :action="$url+'file/uploadFile'"
                        list-type="picture-card"
                        name="fileName"
                        :show-file-list="false"
                        :on-success="upSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

            </el-form>
            <div class="btns">
                <el-button v-if="isEdit" type="warning" @click="submitInfo()" plain>提交</el-button>
                <el-button v-else type="warning" @click="isEdit=true" plain>修改</el-button>
                <el-button v-if="isEdit" type="primary" @click="isEdit=false" plain>取消</el-button>
                <el-button v-else type="primary" @click="goBack()" plain>返回</el-button>
                <el-button type="warning" v-if="isUpdate" @click="showDraw=true" plain>添加学校</el-button>
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
                age:"",
                idCard:'',
                teacherCertification:1,
                isSuperAccount:1,
                isForbidden:0,
                headUrl:'',
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
			isUpdate:false,
        }
    },
    created(){
       this.provinceList=province
        this.userInfo=JSON.parse(sessionStorage.userInfo)
        if(this.$route.query.id){
            this.title="运营员详情"
            this.id=this.$route.query.id
            this.isEdit=false
            this.init()
			this.isUpdate=true
        }else{
            this.title="添加"
            this.isEdit=true
        }
    },
    methods:{
        changeToSchool(data){
            console.log("选择学校")
            console.log(data)            
            this.showDraw=false
            if(data.id){
                this.$axios.post(this.$url+"mgManager/addSchool",{
                    managerId:this.id,
                    schoolId:data.id
                }).then(res=>{
                    if(res.code==100){
                        this.$message({
                            message:"添加成功！",
                            type:"success"
                        })
                    }
                })
            }
           
        },
        goBack(){
            this.$router.push({name:'operate'})
        },
         upSuccess(res){
            // 图片上传成功
            console.log(res)
            this.form.headUrl=res.info
        },
        submitInfo(){
            console.log("添加，修改")
            // console.log(this.form)
            let data=this.form
            let reg=/^1[3456789]\d{9}$/
            if(!reg.test(data.phone)){
                 this.$message({
                    type:"warning",
                    message:'电话号码格式不正确'
                })
            }else if(!reg.test(data.emergencyContactPhone)){
                 this.$message({
                    type:"warning",
                    message:'紧急联系人电话号码格式不正确'
                })
            }else if(!data.account||!data.password||!data.headUrl||!data.idCard){
                this.$message({
                    type:"warning",
                    message:'请完善信息'
                })
            }else{
                let reqUrl=""
                reqUrl=data.id?"mgManager/update":"mgManager/add"
                let tsMsg=data.id?'修改':'添加'
                if(this.value1){
                     data.birthday=this.$untils.getDate(this.value1)
                }
                console.log(data)
                this.$axios.post(this.$url+reqUrl,data,'application/json').then(res=>{
                    if(res.code==100){                       
                        if(!data.id){
                            // this.goBack()
							// 添加成功，提示去添加学校 info
							  this.$confirm('添加成功，前去添加学校?', '提示', {
							          confirmButtonText: '确定',
							          cancelButtonText: '取消',
							          type: 'warning'
							        }).then(() => {
							          this.id=res.info
									  this.showDraw=true
							        }).catch(() => {
							          this.$message({
							            type: 'info',
							            message: '已取消！'
							          });          
									  setTimeout(()=>{
										  this.goBack()
									  },1000)
							        });
                        }else{
							this.$message({
							    type:"success",
							    message:tsMsg+"成功！"
							})
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
           this.$axios.post(this.$url+"mgManager/detail",{managerId:this.id}).then(res=>{
               if(res.code==100){
                    console.log("少时诵诗22222书")
                   this.form=res.info
                   let codeP=null
                   codeP=res.info.province.code?res.info.province.code:''
                   let codeC=null
                   codeC=res.info.city.code?res.info.city.code:''
                   if(codeP){
                      this.changeProvince(this.form.province.code,true)
                   }else{
                    //    this.form.province.code=10
                    //    this.form.province.name=""
                    //    this.form.city.code=1001
                    //    this.form.city.name=""
                    //    this.form.area.code=10011
                    //    this.form.area.name=""
                   }
                    if(codeC){
                        this.changeCity(this.form.city.code,true)
                    }
               }
           })
       },
        changeProvince(val,status){
         // console.log("省份")
         this.areaList=[]   
         if(!status){
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
</style>