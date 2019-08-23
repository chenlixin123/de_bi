<template>
  <div class="page">
    <div class="body" v-for="(item,index) in msg" :key="index">
        <div class="box_title">车区名称:{{item.name}}</div>
        <div class="car_where">车区地址:{{item.address}}</div>
        <button class="btn_appointment" @click="park(item)">预约停车</button>
        <button class="btn_long" @click="mypark(item)">我的车位</button>
    </div>

    <!-- 首部长租车位黄色提示框-->
    <div class="module" v-if="show == 'true'" @click="mypark">
      <img class="weizhi" src="@/assets/chewei@2.png">
      <div class="text">您正在使用{{long_name}}[{{names}}]车位</div>
      <img class="you" src="@/assets/you@2.png">
    </div>
      <!-- 首部预约车位橘黄色提示框-->
    <div class="modules" v-if="appointments == 'true'" @click="parks">
      <img class="weizhi" src="@/assets/yuyue@2x.png">
      <div class="text">{{downFlag}}{{long_name}}[{{names}}]车位</div>
      <img class="you" src="@/assets/you@2.png">
    </div>

    <!-- 首页授权标识 -->
    <img class="empower" src="@/assets/shouquan@2x.png" alt="" @click="empower" v-if="show_impower == true">
  </div>
  
</template>

