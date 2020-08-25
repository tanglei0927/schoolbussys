<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'site' }">站点管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{form.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <div class="heads">
                <h3><span>站点详情</span></h3>
                <ul>
                    <li><span>站点id:</span>{{form.id}}</li>
                    <li><span>是否已删除:</span>{{form.isDelete?'是':'否'}}</li>
                    <li><span>站点名称:</span>{{form.name}}</li>
                </ul>
            </div>
        </div>
        <!-- 关联的小区列表 -->
        <div class="table">
            <h3 class="cl"><span>关联的小区</span>
                <el-button type="success" @click="addComm()" plain>添加关联小区</el-button>
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
                >
                </el-table-column>  
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="cancelGl(scope.row.id)" type="text" size="small">取消关联</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-drawer
            title="小区列表"
            :visible.sync="xqshow"
            direction="rtl"
            size="40%">
            <div>
                <el-input placeholder="请输入小区名称" v-model="getCom.name" class="zdinput"></el-input>
                <el-button type="primary" @click="getCommunity()">搜索</el-button>
                <el-button type="success" v-show="siteList.length>0" @click="getSite()">关联</el-button>
            </div>
            <el-table  ref="yunyTable" :data="commList" @selection-change="changexqlist">
                 <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column property="id" label="id" width="80"></el-table-column>
                <el-table-column property="name" label="小区" ></el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                    <template slot-scope="scope">
                        <el-button @click="gxXQ(scope.row.id)" type="text" size="small">与站点关联</el-button>
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
        </el-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                name:''
            },
            siteName:"",
            id:null,
            list:[],
            xqshow:false,
            getCom:{
                pageNum:1,
                pageSize:10,
                name:''
            },
            total:'',
            commList:[],
            xqCheck:[],
			siteList:[]
        }
    },
    created(){
        this.id=this.$route.query.id
        this.init()
    },
    methods:{
         handleSizeChange(val){
            console.log(val)
            this.getCom.pageSize=val
            this.getCom.pageNum=1
            this.getCommunity()
        },
        handleCurrentChange(val){
            this.getCom.pageNum=val
            this.getCommunity()
        },
        changexqlist(val){
            console.log(val)
			this.siteList=val
        },
        init(){
            this.$axios.post(this.$url+"mgSite/detail",{
                id:this.id
            }).then(res=>{
                if(res.code==100){
                    this.form=res.info
                }
            })
            this.$axios.post(this.$url+"mgSite/streetSelect",{
                siteId:this.id
            }).then(res=>{
                if(res.code==100){
                    this.list=res.info
                }
            })
        },
        addComm(){
            this.getCom.pageNum=1
            this.getCom.pageSize=10
            this.getCommunity()
            this.xqshow=true
        },
        getCommunity(){
            this.$axios.post(this.$url+"mgStreet/list",this.getCom).then(res=>{
                if(res.code==100){
                    this.commList=res.info.rows
                    this.total=res.info.total
                }
            })
        },
		getSite(){
			// 多选关联
			let list=this.siteList
			let siteIdList=[]
			list.forEach((item,index)=>{
				siteIdList.push(item.id)
			})
			this.gxXQ(siteIdList)
		},
        gxXQ(id){
            // 关联小区
            console.log(id)
			console.log(typeof(id))
			if(typeof(id)=="object"){
				id=id.join(",") 
			}
            this.$axios.post(this.$url+"mgSite/streetAdd",{
                siteId:this.id,
                streetIds:id
            }).then(res=>{
                if(res.code==100){
                     this.$message({
                        type: 'success',
                        message: '关联成功!'
                    });
                    this.xqshow=false
                    this.init()
                }
            })
        },
        cancelGl(id){
            // 取消关联
              this.$axios.post(this.$url+"mgSite/streetDelete",{
                siteId:this.id,
                streetId:id
            }).then(res=>{
                if(res.code==100){
                     this.$message({
                        type: 'success',
                        message: '取消成功!'
                    });
                    this.init()
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
h3{
    span{
        padding-left: 20px;
        border-left: 3px solid #fb823c;
        font-size: 16px;
    }
}
    .heads{
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        // h3{
        //     text-align: center;
        //     color: #999;
        //     line-height: 40px;
        // }
        li{
            display: inline-block;
            width: 32%;
            line-height: 30px;
        }
        li:last-child{
            min-width: 200px;
        }
    }
    .table{
        margin-top: 20px;
        h3{
            margin: 10px 0;
            .el-button{
                float: right;
            }
        }
    }
    .el-drawer{
        .el-button{
            margin: 10px;
        }
    }
</style>