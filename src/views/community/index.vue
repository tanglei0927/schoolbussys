<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>小区管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchbox">
            <h3><span>筛选</span></h3>
            <el-form>
                <el-form-item label="小区名称：">
                    <el-input placeholder="请输入小区名称" v-model="commNmae"></el-input>
                    <el-button type="primary" @click="init()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <h3 class="cl">
                <span>线路</span>
                <el-button type="success" @click="addChange()" plain>添加小区</el-button>
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
                label="小区名称"
                width="120">
                </el-table-column>
                 <el-table-column
                prop="province"
                label="省"
                width="200">                    
                </el-table-column>               
                 <el-table-column
                prop="city"
                label="城市"
                width="130">
                </el-table-column> 
                 <el-table-column
                prop="area"
                label="区"
               >
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
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="deleteXq(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" @click="addChange(scope.row.id)" size="small">编辑</el-button>
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
        <!-- 添加，修改 -->
        <div class="shadow" v-if="addShow">
            <div class="box">
                <h3>{{form.id?'修改':'添加'}}
                <i @click="addShow=false" class="el-icon-close"></i>
                </h3>
                <el-form label-width="80px">
                    <el-form-item label="名称">
                        <el-input  v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="省">
                        <el-select v-model="form.province.code" placeholder="请选择省份" @change="changeProvince">
                            <el-option v-for="(item,index) in provinceList" :label="item.label" :value="item.value"></el-option>                  
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="市">
                        <el-select v-model="form.city.code" placeholder="请选择城市" @change="changeCity">
                            <el-option v-for="(item,index) in cityList" :label="item.label" :value="item.value"></el-option>                  
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="区">
                        <el-select v-model="form.area.code" placeholder="请选择区域" @change="changeArea">
                            <el-option v-for="(item,index) in areaList" :label="item.label" :value="item.value"></el-option>                  
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="是否删除">
                        <el-radio-group v-model="form.isDelete">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button class="btns" type="success" @click="addXq()" plain>确定</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import area from "../../untils/area"
import province from "../../untils/province"
import city from "../../untils/city"
export default {
    data(){
        return{
            commNmae:'',
            list:[],
            pageNum:1,
            pageSize:10,
            total:null,
            provinceList:[],
            cityList:[],
            areaList:[],
            addShow:false,
            form:{
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
                name:'',
                isDelete:0,
            },
        }
    },
    created(){
        this.init()
       this.provinceList=province

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
        changeProvince(val,status){
         // console.log("省份")
         this.areaList=[]   
         if(!status)     {
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
        init(){
            this.$axios.post(this.$url+"mgStreet/list",{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                name:this.commNmae
            }).then(res=>{
                if(res.code==100){
                    this.list=res.info.rows
                    this.total=res.info.total
                }
            })
        },
        deleteXq(row){
            // 删除小区
            this.$confirm('是否要删除小区：'+row.name+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios.post(this.$url+"mgStreet/delete",{
                        id:row.id
                    }).then(res=>{
                        if(res.code==100){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.init()
                        }else if(res.code==250){
                             this.$message({
                                type: 'warning',
                                message: res.mssg
                            });
                        }
                    })
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            }); 
        },
        addChange(id){
            // 点击添加或编辑
            if(id){
                // 编辑
                this.$axios.post(this.$url+"mgStreet/detail",{id:id},'').then(res=>{
                    if(res.code==100){
                        this.form=res.info
                        this.changeProvince(this.form.province.code,true)
                        this.changeCity(this.form.city.code,true)
                    }
                })
            }else{
                this.form={
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
                        name:'',
                        isDelete:0,
                    }
            }
            this.addShow=true
        },
        addXq(){
            let reqUrl=""
            let tsMsg=''
            if(this.form.id){
                // 修改
                reqUrl='mgStreet/update'
                tsMsg="修改"
            }else{
                reqUrl='mgStreet/add'
                tsMsg="添加"
            }
            if(!this.form.name){
                this.$message({
                    message:"请填写小区名称",
                    type:"warning"
                })
            }else if(!this.form.area.code){
                this.$message({
                    message:"请选择省市区",
                    type:"warning"
                })
            }else{
                console.log(this.form)
                this.$axios.post(this.$url+reqUrl,this.form,'application/json').then(res=>{
                    if(res.code==100){
                        this.$message({
                            message:tsMsg+"成功！",
                            type:"success"
                        })
                        this.addShow=false
                        this.init()
                    }
					// else if(res.code==250){
     //                     this.$message({
     //                        message:res.msg,
     //                        type:"warning"
     //                    })
     //                }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.searchbox{
   
}
.el-form{
    margin-top:10px;
    
}
 .el-input{
        width: 220px;
    }
.box{
    width: 400px;
    height:400px;
}
.btns{
    display: block;
    margin: auto;
    width: 150px;
}
</style>