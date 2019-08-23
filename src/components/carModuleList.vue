<template>
<div class="page">
    <div class='plate-number'>
  <div class='plate-box'>
    <div class='add-plate' @click='goAddPlate'>添加车牌号</div>
    <div class='plate-list' v-for="(item,index) in plateList" :key="index">
      <div>{{item.vehMark}}</div>
      <img @click='delPlate(item)' class='del-img' src='@/assets/chepaihaoguanli_cuowu@3x.png'>
    </div>
    </div>
    </div>
<div class='show' v-if='shows3'>
  <div class='shoes'>
    <div class='shan'>删除车牌号</div>
    <div class='content'>{{context}}</div>
    <div class='context'>
      <div class='fail' @click='xiao'>取消</div>
      <div class='conpont' @click='dels'>确定</div>
    </div>
  </div>
</div>

 <!-- 预约成功跳转页面弹窗 -->
    <div class="boxxs" v-if="showss == 'true'">
      <div class="center">
        <div class="top">
          <div class="text">您已经添加三个车牌号，如果您需要添加新的车牌号，请先删除一个不常用的车牌！</div>
        </div>
        <div class="bottomss">
          <div class="left" @click="suss">确定</div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import Url from "@/libs/url";
export default {
    data(){
        return{
    plateList: [], //车牌列表
    shows1: false,
    names: '',
    battery: '',
    gatewayStatus: '',
    data: [],
    shows2:false,
    nums:'',
    id:'',
    //本地经纬度
    location: {
      longitude: "116.41361",
      latitude: "39.91106"
    },
    context:'确定要删除车牌号',
    hidden:'none',
    shows3:false,
    plateid:'',
    showss:'false',
    num:''
        }
    },
    created(){
          let that = this;
          console.log(that.$route.query.num)
          that.num = that.$route.query.num
      axios
        .request({
          url: Url.url.plate_list,
          method: "get"
        })
        .then(res => {
          console.log(res);
          that.plateList = res.data,
          that.data = res.data
        });
    },
    methods:{
      xiao() {
        let that = this
      that.shows1 = false,
      that.shows2 =false,
      that.shows3 = false
  },
  suss(){
    let that = this
    that.showss = 'false'
  },
   //添加车牌
  goAddPlate() {
    let that = this
    if (that.plateList.length == 3) {
     that.showss = 'true'
    } else {
     that.$router.push({
       path:'/addcarmodule?num=' + that.num
     })
    }
  },
  //删除车牌
  delPlate(e) {
    let self = this;
    let that = this
    console.log(e)
    let ss = []
    self.data.map((res) => {
      console.log(res)
      if (res.vehMark == e.vehMark && res.rentPlateFlag == true) {
        ss.push(res.vehMark)
      }
    })
    console.log(ss[0])
    console.log(e.vehMark)
    let oo = localStorage.getItem('oo')
    console.log(oo)
    let preName = localStorage.getItem('preName')
    let stallName = localStorage.getItem('stallName')
    if (e.vehMark == ss[0]) { 
        let num = e.vehMark;
        let plateid = e.id;
          that.context = '确定要删除车牌号[' + num + ']' + '?\r\n删除后将失去月租车位地锁使用权限',
          that.shows3 = true,
          that.plateid = plateid
    } else {
      let num =  e.vehMark;
      let plateid = e.id;
        that.context = '确定要删除车牌号[' + num + ']' + '?',
        that.shows3 = true,
        that.plateid = plateid
    }
  },
   dels(){
    let self = this
    let that = this 
      self.shows3 = false
    axios.request({
      url:Url.url.del_plate + '?id=' + self.plateid,
      method:'DELETE'
    }).then(res => {
      console.log(res)
      if(res.status == true){
        that.bus.$emit("tips", { show: true, title: "删除成功" });
      }
      axios
        .request({
          url: Url.url.plate_list,
          method: "get"
        })
        .then(res => {
          console.log(res);
          that.plateList = res.data,
          that.data = res.data
        });
    })
   }
}
}
</script>

<style scoped lang='scss'>
    .page {
  background: #fafafa;
}

.plate-number {
  width: 100%;
  background: #fff;
  margin-top: 20px;
}

.plate-box {
  margin-left: 30px;
}

.add-plate {
  width: 690px;
  height: 88px;
  line-height: 88px;
  color: #f66913;
  font-size: 32px;
  border-bottom: 1px solid rgb(245, 243, 243);
}

.plate-list {
  width: 690px;
  height: 88px;
  line-height: 88px;
  color: #454245;
  font-size: 32px;
  position: relative;
  border-bottom: 1px solid rgb(245, 243, 243);
}

.del-img {
  width: 36px;
  height: 36px;
  position: absolute;
  right: 0;
  top: 26px;
}

.starts{
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
background: rgba(0,0,0,0.6);
z-index: 1100;
}
.begin{
width: 80%;
background: #fff;
position: absolute;
top: 36%;
left: 10%;
border-radius: 14px; 
font-size: 28px;
color: #666;
border-bottom: 1px solid #f0efef;
padding: 36px 0;
text-align:center;
}
.con{
width: 100%;
text-align: center;
margin-top: 40px;
margin-bottom: 70px;
}
.caos{
width: 100%;
font-size: 30px;
color: #333;
display:flex;
justify-content: space-between;
margin:0 auto;
margin-top:30px;
}
.ones{
width: 50%;
text-align: center;
}
.fails{
width:90%;
height: 0.1px;
margin: 0 auto;
border-top: 0.5px solid #cfcccc;
}
.one{
color: #999999;
}
.on{
color: #f66913;
}
.begins{
width: 80%;
background: #fff;
position: absolute;
top: 36%;
left: 10%;
border-radius: 14px; 
font-size: 28px;
color: #666;
border-bottom: 1px solid #f0efef;
box-sizing: border-box;
padding: 36px 0px;
text-align: center;
}
.cons{
  margin-bottom: 30px;
  font-size: 36px;
  color: black;
}
.conss{
  margin-bottom: 20px;
}
.co{
  margin-bottom: 10px;
}
.one1{
  color: #f66913;
}
.show{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
}
.shoes{
  width: 80%;
  margin: 55% auto;
  background: #fff;
  border-radius: 12px;
}
.shoes .shan{
  width: 100%;
  font-size: 34px;
  color: #333;
  line-height:110px;
  text-indent:1.5em;
}
.content{
  width: 90%;
  font-size: 34px;
  color: #666;
  margin-bottom:40px;
  margin-left:40px;
  line-height:60px;
}
.context{
  width: 100%;
  border-top: 1px solid #dedede;
  display: flex;
  text-align: center;
  line-height: 110px;
}
.context .fail{
  width: 50%;
  border-right: 1px solid #dedede;
  font-size: 32px;
  color: #f66913;
}
.context .conpont{
  width: 50%;
  font-size: 32px;
  color: #969595;
}
.boxxs {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .center {
    width: 80%;
    background: white;
    margin: 60% auto;
    border-radius: 10px;
    .top {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 38px 50px;
      .text {
        line-height: 60px;
        font-size: 34px;
        color: #333;
      }
    }
    .bottomss {
      width: 100%;
      height: 120px;
      display: flex;
      line-height: 120px;
      font-size: 38px;
      border-top: 1px solid rgb(230, 226, 226);
      .left {
        width: 100%;
        height: 100%;
        text-align: center;
      }
    }
  }
}
</style>


