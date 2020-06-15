<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name:'run'}">运行记录</el-breadcrumb-item>
            <el-breadcrumb-item >安全报告</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <h3><span>线路：{{form.line+"  "}} 安全员：{{form.security}} 创建时间：{{form.createTime}}</span></h3>
             <el-form class="cl"ref="form" :model="form" label-width="120px"> 
                 <h3><span>车况</span></h3>               
                <el-form-item label="刹车情况：">
                   <el-select disabled="" v-model="form.brake" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车灯情况：">
                   <el-select disabled="" v-model="form.lamp" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="轮胎位置：">
                   <el-select disabled="" v-model="form.tire" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="雨刹检查：">
                   <el-select disabled="" v-model="form.rainBrake" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="后视镜检查：">
                   <el-select disabled="" v-model="form.mirror" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="不安全物品：">
                   <el-select disabled="" v-model="form.unsafeIterms" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item><el-form-item label="救生锤：">
                   <el-select disabled="" v-model="form.lifesavingHammer" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="灭火器：">
                   <el-select disabled="" v-model="form.fireExtinguisher" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="安全门：">
                   <el-select disabled="" v-model="form.emergencyDoor" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>                
             </el-form>
             <el-form class="cl"ref="form" :model="form" label-width="120px"> 
                 <h3><span>司机安全</span></h3>               
                <el-form-item label="是否饮酒：">
                   <el-select disabled="" v-model="form.isDrinkWine" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="鞋子：">
                   <el-select disabled="" v-model="form.shoes" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否疲劳：">
                   <el-select disabled="" v-model="form.fatigue" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否有情绪：">
                   <el-select disabled="" v-model="form.emotion" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否有驾驶经验：">
                   <el-select disabled="" v-model="form.drivingExperience" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="健康检查：">
                   <el-select disabled="" v-model="form.healthy" placeholder="暂无记录">
                        <el-option label="合格" :value="0"></el-option>
                        <el-option label="不合格" :value="1"></el-option>
                    </el-select>
                </el-form-item>                
             </el-form>
             <el-form class="cl"ref="form" :model="form" label-width="120px"> 
                 <h3><span>司机行为监督</span></h3>               
                <el-form-item label="急启情况：">
                   <el-select disabled="" v-model="form.urgentStart" placeholder="暂无记录">
                        <el-option label="没有" :value="0"></el-option>
                        <el-option label="有" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="急刹车：">
                   <el-select disabled="" v-model="form.brakes" placeholder="暂无记录">
                         <el-option label="没有" :value="0"></el-option>
                        <el-option label="有" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="急打方向">
                   <el-select disabled="" v-model="form.rushDirection" placeholder="暂无记录">
                        <el-option label="没有" :value="0"></el-option>
                        <el-option label="有" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="激烈行驶：">
                   <el-select disabled="" v-model="form.drasticDriving" placeholder="暂无记录">
                        <el-option label="没有" :value="0"></el-option>
                        <el-option label="有" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开车过程中打电话：">
                   <el-select disabled="" v-model="form.drivingCalling" placeholder="暂无记录">
                         <el-option label="没有" :value="0"></el-option>
                        <el-option label="有" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开车过程中抽烟：">
                   <el-select disabled="" v-model="form.drivingSmoking" placeholder="暂无记录">
                       <el-option label="没有" :value="0"></el-option>
                        <el-option label="有" :value="1"></el-option>
                    </el-select>
                </el-form-item>                
             </el-form>
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            id:null,
            form:{}
        }
    },
    created(){
        this.id=this.$route.query.id
        this.init()
    },
    methods:{
        init(){
            this.$axios.post(this.$url+"mgLineRecord/boardReport",{
                lineRecordId:this.id
            }).then(res=>{
                if(res.code==100){
                    this.form=res.info
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-form{
    margin-top: 20px;
    .el-form-item{
        display: inline-block;
        width: 50%;
    }
}
</style>