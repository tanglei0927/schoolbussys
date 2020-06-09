<template>
    <el-form class="cl" ref="form" :model="form" label-width="80px"> 
        <el-form-item label="省">
            <el-select v-model="form.provinceCode" placeholder="请选择省份" @change="changeProvince">
                <el-option v-for="(item,index) in provinceList" :label="item.label" :value="item.value"></el-option>                  
            </el-select> 
        </el-form-item>
        <el-form-item label="市">
            <el-select v-model="form.cityCode" placeholder="请选择城市" @change="changeCity">
                <el-option v-for="(item,index) in cityList" :label="item.label" :value="item.value"></el-option>                  
            </el-select> 
        </el-form-item>
        <el-form-item label="区">
            <el-select v-model="form.areaCode" placeholder="请选择区域" @change="changeArea">
                <el-option v-for="(item,index) in areaList" :label="item.label" :value="item.value"></el-option>                  
            </el-select> 
        </el-form-item>
    </el-form>
</template>
<script>
import area from "../untils/area"
import province from "../untils/province"
import city from "../untils/city"
export default {
    data(){
        return{
            form:{
            provinceCode:'',
            provinceName:'',
            cityCode:'',
            cityName:'',
            areaName:'',
            areaCode:''
         },
        }
    },
    methods:{
         changeProvince(val){
         // console.log("省份")
         this.areaList=[]        
         this.form.cityName=""
         this.form.cityCode=""
         this.form.areaName=""
         this.form.areaCode=""
         province.forEach((item,index)=>{
            if(item.value==val){
               this.form.provinceName=item.label
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
       changeCity(val){
         //  this.areaList=[]  
         this.form.areaName=""
         this.form.areaCode=""
         this.cityList.forEach((item,index)=>{
            if(item.value==val){
               this.form.cityName=item.label
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
                     this.form.areaName=item3.label  
                     // return true
                  }  
               })                          
            })
         })
       },
    }
}
</script>