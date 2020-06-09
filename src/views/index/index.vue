<template>
    <div class="page">
        <div class="searchbox cl">
            <h3><span>筛选</span>
                <!-- <el-button type="primary" @click="getStatic()">确认</el-button> -->
            </h3>
            <el-form class="cl"ref="form" :model="form" label-width="80px">
                <el-form-item label="选择：">
                    <el-select v-model="form.region" placeholder="请选择学校">
                        <el-option v-for="(item,index) in schoolList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间：">
                   <el-date-picker
                        v-model="date"
                        type="date"
                        @change="changeDate"
                        placeholder="选择日期"
                        format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" @click="getStatic()">确认</el-button>
            </el-form>
        </div>
        <!-- 统计数字 -->
        <ul class="topbox cl">
            <li>
                <h4>{{staticInfo.transportTimes?staticInfo.transportTimes:'0'}}</h4>
                <p>昨日运输人次</p>
            </li>
            <li>
                <h4>{{staticInfo.driveOutTimes?staticInfo.driveOutTimes:'0'}}</h4>
                <p>昨日车次数</p>
            </li>
            <li>
                <h4>{{staticInfo.income?staticInfo.income:'0'}}</h4>
                <p>昨日收入</p>
            </li>
        </ul>
        <ul class="bottombox cl">
            <li>
                <h4>{{staticInfo.schools?staticInfo.schools:'0'}}</h4>
                <p>当前学校数</p>
            </li>
            <li>
                 <h4>{{staticInfo.lineTimes?staticInfo.lineTimes:'0'}}</h4>
                <p>当前线路</p>
            </li>
            <li>
                 <h4>{{staticInfo.inputStudents?staticInfo.inputStudents:'0'}}</h4>
                <p>当前用户总数</p>
            </li>
            <li>
                 <h4 class="txtred">{{staticInfo.signUpStudents?staticInfo.signUpStudents:'0'}}</h4>
                <p>实际乘坐数</p>
            </li>
        </ul>
    </div>    
</template>
<script>
// import axios from "axios";

export default {
    data(){
        return{
            form:{},
            schoolList:[],
            userInfo:{},
            schoolId:null,
            staticInfo:{},
            date:null
        }
    },
    created(){
        let date=new Date()
        let time=""
        time=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()-1)
        this.form.date=time
        this.date=new Date(time)
        if(sessionStorage.userInfo){
            this.userInfo=JSON.parse(sessionStorage.userInfo)
        }else{
            this.$router.push({name:"login"})
        }
        this.getSchool()
        this.getStatic()
    },
    methods:{
        changeDate(val){
            // console.log("日期修改")
            // console.log(val)
            this.form.date=this.$untils.getDate(val)
            // console.log(this.form.date)
        },
        getSchool(){
            console.log(this.form.region)
            console.log("学校列表")
            this.$axios.post(this.$url+"mgSchool/listSimple",{
                managetId:this.userInfo.id,
                schoolName:""
            }).then(res=>{
                if(res.code==100){
                    // console.log("数据数据")
                    this.schoolList=res.info
                }
            })   
        },
        getStatic(){
            this.$axios.post(this.$url+"mgManager/statistics",{
                date:this.form.date,
                schoolId:this.form.region,
                managerId:this.userInfo.id
            }).then(res=>{
                if(res.code==100){
                   this.staticInfo=res.info 
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>

.el-form-item,.el-time-picker{
    float: left;
    width: 300px;
}
.topbox,.bottombox{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    li{
         float: left;
        text-align: center;
        padding: 10px 0;
        border-right:1px solid #ccc;
        box-sizing: border-box;
         h4{
            line-height: 30px;
            border: 0;
            text-align: center;
            font-size: 18px;
            // color: #ffa95b;
            color:#66b1ff;
        }       
        p{
            font-size: 14px;
        }
    }
    li:last-child{
        border: 0;
    }
    .txtred{
        color: #fb823c;
    }
}
.topbox{   
    li{       
        width: 30%;            
    }
    li:nth-child(2){
        width: 40%;
    }
}
.bottombox{
    margin-top: 10px;
    li{
        width: 25%;
    }
}

</style>