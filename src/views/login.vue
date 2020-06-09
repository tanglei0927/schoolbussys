<template>
  <div class="login">
  <!-- <img src="../assets/img/sy_001bj.png" alt=""> -->
      <div class="box">
        <h3>智享校车后台管理系统</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
        </el-form>

          <el-button v-if="flag" type="danger" @click="login()">登录</el-button>
          <el-button v-else type="warning" disabled :loading="true">加载中</el-button>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      height:"",
      form:{},
      flag:true
    }
  },
  created(){
    this.height=document.body.offsetHeight
    console.log(this.height)
   
  },
  mounted(){
    let page=document.getElementsByClassName("login")[0]
    // console.log(page)
    page.style="height:"+this.height+"px;"
  },
  methods:{
    login(){
      // 登录
      if(!this.form.password){
        this.$message({
          message: '请输入密码',
          type: 'error'
        });
      }else if(!this.form.account){
          this.$message({
            message: '请输入账号',
            type: 'error'
          });
      }else{
        this.flag=false
        console.log("登录")
        this.$axios.post(this.$url+"mgManager/login",this.form).then(res=>{
          this.flag=true
          if(res.code==100){
              this.$message({
                message: "登录成功！",
                type: 'success'
              });
              sessionStorage.userInfo=JSON.stringify(res.info)
              this.$router.push({name:"index"})
              // console.log
          }else if(res.code==250){
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  width: 100%;
  // height: 100%;
  background: url("../assets/img/dl_001.png") no-repeat;//sy_001bj
  background-size: 100% 100%;
  position: relative;
  .box{
    width: 430px;
    height: 300px;
    background: #fff;
    border-radius: 10px;
    border:2px solid #eee;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    text-align: center;
    h3{
      color:#ccc;
      font-weight: normal;
      line-height: 50px;
      letter-spacing: 5px;
    }
    .el-form{
      width: 90%;
      margin-top:10px;     
    }
    .el-button{
      width: 90%;
      // margin:auto;
    }
  }
}
</style>
