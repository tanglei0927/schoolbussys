<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'msg' }">消息管理</el-breadcrumb-item>
            <el-breadcrumb-item >详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="warning" @click="goback()" plain>返回</el-button>
        <div class="info cl">
            <h3>{{info.type==1?'家长投诉':(info.type==2?'请假':(info.type==3?'回复':(info.type==4?'安全员群发':'运营员群发')))}}</h3>
            <p><span>发送人：</span>{{info.launchName}} (<em class="redtxt">{{info.launchType==1?'家长':(info.launchType==2?'安全员':'运营员')}}</em> )</p>
            <p><span>接收人：</span>{{info.receiveName}} (<em class="redtxt">{{info.receiveType==1?'家长':(info.receiveType==2?'安全员':'运营员')}}</em> )</p>
            <p><span>发送时间：</span>{{info.createTime}} </p>
            <p><span>读取状态：</span><em :class="info.state==0?'redtxt':(info.state==1?'greentxt':'')">{{info.state==1?'已读':(info.state==2?'已回复':'未读')}}</em> </p>
            <p><span>审核状态：</span><em :class="info.examine==0?'redtxt':(info.examine==1?'greentxt':'')">{{info.examine==1?'通过':(info.examine==2?'审核中':'未通过')}}</em> </p>
            <p><span>内容：</span>{{info.content}}</p>
			<div class="imgs">
				<img v-for="(item,index) in info.photos" :src="imgurl+'file/downloadOss/'+item" alt="">
			</div>
			<div class="cl">
				<p><span>回复内容：</span>{{info.replay}}</p>
			</div>
			<div class="imgs">
				<img v-for="(item,index) in info.replayPhotos" :src="imgurl+'file/downloadOss/'+item" alt="">
			</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            info:{},
            id:null,
			imgurl:''
        }
    },
    created(){
        this.id=this.$route.query.id
		if(this.id==0){
			let info=sessionStorage.msgInfo
			this.info=JSON.parse(info)			
		}else{
			this.init()
		}
		this.imgurl=this.$url
    },
    methods:{
        init(){
            this.$axios.post(this.$url+"mgNews/detail",{
                id:this.id
            }).then(res=>{
                if(res.code==100){
                    this.info=res.info
                }
            })
        },
        goback(){
            this.$router.go(-1)
        },
    }
}
</script>
<style lang="scss" scoped>
em{
    font-style: normal;
    font-size: 14px;
}
.info{
    padding:20px;
    border:1px solid #ccc;
    border-radius: 10px;
    margin-top:20px;
    p{
        line-height: 40px;
        float: left;
        width: 30%;
    }
    p:nth-child(7),p:nth-child(8){
        float: inherit;
    }
    h3{
        text-align: center;
        line-height: 50px;
    }
    span{
        display: inline-block;
        width: 100px;
        color:#999;
        text-align: right;
    }
}
.imgs{
	img{
		width: 200px;
		margin: 10px;
	}
}
</style>