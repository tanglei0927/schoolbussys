<template>
    <div class="comm">
        <p class="linename">线路名:{{info}}</p>
        <ul class="cl" :style="'width:'+(list.length*80+30)+'px;'">
            <li v-for="(item,index) in list"  @click="checkSites(item)">
                <p>
                    <img src="../assets/img/sy_008.png" alt="">
                    <i :class="checkSite==item.id?'check':''"></i>
                </p>
                <span :class="checkSite==item.id?'checktxt':''">{{item.name}}</span>
            </li>
        </ul>
    </div>    
</template>
<script>
export default {
    props:['info','list','checkSite'],
    data(){
        return{
           checkNum:null 
        }
    },
      methods:{
        checkSites(val){
            this.$emit('changeSite',val)
        }
        
    }
}
</script>
<style lang="scss" scoped>
.comm{
    width: 100%;
    // overflow-x: scroll;
    // overflow-y: hidden;
    .linename{
        line-height: 40px;
        color: #999;
    }
}
ul{
    li{
        width: 80px;
        float: left;
        text-align: right;
        p{
            width: 100%;
            height: 15px;
            background: #81cfe8;
            text-align: center;
            img{
                height: 10px;
                margin-bottom: 5px;
            }
            i{
                float: right;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #fff;
            }
            .check{
                border: 2px solid #fff;
                background: #fb823c;
                box-sizing: border-box;
            }
        }
        span{
            display: inline-block;
            width: 15px;
        }
        .checktxt{
            color:#fb823c;
        }
    }
}
</style>