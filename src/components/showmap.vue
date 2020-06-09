<template>
 <div class="map-chart">
  <div id="container" ref="container" />
  <div id="myPageTop">
   <!-- <table>
    <tr>
     <td>
      <label>请输入关键字搜索：</label>
     </td>
    </tr>
    <tr>
     <td>
      <input id="tipinput">
     </td>
    </tr>
   </table> -->
  </div>
 </div>
</template>
 
<script>
export default {
 name: 'Map',
 props: ['lngs'],
 data() {
  return {
   placeSearch: null
  }
 },
 mounted() {
  this.mapInit()
  console.log("地图加载")
  if(this.$props.lngs.length>0){
    this.addMarker(this.$props.lngs)
  }
 },
 methods: {
   addMarker(lngs){
      let map = new AMap.Map(this.$refs.container, {
        resizeEnable: true
      }) 
     let marker=new AMap.Marker({
       position:lngs,
     })
     console.log("添加标点")
     marker.setMap(map)
   },
  mapInit() {
   const map = new AMap.Map(this.$refs.container, {
    resizeEnable: true
   }) // 创建Map实例
   const options = {
    'showButton': true, // 是否显示定位按钮
    'buttonPosition': 'LB', // 定位按钮的位置
    'buttonOffset': new AMap.Pixel(10, 20), // 定位按钮距离对应角落的距离
    'showMarker': true, // 是否显示定位点
    'showCircle': true, // 是否显示定位精度圈
    'circleOptions': {// 定位精度圈的样式
     'strokeColor': '#0093FF',
     'noSelect': true,
     'strokeOpacity': 0.5,
     'strokeWeight': 1,
     'fillColor': '#02B0FF',
     'fillOpacity': 0.25
    },
    zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
   }
   AMap.plugin(['AMap.Geolocation'], function() {
    const geolocation = new AMap.Geolocation(options)
    map.addControl(geolocation)
    geolocation.getCurrentPosition()
   })
   const _this = this
   AMap.event.addListener(map, 'click', function(e) {
    map.clearMap() // 清除地图上所有添加的覆盖物
    new AMap.Marker({
     position: e.lnglat,
     map: map
    })
    _this.handleMap(e.lnglat.getLng(), e.lnglat.getLat())
    console.log("点击点击")
    console.log(e)
    _this.geocoder(e.lnglat.lat,e.lnglat.lng)
   })
 
   // 输入提示
   const autoOptions = {
    input: 'tipinput'
   }
   const auto = new AMap.Autocomplete(autoOptions)
   this.placeSearch = new AMap.PlaceSearch({
    map: map
   }) // 构造地点查询类
   AMap.event.addListener(auto, 'select', this.select)// 注册监听，当选中某条记录时会触发
   AMap.event.addListener(this.placeSearch, 'markerClick', function(e) {
    _this.$emit('bMapDate', e.data.location.lng, e.data.location.lat)
   })
  },
  select(e) {
   this.placeSearch.setCity(e.poi.adcode)
   this.placeSearch.search(e.poi.name) // 关键字查询查询
  },
  handleMap(o, a) {
   this.$emit('bMapDate', o, a)
  },
  changeadd(data){
       this.$emit("changeAddress",data)
  },
  geocoder(lnglatX, lnglatY, cityCode) {
      let that=this
			AMap.plugin('AMap.Geocoder', function() {
			  var geocoder = new AMap.Geocoder({
			    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
			    city: '010'
			  })			 
			  var lnglat = [lnglatY,lnglatX]
			  // var lnglat = [114.317111,30.526408]			
			  geocoder.getAddress(lnglat, function(status, result) {
				  console.log('获取结果')
				  console.log(lnglat)
				  console.log(result)
			    if (status === 'complete' && result.info === 'OK') {
			        // result为对应的地理位置详细信息
                    let info=result.regeocode
                    let data={}
                    data.address=info.formattedAddress
                    data.province=info.addressComponent.province
                    data.city=info.addressComponent.city
                    data.area=info.addressComponent.district
                    data.longitude=lnglatY
                    data.latitude=lnglatX
                   that.changeadd(data)
			    }
			  })
			})	        
	        
	    },
	   geocoder_CallBack(data) {
	        var geocode = data.regeocode;
			console.log(geocode)
	        // $('span.address_z').html(geocode.formattedAddress);//获取到的详细地址
	    }
 }
}
</script>
 
<style scoped>
  .map-chart{
    position: relative;
    margin-bottom:15px;
    width: 100%;
    height: 260px;
    border: 1px #dddddd solid;
  }
  /deep/ .amap-logo,/deep/ .amap-copyright {
    display: none!important;
  }
 
  #container {
    margin-bottom:15px;
    width: 100%;
    height: 260px;
    border: 1px #dddddd solid;
    z-index: 99999999;
  }
 
  .button-group {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 12px;
    padding: 10px;
  }
 
  .button-group .button {
    height: 28px;
    line-height: 28px;
    background-color: #0D9BF2;
    color: #FFF;
    border: 0;
    outline: none;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 3px;
    margin-bottom: 4px;
    cursor: pointer;
  }
  .button-group .inputtext {
    height: 26px;
    line-height: 26px;
    border: 1px;
    outline: none;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 3px;
    margin-bottom: 4px;
    cursor: pointer;
  }
  #tip {
    background-color: #fff;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute;
    font-size: 12px;
    right: 10px;
    top: 20px;
    border-radius: 3px;
    border: 1px solid #ccc;
    line-height: 30px;
  }
  .amap-info-content {
    font-size: 12px;
  }
  #myPageTop {
    position: absolute;
    top: 5px;
    right: 10px;
    background: #fff none repeat scroll 0 0;
    border: 1px solid #ccc;
    margin: 10px auto;
    padding:6px;
    font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
    font-size: 14px;
    z-index: 99999999;
  }
  #myPageTop label {
    margin: 0 20px 0 0;
    color: #666666;
    font-weight: normal;
  }
  #myPageTop input {
    width: 170px;
  }
  #myPageTop .column2{
    padding-left: 25px;
  }
</style>