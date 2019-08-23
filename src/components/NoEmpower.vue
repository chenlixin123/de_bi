<template>
<div class="big_boxs">
    <div class="tab">
      <div :class="tab == 1 ? 'tab2' : 'tab1'" @click="tab1">授权</div>
      <div :class="tab == 2 ? 'tab2' : 'tab1'" @click="tab2">出租</div>
    </div>
<div class="big_box1" v-if="tab == 1">
    <div class='img_box' v-if='img == true'>
<div class='line'></div>
  <img class='img' src='@/assets/noCartupian@2x.png'>
  <div class='img_title'>完成车位授权</div>
  <div class='img_text'>您的朋友也可以使用您的长租车位哦!</div>
  <button class='btns' @click='add'>添加授权</button>
   <div class='fail' @click='fail' v-if='length != 0'>查看已失效的授权</div>
</div>

<div class='body' v-if='show == true'>
  <div class='boxs' v-for='(item,index) in datas' :key='index'  @click='tap(item)'>
    <div class='title'>
      <div class='carmodule'>{{item.preName}}</div>
      <div class='carname'>{{item.stallNames}}</div>
    </div>
    <div class='body_box' v-for='(item,index) in item.detailList'  :key='index' @click='taps(item)'>
      <div class='top'>
        <img class='mobile_img' src='@/assets/dianhua@2x.png'>
        <div class='mobile'>{{item.mobiles}}</div>
        <div class='name' v-if="item.username != ''">({{item.username}})</div>
        <div class='right'>{{item.authFlag == 0 ? "" : item.authFlag == 1 ? "已取消" : item.authFlag == 2 ? "已过期" : "已失效" }}</div>
      </div>
      <div class='bottom'>
         <img class='mobile_img' src='@/assets/shijian@2x.png'>
        <div class='mobile'>{{item.startTime}}-{{item.endTime}}</div>
      </div>
    </div>
  </div>
  <div class='fail' @click='fail' v-if='length != 0'>查看已失效的授权</div>
  <img class='add' v-if='show == true' @click='add' src='@/assets/tianjia@2x.png'>
</div>
</div>

<div class="big_box1" v-if="tab == 2">
    <div class='img_box' v-if='imgs == true'>
<div class='line'></div>
  <img class='img' src='@/assets/noCartupian@2x.png'>
  <div class='img_title'>长租车位闲时出租，他人可预约使用</div>
  <div class='img_text'>出租长租车位，收益在“钱包”中查看</div>
  <button class='btns' @click='adds'>发布车位</button>
  <div class='fail' @click='longrentfails' v-if='length != 0'>查看失效的出租记录</div>
</div>

