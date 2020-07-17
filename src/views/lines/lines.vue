<template>
      <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>线路</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox">
            <h3><span>筛选</span></h3>
              <el-form class="cl" ref="form"  label-width="100px">
                <el-form-item label="学校名称：">
                    <el-input placeholder="请输入学校名称" v-model="schoolName"></el-input>
                    <el-button type="primary" @click="search()">搜索</el-button>
                </el-form-item>
              </el-form>
        </div>
        
        <div class="table">
            <h3 class="cl">
                <span>线路列表</span>
                <el-button type="success" @click="addChange()" plain>添加线路</el-button>
            </h3>
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
                label="线路"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="schoolName"
                label="学校名称"
                width="200">                    
                </el-table-column>
                 <el-table-column
                prop="status"
                label="状态"
                width="130">
                  <template slot-scope="scope">
                       <div>
                           {{scope.row.status==0?'结束':'开启'}}
                        </div>
                    </template>
                </el-table-column> 
                 <el-table-column
                prop="type"
                label="类型"
                width="130">
                  <template slot-scope="scope">
                       <div>
                           {{scope.row.type==1?'早':'晚'}}
                        </div>
                    </template>
                </el-table-column> 
                 <el-table-column
                prop="status"
                label="是否删除"
                width="130">
                  <template slot-scope="scope">
                       <div>
                           {{scope.row.isDelete==0?'否':'是'}}
                        </div>
                    </template>
                </el-table-column> 
                 <el-table-column
                prop="createTime"
                label="创建时间"
               >
                </el-table-column> 
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="updateLines(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" @click="lookDetails(scope.row)" size="small">详情</el-button>
                    <el-button type="text" @click="lineRunDtails(scope.row)" size="small">运行记录</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
            </div>
        </div>
        <div v-if="addShow||updateShow" class="shadow">
            <div class="box">
                <h3>{{updateShow?'修改':'添加'}}
                <i @click="noneBox()" class="el-icon-close"></i>
                </h3>
                <div class="school" @click="changeSchool()"><span>学校：</span>{{form.schoolName?form.schoolName:'请选择'}}</div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="线路名：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                     <el-form-item label="特殊资源">
                        <el-radio-group v-model="form.type">
                        <el-radio :label="1">早</el-radio>
                        <el-radio :label="2">晚</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否删除" v-if="updateShow">
                        <el-radio-group v-model="form.isDelete">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <el-button type="success" @click="submitMsg()">确定</el-button>
            </div>
        </div>

        <el-drawer
            title="学校列表"
            :visible.sync="schoolshow"
            direction="rtl"
            size="50%">
            <el-input v-model="schoolStr" placeholder="请输入学校名称"></el-input>
            <el-button type="success" @click="getSchool()" plain>搜索</el-button>
            <el-table  ref="yunyTable" :data="gridData1">
                <el-table-column property="id" label="id" width="80"></el-table-column>
                <el-table-column property="name" label="学校" ></el-table-column>
                <el-table-column property="name" label="操作">
                 <template slot-scope="scope">
                    <el-button @click="schoolChange(scope.row)" type="text" size="small">确定</el-button>
                </template>
                </el-table-column>
            </el-table>
             <div class="block">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page.sync="pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="schooltotal">
                    </el-pagination>
            </div>
        </el-drawer>
      </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                type:1,
				name:'',
				isDelete:0,
            },
            schoolName:"",
            pageNum:1,
            pageSize:10,
            pageNum1:1,
            pageSize1:10,
            list:[],
            total:"",
            schooltotal:'',
            gridData1:[],
            userInfo:{},
            addShow:false,
            updateShow:false,
            schoolshow:false,
            schoolStr:''
        }
    },
    created(){
        if(sessionStorage.userInfo){
            this.userInfo=JSON.parse(sessionStorage.userInfo)
        }
        this.init()
    },
    methods:{
        handleSizeChange(val){
            console.log(val)
            this.pageSize=val
            this.pageNum=1
            this.init()
        },
        handleCurrentChange(val){
            this.pageNum=val
            this.init()
        },
        handleSizeChange1(val){
            console.log(val)
            this.pageSize1=val
            this.pageNum1=1
            this.init()
        },
        handleCurrentChange1(val){
            this.pageNum1=val
            this.init()
        },
        search(){
            this.pageNum=1
            this.init()
        },
        noneBox(){
            this.addShow=false
            this.updateShow=false
        },
        addChange(){
            this.form={
                type:1
            }
            this.addShow=true
        },
        init(){
            this.$axios.post(this.$url+"mgLine/list",{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                managetId:this.userInfo.id,
                schoolName:this.schoolName
            }).then(res=>{
                this.list=res.info.rows
                this.total=res.info.total
            })
        },
        getSchool(){
            this.$axios.post(this.$url+"mgSchool/list",{
               managetId:this.userInfo.id,
               schoolName:this.schoolStr,
               pageNum:this.pageNum1,
               pageSize:this.pageSize1
           }).then(res=>{
               if(res.code==100){
                   this.gridData1=res.info.rows
                   this.schooltotal=res.info.total   
                //    this.getSite()                   
               }
           })
        },
        changeSchool(){
            this.pageNum1=1
            this.getSchool()
            this.schoolshow=true
        },
        schoolChange(item){
            this.form.schoolId=item.id
            this.form.schoolName=item.name
            this.schoolshow=false
        },
        updateLines(item){
            this.form.schoolId=item.schoolId
            this.form.schoolName=item.schoolName
            this.form.id=item.id
            this.form.name=item.name
            this.form.type=item.type
            this.form.isDelete=item.isDelete
            this.updateShow=true
        },
        submitMsg(){
            // console.log(this.form)
            let urlStr=""
            let tsMsg=""
            if(this.updateShow){
                urlStr="mgLine/update"
                tsMsg="修改"
            }else{
                urlStr="mgLine/add"
                tsMsg="添加"
            }
            this.$axios.post(this.$url+urlStr,this.form).then(res=>{
                if(res.code==100){
                    this.$message({
                        message:tsMsg+"成功！",
                        type:"success"
                    })
                    this.addShow=false
                    this.updateShow=false
                    this.init()
                }
            })
        },
        lookDetails(item){
            this.$router.push({name:'linesdetails',query:{id:item.id}})
        },
        lineRunDtails(row){
            // 线路运行记录
            this.$router.push({name:"run",query:{lineId:row.id}})
        },
    }
}
</script>
<style lang="scss" scoped>
.searchbox .el-input{
    width: 200px;
}
.table{
  
}
.shadow{
    h3{
        margin-bottom: 10px;
    }
    .box{
        width: 300px;
        height: 300px;
        .school{
            font-size: 16px;
            line-height: 40px;
            span{
                display: inline-block;
                width: 80px;
                text-align: center;
            }
        }
        .el-button{
            position: absolute;
            width: 200px;
            left: 0;
            right: 0;
            margin: auto;
            bottom: 10px;
        }
    }
}
.el-drawer{
    .el-input{
        width: 200px;
        margin:0 20px;
    }
}
</style>