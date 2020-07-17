<template>
     <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'car' }">车辆管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="车牌">
                    <el-input v-model="form.licenseId" v-if="isEdit"></el-input>
                    <span v-else>{{form.licenseId}}</span>
                </el-form-item>
                <el-form-item label="类型">
                     <el-select  v-if="isEdit" v-model="form.type" placeholder="请选择车辆类型">
                        <el-option label="大巴车" :value="1"></el-option>
                        <el-option label="中巴车" :value="2"></el-option>
                        <el-option label="MPV" :value="3"></el-option>
                        <el-option label="校车" :value="4"></el-option>
                    </el-select>
                    <span v-else>{{form.type==1?'大巴车':(form.type==2?'中巴车':(form.type==3?'MPV':'校车'))}}</span>
                </el-form-item>
                <el-form-item label="归属">
                     <el-select v-if="isEdit"  v-model="form.ascription" placeholder="请选择车辆归属">
                        <el-option label="学校" :value="1"></el-option>
                        <el-option label="个人" :value="2"></el-option>
                    </el-select>
                    <span v-else>{{form.ascription==1?'学校':(form.ascription==2?'个人':'')}}</span>
                </el-form-item>
                <el-form-item label="学校">
                    <span style="margin-right:20px;">{{form.schoolNmae}}</span>
                    <el-button v-if="isEdit" type="warning" @click="showDraw=true" plain>选择学校</el-button>
                    <!-- <span v-else>{{form.ascription==1?'学校':(form.ascription==2?'个人':'')}}</span> -->
                </el-form-item>
                <el-form-item label="状态">
                     <el-select v-if="isEdit"  v-model="form.status" placeholder="请选择车辆归属">
                        <el-option label="在职" :value="1"></el-option>
                        <el-option label="不在职" :value="0"></el-option>
                    </el-select>
                    <span v-else>{{form.status==1?'在职':'不在职'}}</span>
                </el-form-item>
                 <el-form-item label="核载人数">
                    <el-input v-if="isEdit" type="number" v-model="form.carriersNumber"></el-input>
                    <span v-else>{{form.carriersNumber}}人</span>
                </el-form-item>
                 <el-form-item label="年检情况">
                    <el-radio-group v-if="isEdit" v-model="form.yearlyInspection">
                        <el-radio :label="1">有</el-radio>
                        <el-radio :label="0">没有</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.yearlyInspection==1?'有':'没有'}}</span>
                </el-form-item>
                <el-form-item label="交强险">
                    <el-radio-group v-if="isEdit" v-model="form.compulsoryInsurance">
                        <el-radio :label="1">有</el-radio>
                        <el-radio :label="0">没有</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.compulsoryInsurance==1?'有':'没有'}}</span>
                </el-form-item>
                <el-form-item label="司机责任险">
                    <el-radio-group v-if="isEdit" v-model="form.driverInsurance">
                        <el-radio :label="1">有</el-radio>
                        <el-radio :label="0">没有</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.driverInsurance==1?'有':'没有'}}</span>
                </el-form-item>
                <el-form-item label="乘客责任险">
                    <el-radio-group v-if="isEdit"  v-model="form.passengerInsurance">
                        <el-radio :label="1">有</el-radio>
                        <el-radio :label="0">没有</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.passengerInsurance==1?'有':'没有'}}</span>
                </el-form-item>
                <el-form-item label="第三责任险">
                    <el-radio-group v-if="isEdit" v-model="form.thirdInsurance">
                        <el-radio :label="1">有</el-radio>
                        <el-radio :label="0">没有</el-radio>
                    </el-radio-group>
                    <span v-else>{{form.thirdInsurance==1?'有':'没有'}}</span>
                </el-form-item>
                 <el-form-item class="uplaodbox" label="行驶证">
                     <img v-if="form.drivingLicense" :src="$url+'file/readFile/'+form.drivingLicense" alt="">
                    <el-upload
                        :action="$url+'file/uploadFile'"
                        list-type="picture-card"
                        name="fileName"
                        :show-file-list="false"
                        :on-success="upSuccess"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="其他说明">
                    <el-input v-if="isEdit" type="textarea" v-model="form.other"></el-input>
                    <span v-else>{{form.other}}</span>
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
            }
        }
    },
    created(){
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
            this.form.schoolNmae=data.name
            this.showDraw=false
        },
        goBack(){
            this.$router.push({name:'car'})
        },
         upSuccess(res){
            // 图片上传成功
            console.log(res)
            this.form.drivingLicense=res.info
        },
        submitInfo(){
            console.log("添加，修改")
            console.log(this.form)
            let data=this.form
            if(!data.licenseId||!data.ascription||!data.carriersNumber||!data.drivingLicense){
                this.$message({
                    type:"warning",
                    message:'请完善信息'
                })
            }else{
                let reqUrl=""
                reqUrl=data.id?"mgVehicle/update":"mgVehicle/add"
                let tsMsg=data.id?'修改':'添加'
                this.$axios.post(this.$url+reqUrl,data).then(res=>{
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
           this.$axios.post(this.$url+"mgVehicle/detail",{id:this.id}).then(res=>{
               if(res.code==100){
                   this.form=res.info
               }
           })
       }
    }
    
}
</script>
<style lang="scss" scoped>
.uplaodbox{
    img{
        width:350px;
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