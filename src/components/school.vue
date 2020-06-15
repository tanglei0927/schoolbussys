<template>
     <el-drawer
            title="学校列表"
            :visible.sync="show"
            direction="rtl"
            :before-close="closeDraw"
            size="50%">
            <el-input v-model="schoolStr" placeholder="请输入学校名称"></el-input>
            <el-button type="success" @click="init()" plain>搜索</el-button>
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
</template>
<script>
export default { 
    props:['show'],
    data(){
        return{
            pageSize:10,
            pageNum:1,
            userInfo:{},
            gridData1:[],
            schooltotal:[],
            schoolStr:'',
            form:{}
        }
    },
    created(){
        this.userInfo=JSON.parse(sessionStorage.userInfo)
        this.init()
    },
    methods:{
        closeDraw(){
            console.log("关闭前")
            let data=this.form
            this.$emit("changeToSchool",data)
        },
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
         init(){//获取学校列表
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
        changeSchool(row){
            let data={}
            data.id=row.id
            data.name=row.name
            this.form=data
            this.$emit("changeToSchool",data)
        },
        
    },
}
</script>
<style lang="scss" scoped>

</style>