<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'preset' }">预设线路管理</el-breadcrumb-item>
            <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
         </el-breadcrumb>
         <div>
             <div @click="checkSchool()">
                 <p>学校：<span v-if="form.schoolName">{{form.schoolName}}</span> <span v-else style="color: #0D9BF2;">选择学校</span> </p>
             </div>
            <el-form ref="form" :model="form" label-width="100px">
                <!-- <el-form-item label="学校:"> -->
                    <!-- <el-input v-model="form.schoolName" disabled=""  ></el-input> -->
                    <!-- <span>{{form.schoolName}}</span> -->
                    <!-- <span>光谷第二下小雪</span> -->
                <!-- </el-form-item> -->
                <el-form-item label="名称:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>            
                <div>
                    <el-form-item class="price" label="早接价格:">
                        <el-input type="number" v-model="form.morningPrice"></el-input>
                    </el-form-item>
                    <el-form-item class="price" label="晚送价格:">
                        <el-input type="number" v-model="form.nightPrice"></el-input>
                    </el-form-item>
                    <el-form-item class="price" label="全包价格:">
                        <el-input type="number" v-model="form.wholePrice"></el-input>
                    </el-form-item>
                    <el-form-item class="price" label="介绍所得比例:">
                        <el-input type="number" v-model="form.introduceProportion"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="是否上架">
                    <el-select v-model="form.shelf" placeholder="请选择">
                        <el-option label="上架" value="0"></el-option>
                        <el-option label="下架" value="1"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="下架时间:">
                    <el-date-picker
                        v-model="form.closingDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item> 
            </el-form>
            <div class="cl sites">
                <h3><span>添加站点</span></h3>
                <ul class="cl">
                    <li v-for="(item,index) in sites">
                        <i @click="showSite(index)" class="el-icon-edit"></i>
                        <span>站点{{item.order}}：{{item.name}}</span>
                        <i @click="deleteSite(index)" class="el-icon-error"></i>
                    </li>
                   
                    <li class="add" @click="showSite()"><i class="el-icon-plus"></i></li>
                </ul>
            </div>
            <diV class="btns">
                <el-button @click="goAdd()" type="success">确定</el-button>
                <el-button type="warning">取消</el-button>
            </diV>
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
                    <el-button @click="changeSchool(scope.row)" type="text" size="small">确定</el-button>
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
                    :total="schooltotal">
                    </el-pagination>
            </div>
        </el-drawer>
        <el-drawer
            title="站点列表"
            :visible.sync="siteShow"
            direction="rtl"
            size="50%">
            <el-input v-model="siteStr" placeholder="请输入站点名称"></el-input>
            <el-button type="success" @click="getSite()" plain>搜索</el-button>
            <el-table  ref="yunyTable" :data="gridData2">
                <el-table-column property="id" label="id" width="80"></el-table-column>
                <el-table-column property="name" label="站点" ></el-table-column>
                <el-table-column property="name" label="操作">
                 <template slot-scope="scope">
                    <el-button @click="changeSite(scope.row)" type="text" size="small">确定</el-button>
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
                    :total="siteTotal">
                    </el-pagination>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{},
            schoolshow:false,
            gridData1:[],//学校列表
            gridData2:[],//站点列表
            userInfo:{},
            pageNum:1,
            pageSize:10,
            schoolStr:'',//学校列表搜索
            schooltotal:null,
            siteStr:"",//站点搜索
            siteTotal:null,
            siteShow:false,
            siteIndex:null,//修改
            sites:[],//选择的站点列表
            id:null,
            title:"添加预设线路"
        }
    },
    created(){
        if(sessionStorage.userInfo){
            this.userInfo=JSON.parse(sessionStorage.userInfo)
        }
        if(this.$route.query.id){
            this.id=this.$route.query.id
            this.title="编辑预设线路"
            this.init()
        }
    },
    methods:{
         handleSizeChange(val){
            console.log(val)
            this.pageSize=val
            this.pageNum=1
            if(this.schoolshow){
             this.getSchool()
            }else{
                this.getSite()
            }
        },
        handleCurrentChange(val){
            this.pageNum=val
            if(this.schoolshow){
             this.getSchool()
            }else{
                this.getSite()
            }
        },
        checkSchool(){
            console.log("点击选择学校")
            this.pageNum=1
            this.schoolStr=""
            this.getSchool()
            this.schoolshow=true
        },
         getSchool(){
            this.$axios.post(this.$url+"mgSchool/list",{
               managetId:this.userInfo.id,
               schoolName:this.schoolStr,
               pageNum:this.pageNum,
               pageSize:this.pageSize
           }).then(res=>{
               if(res.code==100){
                   this.gridData1=res.info.rows
                   this.schooltotal=res.info.total   
                //    this.getSite()                   
               }
           })
        },
        changeSchool(item){
            this.form.schoolId=item.id
            this.form.schoolName=item.name
            this.schoolshow=false
        },
        getSite(){
             this.$axios.post(this.$url+"mgSite/list",{
               name:this.schoolStr,
               pageNum:this.pageNum,
               pageSize:this.pageSize
           }).then(res=>{
               if(res.code==100){
                   this.gridData2=res.info.rows
                   this.siteTotal=res.info.total   
                //    this.getSite()                   
               }
           })
        },
        showSite(index){
            if(index){
                this.siteIndex=index
            }else{
                this.siteIndex=null
            }
            this.pageNum=1
            this.getSite()
            this.siteShow=true
        },
        changeSite(item){
            // console.log(item)
            let data={}
            if(this.siteIndex){
                // 修改
                this.sites[this.siteIndex].id=item.id
                this.sites[this.siteIndex].name=item.name
            }else{                
                data.id=item.id
                data.name=item.name
                data.order=this.sites.length+1
                this.sites.push(data)
            }
            this.siteShow=false
            
        },
        deleteSite(index){
            // 根据下标删除选中的站点
            let list=this.sites
            list.splice(index,1)
            // console.log(list)
            list.forEach((item,index)=>{
                item.order=index+1
            })
            
            this.sites=list
        },
        init(){
            this.$axios.post(this.$url+"mgProduct/detail",{id:this.id}).then(res=>{
                if(res.code==100){
                    let data=res.info                   
                    this.form=data
                    this.sites=data.sites
                }
            })
        },
        goAdd(){
            let data={}
            let reqUrl=""
            let tsMsg=""
           data=this.form
           let date=new Date(data.closingDate)
           let dateStr=""
            //    console.log(date)
            dateStr+=date.getFullYear()+"-"
            let month=date.getMonth()+1
            dateStr+=month>10?month+"-":"0"+month+"-"
            dateStr+=date.getDate()
            data.closingDate=dateStr
            data.sites=this.sites
            console.log(data)
            if(this.id){
                // 修改
                data.id=this.id
                reqUrl="mgProduct/update"
                tsMsg="修改"
            }else{
                // 添加
                reqUrl="mgProduct/add"
                tsMsg="添加"
            }
            if(!this.form.schoolId){
                this.$message({
                    message: "请选择学校",
                    type: 'error'
                })
            }else{
                this.$axios.post(this.$url+reqUrl,data,'application/json').then(res=>{
                    if(res.code==100){
                        this.$message({
                            message: tsMsg+"成功！",
                            type: 'success'
                        })

                        // if(!this.id){
                            this.$router.push({
                                name:'preset'
                            })
                        // }
                    }
                    // else{

                    // }
                })
            }
           
        }
    }
}
</script>
<style lang="scss" scoped>
$borderColor:#fb823c;
.el-form{
    .el-form-item{
        display: inline-block;
        width: 400px;
    }
    .price{
        width: 250px;
    }
}
h3{
    font-size: 16px;
    padding: 10px 0;
    span{
        padding-left: 20px;
        border-left: 3px solid $borderColor;
    }
}
.sites{
    ul{
        li{
            float: left;
            padding:10px;
            margin: 10px;
             border: 1px dashed $borderColor;
             position: relative;
             span{
                 font-size: 12px;
             }
             i{
                 color: $borderColor;
                font-size: 20px;
             }
             .el-icon-edit{
                margin-right:10px;
             }
             .el-icon-error{
                 position: absolute;
                 right: -10px;
                 top: -10px;
             }
        }
        .add{
            // padding: 10px 30px;
        }
    }
}
.btns{
    text-align: center;
    .el-button{
        margin: 20px;
        width: 100px;
    }
}
.el-drawer{
    overflow-x:hidden;
    overflow-y:scroll;
    .el-input{
        width: 300px;
        margin-right:10px ;
    }
}
</style>