<script>
// var wx = require('weixin-js-sdk');
import wx from 'weixin-js-sdk';
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import Url from "@/libs/url";
export default {
  name: "List",
  data() {
    return {
      msg: [],
      long_name: "",
      names: "",
      shows: "",
      show: "",
      appointment:'',
      appointments:'false',
      num:0,
      show_impower:'',
      longitude: "116.41361",
      latitude: "39.91106",
      downFlag:'' //车位的状态
    };
  },
  created() {
    let that = this;
    console.log(Url.url.current)
    // let wexinPay = (data,cb,errorCb) => {
    //   console.log(data)
    //   console.log(cd)
    // }
    localStorage.setItem('tap',0)
    let token = that.$route.query.token;
    // token = '888ab41ed5a442cd86f32809b7ca8060'
    // token = '2d5c574581c447f9ab4e6fbd224b7233'
    //  window.jhajax = this.jhajax;
    console.log(token)
    if(token == undefined){
       console.log('5555555555')
      token = Cookies.get("tokens");
    }
    console.log(token)
    this.jhajax(token);
     axios
        .request({
          url: Url.url.current,
          method:'get'
        })
        .then(res => {
          console.log(res)
          that.appointment = res.data
          if(res.data.downFlag == 0){
            that.downFlag = '您已预约'
          }else if(res.data.downFlag == 1){
            that.downFlag = '您正在使用'
          }else{
              that.downFlag = '您有一笔订单未支付，请前往支付'
          }
          if(res.data == null){
            that.appointments = 'false'
          }else{
            that.long_name = res.data.prefectureName,
            that.names = res.data.stallName
            that.appointments = 'true'
          }
        })
        //获取车牌列表的接口
        axios
        .request({
          url: Url.url.plate_list,
          method: "get"
        })
        .then(res => {
          console.log(res);
          that.num = res.data.length
        });
        console.log(that.num)
    // window.jhajax({
    //   token:'e6e3d2145d5b46c1a2caa072c1771c96',
    //   data:1,
    //   groupId:64,
    //   })
    //  window.jhajax(
    //   token='c2fb6980c0284a99ba3ef24a96ec6c6a',
    //   )

    axios
      .request({
        url: Url.url.long_current,
        method: "get"
      })
      .then(res => {
        console.log(res);
        if (res.data.status == false) {
          (that.shows = "none"), localStorage.setItem("oo", false);
          that.show = localStorage.getItem("oo");
        } else {
          (that.shows = "block"),
            (that.names = res.data.stallName),
            (that.long_name = res.data.preName);
          localStorage.setItem("oo", true);
          that.show = localStorage.getItem("oo");
          
        }
      });
      that.show_impowers()
  },
//   mounted(){
//       axios.request({
//   method: 'post',
//   url: 'http://my.service.com/index.php/opcode/6002',
//   data:{ url:location.href.split('#')[0] } //向服务端提供授权url参数，并且不需要#后面的部分
// }).then((res)=>{
//   console.log(res)
//   wx.config({
//     debug: true, // 开启调试模式,
//     appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
//     timestamp: res.timestamp, // 必填，生成签名的时间戳
//     nonceStr: res.nonceStr, // 必填，生成签名的随机串
//     signature: res.signature,// 必填，签名，见附录1
//     jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//   });
// })
//   },
  methods: {
    jhajax(token) {
      let that = this
      // alert(token);
       that.bus.$emit("loading", true);
       that.bus.$emit("tip", { title: "加载中请稍候..." });
    //  var u = navigator.userAgent;
    //  console.log(u)
      console.log(token);
      Cookies.set("tokens", token);
      localStorage.setItem("token", token);

      //请求车场列表接口  渲染列表
      axios
        .request({
          url: Url.url.car_list,
          method: "get"
        })
        .then(res => {
          console.log(res)
          this.msg = res.data;
           that.bus.$emit("loading", false);
        });
    },
    //是否显示授权标识
    show_impowers(){
      let that = this
        axios.request({
          url:Url.url.show_impower,
          method:"get"
        }).then(res => {
          console.log(res)
          if (res.status == true){
            // console.log(res.data.authFlag)
            that.show_impower = res.data.authFlag
            // console.log(that.show_impower)
        }
        })
    },
    // 跳转预约车位
    park(item) {
      console.log(item);
      let that = this
      let oo = localStorage.getItem("oo");
      let token = Cookies.get("tokens");
      if (oo == "true") {
        that.bus.$emit("tips", { show: true, title: "您正在使用长租车位" });
      } else {
        console.log(that.appointment)
          if(that.appointment == null){
            if(that.num == 0){
            this.$router.push({
          path: "/addcarmodule?num=2",
        });
            }else{
          this.$router.push({
          path: "/Parking",
          query: {
            groupId: item.groupId,
            token:token
          }
        });
            }
          }else{
             that.$router.push({
              path: "/Order"
            });
          }
       
      }
    },
    parks(){
      let that = this
         that.$router.push({
              path: "/Order"
            });
    },
    // 跳转长租
    mypark(e) {
      console.log(e.groupId)
      localStorage.setItem('groupId',e.groupId)
      let that = this
      console.log('长租');
      let token = Cookies.get("tokens");
      let oo = localStorage.getItem("oo");
      console.log(oo);
      if(that.appointments == 'true'){
        that.bus.$emit("tips", { show: true, title: "您正在使用预约车位" });
      }else if (oo == "true") {
        console.log("详情页");
        this.$router.push({
          path: "/Park",
          query:{
            skip:1,
             token:token,
             latitude: that.latitude,
             longitude : that.longitude,
          }
        });
      } else {
        // that.num = 0
        if(that.num == 0){
            this.$router.push({ 
          path: "/nocarmodule",
           });
        }else{
          axios.request({
            url:Url.url.long_carLists,//查看长租用户车位列表
            method:"post",
            params: {
                    latitude: that.latitude,
                    longitude: that.longitude
                  },
          }).then(res =>{
            console.log(res)
            if(res.data.num == 0){
                that.$router.push({
                  path:'/nocarmodule'
                })
            }else if(res.data.num > 1){
               localStorage.setItem("num", res.data.num);
                console.log("选车位页");
              this.$router.push({ 
               path: "/Choice",
                query:{
                  token:token,
                  latitude: that.latitude,
                  longitude : that.longitude
                      }
                  });
            }else{
              localStorage.setItem("num", res.data.num);
              console.log('xiamg')
              this.$router.push({ 
               path: "/Park",
                query:{
                  token:token,
                  latitude: that.latitude,
                  longitude : that.longitude,
                  skip:1
                      }
                  });
            }
          })      
        }
      }
    },

    // 跳转授权页面
    empower(){
        let that = this
        that.$router.push({
          path:'/NoEmpower'
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,
html {
  background: #f5f4f4 !important;
}
.page {
  width: 100%;
  height: 100%;
  background: #f5f4f4;
  box-sizing: border-box;
  padding-top: 24px;
}
.body{
  width: 690px;
  height: 250px;
  background: white;
  margin: 0 auto;
  margin-bottom: 30px;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 34px 30px 32px 30px;
}
.box_title{
  font-size: 30px;
  color: #333;
}
.car_where{
  font-size: 26px;
  color: #666;
  margin-top: 28px;
  margin-bottom: 32px;
}
.btn_appointment{
  width: 134px;
  height: 46px;
  line-height: 46px;
  font-size: 24px;
  color: #f66913;
  background: white;
  border-radius: 10px;
  margin-left: 310px;
  border:1px solid #f66913;
  outline: none;
}
.btn_long{
   width: 134px;
  height: 46px;
  line-height: 46px;
  font-size: 24px;
  color: #faa901;
  background: white;
  border-radius: 10px;
  margin-left: 20px;
  border:1px solid #faa901;
  outline: none;
}

.module {
  width: 690px;
  height: 60px;
  line-height: 60px;
  border-radius: 60px;
  background: #faa901;
  opacity: 0.68;
  position: absolute;
  top: 0px;
  left: 30px;
  align-items: center;
  font-size: 28px;
  color: #ffffff;
  box-sizing: border-box;
}
.modules {
  width: 690px;
  height: 60px;
  line-height: 60px;
  border-radius: 60px;
  background: #f66913;
  opacity: 0.68;
  position: absolute;
  top: 0px;
  left: 30px;
  align-items: center;
  font-size: 28px;
  color: #ffffff;
  box-sizing: border-box;
}
.weizhi {
  width: 26px;
  height: 26px;
  margin-top: 17px;
  margin-left: 50px;
  margin-right: 20px;
  float: left;
}
.you {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 48px;
  bottom: 14px;
}
.text {
  width: 73%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.empower{
  width: 80px;
  height:80px;
  position: absolute;
  top: 50%;
  right: 0px;
}
</style>
