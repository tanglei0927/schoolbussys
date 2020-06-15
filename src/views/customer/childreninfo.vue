<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'children' }">学生管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" v-if="isEdit"></el-input>
                    <span v-else>{{form.name}}</span>
                </el-form-item>
                 <el-form-item label="家长">
                    <!-- <el-input v-model="form.prentName" v-if="isEdit"></el-input> -->
                    <span>{{form.prentName}}</span>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-if="isEdit" v-model="form.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.sex==1?'男':'女'}}</span>
                </el-form-item>
                <el-form-item label="学校">
                    <span style="margin-right:20px;">{{form.schoolNmae}}</span>
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
                 <el-form-item label="站点">
                     <span>{{form.siteName}}</span>
                </el-form-item>
                 <el-form-item label="产品ID">
                    <span >{{productInfo.productId}}</span>
                </el-form-item>
                 <el-form-item label="产品名称">
                    <span >{{productInfo.productName}}</span>
                </el-form-item>
                 <el-form-item label="产品类型">
                    <span >{{productInfo.productType==1?'早':(productInfo.productType==2?'晚':'全包')}}</span>
                    <!-- <span>{{productInfo.productType}}</span> -->
                </el-form-item>
                 <el-form-item label="有效期">
                    <span >{{form.closeDate}}</span>
                </el-form-item>
                <el-form-item label="是否录入人脸识别">
                    <span>{{form.haveFaceRecognitionIdentification==1?'已录入':'未录入'}}</span>
                </el-form-item>
                
                 <el-form-item class="uplaodbox" label="头像">
                     <img v-if="form.photo" :src="$url+'eaOss/download/'+form.photo" alt="">
                </el-form-item>

            </el-form>
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
                drivingLicense:''
            },
            productInfo:{},//产品信息
        }
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
                data.birthDate=this.$untils.getDate(this.value1)
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
</style>