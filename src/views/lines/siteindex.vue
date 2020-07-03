<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'site' }">站点管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox cl">
            <h3><span>筛选</span></h3>
            <el-form class="cl" ref="form" :model="form" label-width="100px">
                <el-form-item class="schoolinput" label="站点名称：">
                    <el-input placeholder="请输入站点名称" v-model="form.name"></el-input>
                    <el-button type="danger" @click="init()" plain>搜索</el-button>
                    <el-button type="success" @click="showAdd=true" plain>添加</el-button>
                </el-form-item>                   
            </el-form>
        </div>
        <div class="table">
         <el-table
                :data="listData"
                border
                style="width: 800px">
                <el-table-column
                prop="id"
                label="id"
                width="80">
                </el-table-column>                               
                <el-table-column
                prop="name"
                label="站点名称"
                width="200">
                </el-table-column>   
                <el-table-column
                prop="createTime"
                label="是否已删除"
                width="200">
                <template slot-scope="scope">
                    <p :class="scope.row.isDelete==0?'greentxt':''">{{scope.row.isDelete==0?'否':'已删除'}}</p>
                </template>
                </el-table-column>     
                <el-table-column
                prop="createTime"
                label="创建时间"
                width="200">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="lookDetails(scope.row.id)" type="text" size="small">查看详情</el-button>
                    <el-button type="text" @click="changeSite(scope.row)" size="small">修改站点</el-button>
                    <el-button type="text" @click="deleteSite(scope.row)" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page.sync="form.pageNum"
               :page-sizes="[10, 20, 30, 40]"
               :page-size="100"
               layout="total, sizes, prev, pager, next, jumper"
               :total="total">
               </el-pagination>
            </div>
      </div>
      <!-- 添加、修改 -->
      <div class="shadow" v-if="showAdd">
          <div class="box">
              <h3 class="cl">    
               <!-- <el-button type="primary" @click="addSchool()" icon="el-icon-s-claim">保存</el-button> -->
               <!-- <i class=""></i> -->
               <span>添加学校</span>
                <i class="el-icon-close" @click="showAdd=false"></i>
            </h3>
             <el-form class="cl" ref="form" :model="info" label-width="100px">
                <el-form-item class="schoolinput" label="站点名称：">
                    <el-input placeholder="请输入站点名称" v-model="info.name"></el-input>
                </el-form-item> 
                 <el-form-item v-if="info.id" class="schoolinput" label="站点名称：">
                     <el-switch
                    style="display: block"
                    v-model="info.isdelete"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="已删除"
                    inactive-text="未删除">
                    </el-switch>
                </el-form-item> 
                <el-button type="success" @click="isok()" plain>确定</el-button>
            </el-form>
          </div>
      </div>
    </div>
</template>
<script>
export default {
     data(){
        return{
            form:{
                pageNum:1,
                pageSize:10,
                name:''
            },
            info:{
                isdelete:null,
                name:''
            },
            listData:[],
            total:null,
            showAdd:false,
        }
    },
    created(){
        this.init()
    },
    methods:{
         handleSizeChange(val){
            console.log(val)
            this.form.pageSize=val
            this.form.pageNum=1
            this.init()
        },
        handleCurrentChange(val){
            this.form.pageNum=val
            this.init()
        },
        lookDetails(id){
            this.$router.push({name:'siteInfo',query:{id:id}})
        },
        init(){
            this.$axios.post(this.$url+"mgSite/list",this.form).then(res=>{
                if(res.code==100){
                    this.listData=res.info.rows
                    this.total=res.info.total
                }
            })
        },
        changeSite(row){
            this.info.id=row.id
            this.info.isdelete=row.isDelete==1?true:false
            this.info.name=row.name
            this.showAdd=true
        },
        isok(){
            let reqUrl=""
            let data=this.info
            let str=""
            if(this.info.id){
                // 修改
                reqUrl=this.$url+"mgSite/update"
                data.isdelete=data.isdelete?1:0
                str="修改成功"
            }else{
                // 添加
                reqUrl=this.$url+"mgSite/add"
                str="添加成功"
            }
            this.$axios.post(reqUrl,data).then(res=>{
                if(res.code==100){
                    this.$message({
                        message: str,
                        type: 'success'
                    })
                    this.showAdd=false
                    this.init()
                }
            })
        },
        deleteSite(row){
            let that=this
             this.$confirm('是否要删除站点:'+row.name+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    that.$axios.post(that.$url+"mgSite/delete",{id:row.id}).then(res=>{
                        if(res.code==100){
                             that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.init()
                        }
                    })
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.searchbox{
    padding-bottom: 10px;
    .el-input{
        width:250px;
    }
    .el-button{
        float: right;
        margin-right: 10px;
    }
}
.shadow{
    .box{
        width: 300px;
        height: 210px;
    }
   .el-form{
       margin-top: 10px;
       text-align: center;
       .el-switch{
           line-height: 26px;
       }
       .el-button{
           width: 150px;
       }
   }
}
</style>