<div class='body' v-if='show1 == true'>
  <div class='boxs' v-for='(item,index) in datas' :key='index'  @click='tap(item)'>
    <div class='title'>
      <div class='carmodule'>{{item.preName}}</div>
      <div class='carname'>{{item.stallNames}}</div>
    </div>
    <div class='body_box' v-for='(item,index) in item.detailList'  :key='index' @click='taps(item)'>
      <div class='top'>
        <img class='mobile_img' src='@/assets/dianhua@2x.png'>
        <div class='mobile'>{{item.mobiles}}</div>
        <div class='name' v-if="item.username != ''">({{item.username}})</div>
        <div class='right'>{{item.authFlag == 0 ? "" : item.authFlag == 1 ? "已取消" : item.authFlag == 2 ? "已过期" : "已失效" }}</div>
      </div>
      <div class='bottom'>
         <img class='mobile_img' src='@/assets/shijian@2x.png'>
        <div class='mobile'>{{item.startTime}}-{{item.endTime}}</div>
      </div>
    </div>
  </div>
  <div class='fail' @click='longrentfails' v-if='length != 0'>查看失效的出租记录</div>
  <img class='add' v-if='show == true' @click='adds' src='@/assets/tianjia@2x.png'>
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
      show:'',
      img:'',
      show1:'',
      imgs:'',
      num:'',
      nums:'',
      preId:'',
      data:'',
      datas:'',
      stallEndTime:'',
      tab:1,
      length:0
        }
    },
    created(){
            let that = this
            console.log(that)
            that.shows()
            that.rentList()
    },
    methods:{
      longrentfails(){
          let that = this
          that.$router.push({
            path:'/longrentfail'
          })
      },
      fails(){
           let that = this
          that.$router.push({
            path:'/fails'
          })
      },
      //跳转发布页面
      adds(){
          let that = this
          that.$router.push({
            path:'/Release'
          })
      },
      //tab切换
      tab1(){
          let that = this
          that.tab = 1
      },
      tab2(){
           let that = this
          that.tab = 2
      },
      //跳转失效授权
      fail(){
          let that = this
          that.$router.push({
            path:'/fails'
          })
      },
      //渲染出租记录列表
      rentList(){
          let that = this
          that.bus.$emit("loading", true);
          that.bus.$emit("tip", { title: "加载中请稍候..." });
          axios.request({
            url:Url.url.rent_list,
            method:'post'
          }).then(res => {
                console.log(res.data.length)
                if(res.data.length == 0){
                  that.imgs = true
                }else{
                  that.show1 = true
                }
          })
      },
          //渲染授权记录列表
shows(){
  let that = this
   that.bus.$emit("loading", true);
   that.bus.$emit("tip", { title: "加载中请稍候..." });
   axios.request({
       url:Url.url.user_impower,
       method:'post'
   }).then(res => {
        console.log(res)
          let ss = []
      res.data.map(res => {
        res.detailList.map(reson => {
          if(reson.authFlag == 0){
            ss.push(res)
          }
        })
      })
      console.log(ss)
         if(res.data == null){
         that.img = true,
          that.show = false
       that.bus.$emit("loading", false);
        console.log('111111111111')
        console.log(that.img)
      }else{
          let datas = []
        let data = []
        res.data.map(reson => {
          reson.detailList.map(resons => {
            if (resons.authFlag == 0){
              datas.push(resons.authFlag)
            }else{
              data.push(resons.authFlag)
            }
            
          })
        })
         console.log(datas.length)
        console.log(data.length)
        that.length = data.length
         if (datas.length == 0){
            that.show = false,
            that.img = true
        }else{
           that.show = true,
            that.img = false
             res.data.forEach((items) => {
          items.stallNames = items.stallName + '车位'
          items.detailList.forEach((item) => {
            if (item.mobile == null){
                console.log('没有手机号')
            }else{
              console.log('有手机号')
              let mobile = item.mobile.substring(0, 3); //要截取字段的字符串
              let mobiles = item.mobile.substring(7, 11);
              // console.log(mobile + '****' + mobiles)
              item.mobiles = mobile + '****' + mobiles
            // datas.push(item)
            }
          })
        })
        }
        that.bus.$emit("loading", false);

         function deteleObject(obj) {
            var uniques = [];
            var stringify = {};
            for (var i = 0; i < obj.length; i++) {
              var keys = Object.keys(obj[i]);
              keys.sort(function (a, b) {
                return (Number(a) - Number(b));
              });
              var str = '';
              for (var j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(obj[i][keys[j]]);
              }
              if (!stringify.hasOwnProperty(str)) {
                uniques.push(obj[i]);
                stringify[str] = true;
              }
            }
            return uniques;
          }
          that.datas =  deteleObject(ss)
      }
   })
},
//点击进入详情
tap(e){
  console.log(e)
  let that = this
  that.data = e
   that.bus.$emit("loading", true);
   that.bus.$emit("tip", { title: "加载中请稍候..." });
  let data = JSON.stringify(that.data);
  let datas = JSON.stringify(that.datas);
  console.log(that.datas.authFlag)
  if (that.datas.authFlag == 0){
    that.$router.push({
      path: '/Impowers?data=' + data + '&datas=' + datas,
    })
    that.bus.$emit("loading", false);
  }else{
    that.$router.push({
      path: '/pastdue?data=' + data + '&datas=' + datas,
    })
    that.bus.$emit("loading", false);
  }
 
},
taps(e){
  console.log(e)
  let that = this
    that.datas =  e
},
//跳转可授权车位页面
add(){
  let that = this 
 that.bus.$emit("loading", true);
 that.bus.$emit("tip", { title: "加载中请稍候..." });
 axios.request({
     url:Url.url.sure,
     method:'get'
 }).then(res => {
    
     that.num = res.data.length
     res.data.map(res => {
        console.log(res)
          that.nums =  res.stalls.length,
          that.carname = res.preName,
          that.preId = res.preId
        console.log(res)
        res.stalls.map(res => {
            console.log(res)
              that.name = res.stallName,
              that.stallId = res.stallId,
              that.stallEndTime = res.stallEndTime
        })
      })
      console.log(that.carname,that.nums)
          if (that.num > 1 || that.nums > 1){
           that.$router.push({
    path: '/addImpower'
  })
         that.bus.$emit("loading", false);
  console.log('11111111111111')
      }else{
        that.$router.push({
          path: '/carImpower?num=1' + "&carname=" + that.carname + "&name=" + that.name + "&preId=" + that.preId + "&stallId=" + that.stallId + '&stallEndTime=' + that.stallEndTime
        })
      that.bus.$emit("loading", false);
        console.log('22222222222222222222')
      }
 })
  console.log('跳转车位授权页面')
 
},
    },
    destroyed() {

    }
}
</script>

