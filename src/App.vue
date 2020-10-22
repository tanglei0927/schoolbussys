<template>
  <div id="app">
    <router-view/>   
  </div>
</template>
<script>
export default {
  data(){
    return{
      isLogin:true,
	  servier:'1.0'
    }
  },
  created(){
    if(!this.isLogin){
      this.$router.push({name:"About"})
    }
  },
  methods:{

  }, 
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-header {
    background-color: #ffa95b;
    color: #fff;
    line-height: 60px;
    font-size: 16px;
  }
  .el-header i{
    color: #fff;
  }
  .el-aside {
    color: #333;
  }
   .searchbox{
    border:1px solid #EEE;
    border-radius: 10px;
    margin-bottom: 20PX;
    .el-button{
        margin-left: 20px;
    }   
    h3{
        padding: 5px 10px;
        font-size: 16px;
        color: #CCC;
        line-height: 30px;
        span{
            padding-left: 20px;
            border-left: 4px solid #fb823c;
        }
        .el-button{
          float:right;
          text-align: center;
          // padding: 0;
          span{
            border: 0;
            padding: 0;
          }
        }
    }
	.el-form-item{
		// margin-bottom: 20px !important;
	}
}
.el-breadcrumb {
  margin-bottom: 20px;
}
.greentxt{
  color: green;
}
.redtxt{
  color: red;
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
       h3{
         text-align: center;
         position: relative;
         color: #999;
         border-bottom: 1px solid #ccc;
         padding-bottom: 10px;
         font-size: 16px;
         span{
           border:0;
         }
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
            i{
              position: static;
            }
         }
      }
}
  h3{
        color: #ccc;
        font-size: 16px;
        margin-bottom: 10px;
        >span{
            padding-left: 20px;
            border-left:3px solid #fb823c;
        }
        .el-button{
            float: right;
        }
    }
    .el-drawer{
      overflow-x: hidden !important;
      overflow-y: scroll !important;
      .el-input{
        width: 200px;
        margin: 20px;
      }
    }
	.el-form-item{
		margin-bottom: 0px !important;
		.el-input,.el-button,.el-upload,.el-textarea{
			margin-bottom: 20px;
		}
	}
</style>
