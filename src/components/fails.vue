<template>
    <div class="page">
<div class='body'>
  <div class='boxs' v-for='(items,index) in datas' :key='index'  @click='tap(items)' >
    <div class='title'>
      <div class='carmodule'>{{items.preName}}</div>
      <div class='carname'>{{items.stallNames}}</div>
    </div> 
    <div class='body_box' v-for='(item,index) in items.detailList'  :key='index' @click='taps(item)' v-if='item.authFlag != 0'>
      <div class='top'>
        <img class='mobile_img' src='@/assets/dianhua@2x.png'>
        <div class='mobile'>{{item.mobiles}}</div>
        <div class='right'>{{item.authFlag == 0 ? "" : item.authFlag == 1 ? "已取消" : item.authFlag == 2 ? "已过期" : "已失效" }}</div>
      </div>
      <div class='bottom'>
         <img class='mobile_img' src='@/assets/shijian@2x.png'>
        <div class='mobile'>{{item.startTime}}-{{item.endTime}}</div>
      </div>
    </div>
  </div>
  <img class='add' v-if='show == true' @click='add' src='@/assets/tianjia@2x.png'>
</div>
<!-- loading -->
 <!-- <div style='display:{{loading}}' class='loading'>
    <div class='load-txt'>{{loadingText}}</div>
  </div> -->

    </div>
</template>

<script>
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import Url from "@/libs/url";
export default {
    data(){
        return{
            show: '',
    img: '',
    num: '',
    nums: '',
    preId: '',
    data: '',
    datas: '',
    loading: 'none',
    loadingText: "加载中请稍候",
    stallEndTime: '',
    length: 0
        }
    },
    created(){
        let that = this
        that.shows()
    },
    methods:{
                  //渲染授权记录列表
shows(){
  let that = this
   that.bus.$emit("loading", true);
   that.bus.$emit("tip", { title: "加载中请稍候..." });
   axios.request({
       url:Url.url.user_impower,
       method:'post'
   }).then(res => {
        let ss = []
        res.data.map(res => {
          res.detailList.map(reson => {
            if (reson.authFlag != 0) {
              ss.push(res)
            }
          })
        })
        console.log(ss)
        if (res.data == null) {
           that.bus.$emit("loading", false);
        } else {
            res.data.forEach((items) => {
              items.stallNames = items.stallName + '车位'
              items.detailList.forEach((item) => {
                if (item.mobile == null) {
                  console.log('没有手机号')
                } else {
                  console.log('有手机号')
                  let mobile = item.mobile.substring(0, 3); //要截取字段的字符串
                  let mobiles = item.mobile.substring(7, 11);
                  // console.log(mobile + '****' + mobiles)
                  item.mobiles = mobile + '****' + mobiles
                  // datas.push(item)
                }
              })
            })
          // let datas = []

           that.bus.$emit("loading",false);
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
    }
}
</script>

<style lang="scss" scoped>
        .page{
  width: 100%;
  min-height: 100%;
  background: #f5f4f4;
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
  margin-top: 28px;
  font-size: 28px;
  color: #999;
}
.btn{
  width: 80%;
  margin-top: 138px;
  border-radius: 50px;
  background: #faa901;
  color: white;
  font-size: 34px;
}
.body{
  width: 100%;
  min-height: 100%;
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