<style scoped>
.big_boxs{
  width: 100%;
  min-height:100%;
  box-sizing: border-box;
  padding-top: 74px;
  background: #f5f4f4;
  display: flex;
}
.tab{
  width: 100%;
  height: 74px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: white;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
}
.tab1{
  height: 100%;
  text-align: center;
  line-height: 74px;
  font-size: 30px;
  color: #666;
}
.tab2{
  height: 100%;
  text-align: center;
  line-height: 74px;
  font-size: 30px;
  border-bottom: 3px solid #faa901;
  color: #faa901;
}
    .big_box1{
  width: 100%;
  min-height:100%;
  background: #f5f4f4;
  box-sizing: border-box;
  /* padding-bottom: 20px; */
}
.line{
  border-top: 1px solid rgb(243, 240, 240);
}
.img_box{
  width: 100%;
  height: 100%;
  text-align: center;
  background: white;
}
.img{
  width: 170px;
  height: 190px;
  margin: 0 auto;
  margin-top: 180px;
}
.img_title{
  margin-top: 58px;
  font-size: 32px;
  color: #333;
}
.img_text{
  margin-top: 20px;
  font-size: 28px;
  color: #999;
  margin-bottom: 138px;
}
.btns{
  width: 80%;
  height: 80px;
  /* margin-top: 138px; */
  border-radius: 50px;
  background: #faa901;
  border: none;
  outline: none;
  color: white;
  font-size: 34px;
}
.body{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 25px;
}
.title{
  width: 100%;
  height: 50px;
  font-size: 26px;
  color: #999;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-top: 20px;
}
.carname{
  margin-left: 22px;
}
.body_box{
  width: 690px;
  height: 170px;
  background: white;
  box-sizing: border-box;
  padding: 34px 24px;
  border-radius: 8px;
  position: relative;
  margin-top: 20px;
}
.top{
  display: flex;
  align-items: center;
}
.bottom{
   display: flex;
  align-items: center;
  margin-top: 26px;
}
.mobile_img{
  width: 28px;
  height: 28px;
}
.mobile{
  margin-left: 16px;
  font-size: 28px;
  color: #333;
}
.name{
   font-size: 28px;
  color: #333;
}
.right{
  position: absolute;
  top: 34px;
  right: 24px;
  font-size: 24px;
  color: #999;
}
.add{
  width: 98px;
  height: 98px;
  position: fixed;
  bottom: 80px;
  right: 30px;
}
.fail{
 margin-top: 48px;
  font-size: 28px;
  color: #999;
  text-align: center;
}
</style>


