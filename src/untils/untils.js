import md5 from 'js-md5';
// import { once } from 'cluster';
export default{
    timeJx(createTime) {//解析时间
        let time = new Date();
        time.setTime(createTime);
        var timeStr="";
        timeStr=time.getFullYear()+"-"+(time.getMonth()+1<10?"0"+(time.getMonth()+1):(time.getMonth()+1))
        timeStr+="-"+(time.getDate()<10?"0"+time.getDate():time.getDate())+" ";
        timeStr+=(time.getHours()<10?"0"+time.getHours():time.getHours())+":";
        timeStr+=(time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes())+":";
        timeStr+=(time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds());
        return timeStr
    },
    getDate(createTime){
        let time = new Date();
        time.setTime(createTime);
		console.log('生日')
		console.log(time)
        var timeStr="";
        timeStr=time.getFullYear()+"-"+(time.getMonth()+1<10?"0"+(time.getMonth()+1):(time.getMonth()+1))
        timeStr+="-"+(time.getDate()<10?"0"+time.getDate():time.getDate())+" ";
        // timeStr+=(time.getHours()<10?"0"+time.getHours():time.getHours())+":";
        // timeStr+=(time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes())+":";
        // timeStr+=(time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds());
        return timeStr
    },
	getDate2(createTime){
	    let time = new Date(createTime);
	    // time.setTime();
		console.log('生日')
		console.log(time)
	    var timeStr="";
	    timeStr=time.getFullYear()+"-"+(time.getMonth()+1<10?"0"+(time.getMonth()+1):(time.getMonth()+1))
	    timeStr+="-"+(time.getDate()<10?"0"+time.getDate():time.getDate())+" ";
	    // timeStr+=(time.getHours()<10?"0"+time.getHours():time.getHours())+":";
	    // timeStr+=(time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes())+":";
	    // timeStr+=(time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds());
	    return timeStr
	},
    getQianM(){//签名参数  返回数组
        const qianM='x1y4w15iA92Om65A758o9l'        
        var data={}
        var list=[]
        var time=new Date()
        time=time.getTime()
        // time=1574409465154
        data.timestamp=time//时间戳
        var nonce=Math.round(Math.random()*100)
        // nonce=67
        data.nonce=nonce  
        list[list.length]=qianM
        list[list.length]=time
        list[list.length]=nonce
        list.sort()
        var sign=''
        sign=list[0]+''+list[1]+''+list[2]
        sign=sign.toUpperCase()
        // console.log("签名")
        // console.log(sign)
        sign=md5(sign)

        data.sign=sign  
        

        return data
    }
}
