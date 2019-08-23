<template>
<div class="page">
   <div class='bill-true'>
      <div class='group'>
         <div class='list'>停车场
            <div>{{obj.prefectureName}}</div>
         </div>
         <div class='list'>车位号
            <div>{{obj.stallName}}</div>
         </div>
         <div class='list'>车牌号码
            <div>{{obj.plateNumber}}</div>
         </div>
         <div class='list'>开始时间
            <div>{{startTime}}</div>
         </div>
         <div class='list'>结束时间
            <div>{{endTime}}</div>
         </div>
         <div class='list'>停车时长
            <div>{{obj.parkingTime + 1}}</div>
         </div>
      </div>
   </div>
   <div class='bill-true'>
      <div class='group'>
         <div class='list'>应付金额
            <div>{{obj.amount}}元</div>
         </div>
         <div class='lists'>实付金额
            <div style='color:#f66913;' >{{obj.totalAmount}}元</div>
         </div>
      </div>
   </div>
   <div class='btn'>
      <button class='btns' @click='pay' :disabled='disabled'>确认支付</button>
   </div>
</div>
</template>
<script type="text/javascript" charset="UTF-8" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
import axios from "@/libs/api.request";
import Url from "@/libs/url";
import Cookies from "js-cookie";
import wx from "weixin-js-sdk";
export default {
    data(){
        return{
    obj: {},
    ticketTxt: "选择停车券",
    loading: 'none',
    loadingdiv: '加载中请稍候',
    disabled: false,
    startTime:'',
    endTime:'',
    orderId:''
        }
    },
    created(){
        let that = this
        console.log(wx)
        that.orderId = that.$route.query.orderId
          axios
        .request({
          url: Url.url.current
        }).then(res => {
            console.log(res)
            that.obj = res.data
            console.log(that.obj)
function add0(m){return m<10?'0'+m:m }
let time = new Date(res.data.startTime);
let y = time.getFullYear();
let m = time.getMonth()+1;
let d = time.getDate();
let h = time.getHours();
let mm = time.getMinutes();
let s = time.getSeconds();
console.log(y+'/'+add0(m)+'/'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s))
that.startTime = y+'/'+add0(m)+'/'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s)

let times = new Date(res.data.endTime);
let ys = times.getFullYear();
let ms = times.getMonth()+1;
let ds = times.getDate();
let hs = times.getHours();
let mms = times.getMinutes();
let ss = times.getSeconds();
console.log(ys+'/'+add0(ms)+'/'+add0(ds)+' '+add0(hs)+':'+add0(mms)+':'+add0(ss))
that.endTime = ys+'/'+add0(ms)+'/'+add0(ds)+' '+add0(hs)+':'+add0(mms)+':'+add0(ss)

        })

        //获取数据的接口

    },
    methods:{

        pay(){
            let that = this
            axios.request({
                url:Url.url.confirm,
                method:"post",
                params:{
                    couponId:0,
                    orderId:that.orderId,
                    payType:2
                }
            }).then(res => {
                // window.location.href = 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id='+ prepay_id +'&package=' + packages
            })
    },
}
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  background: #fafafa;
  box-sizing: border-box;
  padding-top: 20px;
}
.bill-true{
  width: 100%;
  background: #fff;
  border-top: 1px solid rgb(241, 241, 240);
}
.group{
  width: 100%;
}
.list{
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgb(241, 241, 240);
  line-height: 80px;
  font-size: 30px;
  color: #454245;
  position: relative;
  box-sizing: border-box;
  padding: 0 20px;
}
.lists{
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgb(241, 241, 240);
  line-height: 80px;
  font-size: 30px;
  color: #454245;
    box-sizing: border-box;
  padding: 0 20px;
}
.list:last-child{
  border-bottom: none;
}
div{
  float: right;
}

.go-img{
  width: 22px;
  height: 32px;
  float: right;
  margin: 4px -20px 0 -10px;
  border: 10px solid transparent; 
  background-clip: padding-box;
}
.btn{
  width: 750px;
  height: 164px;
  background: #fff;
  padding-top: 100px; 
}
.btns{
  width: 490px;
  height: 82px;
  background: #f66913;
  border-radius: 60px;
  margin-left: 131px;
  text-align: center;
  color: #fff;
  font-size: 38px;
  line-height: 82px;
  border: none;
  outline: none;
}
</style>


