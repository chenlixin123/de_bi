<template>
<div class="hours-con container" v-wechat-title="$route.meta.title">
        
<div class="mypark">
  <div class='line'></div>
<div class='top_title'>
    <div>
        {{prename}}{{underLayer}}
    </div>
    <div class='top_right'>{{val}}车位</div>
</div>
<div class='time' v-if='userStatus == 0'>有效期：{{validity}}</div>
<div class='time' v-if='userStatus == 1'>有效期：{{validitys}}</div>
<img class='imgNumber' :src='src' v-if="ying == true">
<div class='electric' v-if='unusualBattery == 0'>
    <img class='electric_img' src='@/assets/dianliang@2x.png'>
    <div class='electric_text'>电量不足</div>
</div>
<div class='leave' v-if='gatewayStatus == 0'>车位已离线</div>

<div class='rights'>
<div  class='right_top' @click='qie' v-if='num > 1'>
    <img class="right_top_img" src='@/assets/qiehuan@2x1.png'>
    切换
</div>
<div  class='right_center' @click='record' v-if='userStatus  == 1'>
    <img class="right_center_img" src='@/assets/jilu@2x.png'>
    记录
</div>
<div class='right_bottom' @click='malfunction'>
    <img class="right_bottom_img" src='@/assets/guzhang@2x.png'>
    故障
</div>
<div  class='carwhere' @click='carwhere' v-if='userStatus == 0'>
    <img src='@/assets/where.png'>
    找车位
</div>
</div>

<div class='user_message'  v-if='stallStatus == 2 && useUserName != null'>
  <div class='user'>使用人</div>
  <div class='user_name'>{{useUserName == null ? '' : useUserName}}</div>
</div>
<div class='down_timees' v-if='stallStatus == 2 && downLockTime != null'>
  <div class='down_text'>降锁时间</div>
  <div class='down_times'>{{downLockTime}}</div>
</div>
<div class='down_time' v-if="stallStatus == 1 && useUpLockTime != null">
  <div class='down_text'>上次使用时间</div>
  <div class='down_times'>{{useUpLockTime}}</div>
</div>

<div class='bottom'>
  <div @click='top'>
    升起
  </div>
  <div @click='bottom'>
    降下
  </div>
</div> 

  <div style='display:loading' class='loading'>
    <div class='load-txt'>{{loadingText}}</div>
  </div>

  <!-- 降锁，再降一次 -->
<div class='starts' v-if='begins == true'>
  <div class="begin">
    <div class='con'>{{aligns}}</div>
    <div class='fails'></div>
    <div class='caos'>
      <div class='ones one' @click='xiao'>取消</div>
      <div class='ones oo' @click='ones'>{{ss}}</div>
    </div>
  </div>
</div>

<!-- 升锁提示框 -->
<div class='starts' v-if='top_block == true'>
  <div class="begin">
    <div class='con'>车位在被{{useUserName == null ? useUserMobile : useUserName}}使用中,请确认车位无车辆停放再升锁</div>
    <div class='fails'></div>
    <div class='caos'>
      <div class='ones one' @click='tops'>升锁</div>
      <div class='ones oo' @click='xiao'>取消</div>
    </div>
  </div>
</div>

<div class='box' v-if='show == true'>
  <div class='body'>
    <div class='top'>您正在使用长租[{{val}}]车位</div>
    <div class='bottoms' @click='shows'>确定</div>
  </div>
</div>


<div class='bodys' v-if='shows1'>
  <div class='boxs'>
    <div class='tops'>
      <div class='title'>长租车位注意事项</div>
      <div class='contents'>
          <img class='imgs' src='@/assets/jiangxiadisuo@2x.png'>
          <div class='contents_right'>
            <div class='right_tops'>降下地锁</div>
            <div class='right_bottoms'>车辆到达车位后降下地锁</div>
          </div>
      </div>
       <div class='contents'>
          <img class='imgs' src='@/assets/shengqidisuo@2x.png'>
          <div class='contents_right'>
            <div class='right_tops'>升起地锁</div>
            <div class='right_bottoms'>车辆驶离车位后升起地锁</div>
          </div>
      </div>
    </div>
    <div class='bottomss'>
        <div class='bottomss_left' @click='noshow'>不再提示</div>
        <div class='bottomss_right' @click='know'>知道了</div>
    </div>
  </div>
</div>

</div>
 </div>
</template>

<script>
import axios from "@/libs/api.request";
import Url from "@/libs/url";
import Cookies from "js-cookie";
export default {
  name: "Mypark",
  data() {
    return {
       prename:'',
    plate:'',
    endtime:'',
    val:'',
    num:'',
    datas:[],
    self:true,
    stallId:'',
    loading: "none",
    loadingText: "",
    begins: false,
    aligns:'地锁升起失败,再升一次',
    s : 0,
    ss:'',
    battery:'',
    gatewayStatus:12,//网关状态 0离线 1在线
    show:false,
    shows1:false,
    latitude:"",
    longitude:"",
    validity:'' ,//到期时间
    isUserRecord:'',//是否显示使用记录 0显示  1不显示
    isUserUse:'',
    downLockTime:'',//降锁时间
    stallStatus:'',//当前是否有用户使用 0无 1有
    lockStatus:'',//锁状态 1升起  2降下
    unusualBattery:-1,//异常电量 0低于30 1大于30
    useUpLockTime:'',//上次使用时间
    useUserMobile:'',//使用用户电话
    userStatus:'',//用户状态 1授权人 0被授权人  
    useUserName:'',//用户姓名
    src:'',//图片路径
    data:'',
    data1:'',
    validitys:'',
    number:0,
    underLayer:'',
    title:'',
    ying:false,
    qies:0,
    ji:0,
    malfunctions:0,
    top_block:false,
    preId:''
    };
  },
  created() {
    let that = this;
    that.num = localStorage.getItem("num");
    console.log(that.num);
    that.bus.$emit("loading", true);
    that.bus.$emit("tip", { title: "加载中请稍候..." });
    localStorage.setItem("path", 1);
    that.token = localStorage.getItem("token");
    Cookies.set("tokens", that.token);
    let oo = localStorage.getItem("oo");
     
    if (that.$route.query.skip == 1){
      that.latitude = that.$route.query.latitude,
      that.longitude = that.$route.query.longitude
      console.log('11111111111111')
      axios.request({
        url:Url.url.long_carLists,
        method:'post',
        params:{
             latitude: that.latitude,
             longitude: that.longitude
        }
      }).then(res => {
        console.log(res)
        if (res.status == true) {
            res.data.rentUsers.map(res => {
              res.rentUserStalls.map(res => {
                localStorage.setItem('carname', res.stallName)
                if (res.gatewayStatus == 0) {
                    that.unusualBattery = 1
                } else {
                    that.unusualBattery = res.unusualBattery
                }
                if (res.userStatus == 1){
                  that.$route.meta.title = '我的车位'
                  console.log( that.$route.meta.title)
                }else{
                  that.$route.meta.title = '授权车位'
                }
                  that.userStatus = res.userStatus,
                console.log(res)
                if (res.gatewayStatus == 1) { //判断网关在线
                  if (res.stallStatus == 2) { //判断车位状态 2占用
                      that.src = require('@/assets/zaixianshiyongzhong@2x.png') 
                  } else {

                    if (res.lockStatus == 1) { //判断锁升起
                      if (res.userStatus == 1) { //判断授权人
                          that.src = require('@/assets/zhaunyongzaixian_suoshengqi@2x.png')
                      } else {
                          that.src = require('@/assets/zaixianshouquan_suoshengqi@2x.png')
                      }

                    } else {
                        that.src=require('@/assets/suojiangxia@2x.png')
                    }
                  }
                } else {
                  if (res.stallStatus == 2) { //判断车位状态 2占用
                      that.src = require('@/assets/zaixianshiyongzhong@2x.png')
                  } else{
                    if (res.lockStatus == 1) {
                      if (res.userStatus == 1) {
                          that.src = require('@/assets/zhaunyonglixian_suoshengqi@2x.png')
                      } else {
                         that.src = require('@/assets/shouquanlixian_suoshengqi@2x.png')
                      }

                    } else {
                        that.src = require('@/assets/lixiansuojiangxia@2x.png')
                    }
                  }
                }
                let time = new Date(res.validity);
                console.log(res.validity)
                let y = ((time.getFullYear()).toString()).substring(2, 4)
                let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
                let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
                let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
                let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
                let validity = y + '-' + m + '-' + d + ' ' + h + ':' + mm
                let validitys = y + '-' + m + '-' + d 

                  that.validity = validity,
                  that.validitys = validitys,
                  that.prename = res.preName,
                  that.val = res.stallName,
                  that.isUserRecord = res.isUserRecord,
                  that.downLockTime = res.downLockTime,
                  that.stallStatus = res.stallStatus,
                  that.lockStatus = res.lockStatus,
                  that.useUpLockTime = res.useUpLockTime,
                  that.useUserMobile = res.useUserMobile,
                  that.userStatus = res.userStatus,
                  that.useUserName = res.useUserName,
                  that.gatewayStatus = res.gatewayStatus,
                  that.stallId = res.stallId,
                  that.isUserUse = res.isUserUse ,
                  that.underLayer = res.underLayer,
                  that.preId = res.preId

                console.log(that.isUserUse, '--------- isUserUse')
                console.log(that.useUserName,that.useUserMobile)
                 that.bus.$emit("loading", false);
                 that.ying = true
              })
            })
          }else{
            console.log(res.message.content)
          }
      })
    }else{
      console.log('222222222222222')
       let data = JSON.parse(that.$route.query.data)
    let data1 = JSON.parse(that.$route.query.data1)
      if (data.gatewayStatus == 0) {
          that.unusualBattery = 1
      } else {
          that.unusualBattery = data.unusualBattery
      }
      console.log(data)
    console.log(data1)
        that.data = data,
        that.data1 = data1,
        that.latitude = data1.latitude,
        that.longitude = data1.longitude,
        that.isUserUse = data.isUserUse 
      localStorage.setItem('carname', data.stallName)
      if (data.userStatus == 1) {
         that.$route.meta.title = '我的车位'
          //  console.log( that.$route.meta.title)
      } else {
         that.$route.meta.title = '授权车位'
        //  console.log( that.$route.meta.title)
      }
      console.log(that.isUserUse, '--------- isUserUse')
      if (data.gatewayStatus == 1) { //判断网关在线
        if (data.stallStatus == 2) { //判断车位状态 2占用
            that.src = require('@/assets/zaixianshiyongzhong@2x.png')
        } else {

          if (data.lockStatus == 1) { //判断锁升起
            if (data.userStatus == 1) { //判断授权人
                that.src = require('@/assets/zhaunyongzaixian_suoshengqi@2x.png')
            } else {
                that.src = require('@/assets/zaixianshouquan_suoshengqi@2x.png')
            }

          } else {
              that.src = require('@/assets/suojiangxia@2x.png')
          }
        }
      } else {
        if (data.stallStatus == 2) { //判断车位状态 2占用
            that.src = require('@/assets/zaixianshiyongzhong@2x.png')
        } else {
          if (data.lockStatus == 1) {
            if (data.userStatus == 1) {
                that.src = require('@/assets/zhaunyonglixian_suoshengqi@2x.png')
            } else {
                that.src = require('@/assets/shouquanlixian_suoshengqi@2x.png')
            }

          } else {
              that.src = require('@/assets/lixiansuojiangxia@2x.png')
          }
        }
      }
      let time = new Date(data.validity);
      console.log(data.validity)
      let y = ((time.getFullYear()).toString()).substring(2,4)
     let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
      let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
      let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      let validity = y + '-' + m + '-' + d + ' ' + h + ':' + mm
      let validitys = y + '-' + m + '-' + d 

        that.validity = validity,
        that.validitys = validitys,
        that.prename = data.preName,
        that.val = data.stallName,
        that.isUserRecord = data.isUserRecord,
        that.downLockTime = data.downLockTime,
        that.stallStatus = data.stallStatus,
        that.lockStatus = data.lockStatus,
        that.useUpLockTime = data.useUpLockTime,
        that.useUserMobile = data.useUserMobile,
        that.userStatus = data.userStatus,
        that.useUserName = data.useUserName,
        that.gatewayStatus = data.gatewayStatus,
        that.stallId = data.stallId,
        that.longitude = data1.longitude,
        that.latitude = data1.latitude,
        that.underLayer = data.underLayer,
        that.preId = data1.preId

       console.log(that.useUserName,that.useUserMobile)
      that.bus.$emit("loading", false);
      that.ying = true

    }
  },
  methods: {
    tops(){
      let that = this
      that.top_block = false
       if (that.self == true) {
         that.bus.$emit("loading", true);
    that.bus.$emit("tip", { title: "升锁中请稍候" });
          that.self = false
          axios.request({
          url:Url.url.long_control, //1 降下地锁  2 升起地锁
          method:"post",
           params: {
          stallId: that.stallId,
          state: 2,
          parkingStatus: 0   //0未知 1到达 2未到达
        },
        }).then(res => {
            console.log(res)
             if (res.data == true) {

              setTimeout(() => {
               that.bus.$emit("tips", { show: true, title: "升锁成功" });
               
              }, 1000)
              localStorage.setItem('oo', false)
              that.bus.$emit("loading", false);

                that.self = true

            } else {
              if (res.message != null) {
                if (res.message.code == 8005099) {
                  
                  console.log(res.message.content)
                   that.bus.$emit("loading", false);
                    that.aligns = res.message.content,
                    that.ss = '再升一次',
                    that.s = 1,
                    that.begins = true

 
                } else if (res.message.code == 8005101) {
                  console.log(res.message.content)
                  that.bus.$emit("loading", false);
                    that.aligns = res.message.content,
                    that.ss = '故障上报',
                    that.s = 3,
                    that.begins = true
                } else if (res.message.code == 8005093) {
                  console.log(res.message.content)
                   that.bus.$emit("loading", false);
                    that.aligns = res.message.content,
                    that.ss = '切换车位',
                    that.s = 4,
                    that.begins = true
                } else if (res.message.code == 8005073) {
                  console.log(res.message.content)
                  that.bus.$emit("loading", false);
                    that.self = true
                 that.bus.$emit("tips", { show: true, title: res.message.content });
                } else if (res.message.code == 8005072) {
                   that.bus.$emit("loading", false);
                    that.self = true
                 that.bus.$emit("tips", { show: true, title: res.message.content });
                }
              }
            }
        })
      }
    },
   carwhere(){
    let that = this
      console.log('跳转室内导航')
      that.$router.push({
           path: '/entrance?preId=' + that.preId + '&stallId=' + that.stallId,
      })
  },
  malfunction(){
    let that = this
    that.malfunctions = 1
    let oo = localStorage.getItem('oo')
    that.$router.push({
         path: '/malfunction?stallId=' + that.stallId + '&val=' + that.val
    })
         
  },
  xiao(){
    let that = this

      that.self = true,
      that.begins = false,
      that.top_block = false

  },
  ones(){
    let that = this
      that.self = true,
      that.begins = false
    if(that.s == 1){
      that.top()
    } else if (that.s == 2){
      that.bottom()
    } else if (that.s == 4) {
      that.$router.push({
          path: "/Choice",
            query:{
              latitude: that.latitude,
              longitude : that.longitude
                  }
      })
    }else{
      that.$router.push({
          url: '/malfunction?stallId=' + that.stallId + '&val=' + that.val
      })
    }

  },
  know(){
    let that = this
      that.shows1 =false
  },
  noshow(){
    let that = this

      that.shows1 = false

      localStorage.setItem('show', true)
  },
   shows() {
    let that = this

      that.show = false

  },
 top(){
    let that = this
    console.log(that.isUserUse,'--------- isUserUse' )
     if (that.data.isUserUse == 1){
          that.top_block = true
     }else{
            if (that.self == true) {
         that.bus.$emit("loading", true);
    that.bus.$emit("tip", { title: "升锁中请稍候" });
          that.self = false
          axios.request({
          url:Url.url.long_control, //1 降下地锁  2 升起地锁
          method:"post",
           params: {
          stallId: that.stallId,
          state: 2,
          parkingStatus: 0   //0未知 1到达 2未到达
        },
        }).then(res => {
            console.log(res)
             if (res.data == true) {


              setTimeout(() => {
               that.bus.$emit("tips", { show: true, title: "升锁成功" });
               
              }, 1000)
              localStorage.setItem('oo', false)
              that.bus.$emit("loading", false);

                that.self = true

            } else {
              if (res.message != null) {
                if (res.message.code == 8005099) {
                  
                  console.log(res.message.content)
                   that.bus.$emit("loading", false);
                    that.aligns = res.message.content,
                    that.ss = '再升一次',
                    that.s = 1,
                    that.begins = true

 
                } else if (res.message.code == 8005101) {
                  console.log(res.message.content)
                  that.bus.$emit("loading", false);
                    that.aligns = res.message.content,
                    that.ss = '故障上报',
                    that.s = 3,
                    that.begins = true
                } else if (res.message.code == 8005093) {
                  console.log(res.message.content)
                   that.bus.$emit("loading", false);
                    that.aligns = res.message.content,
                    that.ss = '切换车位',
                    that.s = 4,
                    that.begins = true
                } else if (res.message.code == 8005073) {
                  console.log(res.message.content)
                  that.bus.$emit("loading", false);
                    that.self = true
                 that.bus.$emit("tips", { show: true, title: res.message.content });
                } else if (res.message.code == 8005072) {
                   that.bus.$emit("loading", false);
                    that.self = true
                 that.bus.$emit("tips", { show: true, title: res.message.content });
                }
              }
            }
        })
      }
     }
  },
  bottom(){
       let that = this
    console.log(that.isUserUse + '---------------isUserUse')
    if (that.isUserUse == 1){
     that.bus.$emit("tips", { show: true, title: "车位正在使用中" });
      return
    }
    if (that.self == true) {
       that.bus.$emit("loading", true);
    that.bus.$emit("tip", { title: "降锁中请稍候" });
        that.self = false
        axios.request({
          url:Url.url.long_control, //1 降下地锁  2 升起地锁
          method:"post",
           params: {
          stallId: that.stallId,
          state: 1,
          parkingStatus: 0   //0未知 1到达 2未到达
        },
        }).then(res => {
          console.log(res)
           if(res.data == true){

 
                setTimeout(() => {
                 that.bus.$emit("tips", { show: true, title: "降锁成功" });
                },1000)
             
               localStorage.setItem('oo',true)

                   that.bus.$emit("loading", false);
                  that.self = true

              } else{
                if (res.message != null){
                  if (res.message.code == 8005100){

                    that.bus.$emit("loading", false);
                      that.self = true,
                      that.begins = true
                      that.aligns = res.message.content,
                      that.ss = '再降一次',
                      that.s = 2,
                      console.log(res.message.content)

                  } else if (res.message.code == 8005102) {
                    console.log(res.message.content)

                      that.bus.$emit("loading", false);
                      that.aligns = res.message.content,
                       that.ss = '故障上报',
                      that.s = 3,
                      that.begins = true

                  } else if ( res.message.code == 8005093) {
                    console.log(res.message.content)
                   
                      that.bus.$emit("loading", false);
                      that.aligns = res.message.content,
                       that.ss = '切换车位',
                      that.s = 4,
                      that.begins = true
                  }else if(res.message.code == 8005073){
                     that.bus.$emit("loading", false);
                      that.self = true
                     that.bus.$emit("tips", { show: true, title: "车位正在使用中" });
                  }else if(res.message.code == 8005072){
                   that.bus.$emit("loading", false);
                      that.self = true
                      that.bus.$emit("tips", { show: true, title: res.message.content });
                  }else{
                     that.bus.$emit("loading", false);
                      that.self = true
                      that.bus.$emit("tips", { show: true, title: res.message.content });
                  }
                }
              }
        })
    }
  },
   //记录信息
  record(){
    let that = this
    that.ji = 1
      that.$router.push({
          path: '/record?stallId=' + that.stallId,
      })
      

      console.log('记录')
  },
  //切换车位
  qie(){ //切换车位
      let that = this;
      that.qies = 1
    let data = JSON.stringify(that.data);
    axios.request({
      url:Url.url.long_current,
      method:"get"
    }).then(res => {
      console.log(res)
       if (res.data.switchFlag == true){ //判断可否切换
             that.$router.push({
                  path: '/Choice?data=' + data + "&latitude=" + that.latitude + "&longitude=" + that.longitude + "&switchFlag=" + 1 + '&id=' + that.stallId,
                })
          } else if (res.data.switchFlag == false){
               that.show = true
               that.qies = 0
          }
    })
  },
  },
  beforeDestroy(){
    let that = this
    axios
      .request({
        url: Url.url.long_current,
        method: "get"
      })
      .then(res => {
        console.log(res,that.qies);
        if(res.data.status == true && that.qies == 0 && that.ji == 0 && that.malfunctions == 0){
          that.$router.push({
            path:"/"
          })
        }
      });
  }
};
</script>

<style scoped lang='scss'>
.mypark {
  width: 100%;
  height: 100%;
}
.line{
  width:100%;
  border-top:1px solid #e1e1e1;
}
.imgNumber{
  width:422px;
  height:264px;
  margin-top:163px;
  margin-left:180px;
  margin-bottom: 170px;
  position: relative;
}
.rights{
  width: 60px;
  position: absolute;
  top: 240px;
  right: 40px;
}
.right_top{
  width:60px;
  height:96px;
  font-size: 24px;
  color: #999999;
  text-align: center;
  margin-bottom: 40px;
}
.right_top_img{
  width:60px;
  height:60px;
}
.right_center{
    width:60px;
  height:96px;
  font-size: 24px;
  color: #999999;
  text-align: center;
  margin-bottom: 40px;
}
.right_center_img{
  width:60px;
  height:60px;
}
.right_bottom{
   width:60px;
  height:96px;
  font-size: 24px;
  color: #999999;
  text-align: center;
   margin-bottom: 40px;
}
.right_bottom_img{
  width:60px;
  height:60px;
}
.carwhere{
   width:80px;
  height:96px;
  font-size: 24px;
  color: #999999;
  text-align: center;
  margin-left: -10px;
}
.carwhere > img{
  width:60px;
  height:60px;
}
.content_top{
  width:100%;
  font-size: 30px;
  color: #333;
  box-sizing:border-box;
  padding: 0px 30px;
  margin-top:116px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.zong_lines{
  border-top:1px solid #f0efef;
  margin:0px 30px;
}
.content_dian{
  width:100%;
  height:92px;
  font-size: 30px;
  color: #333;
  box-sizing:border-box;
  padding: 0px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lines{
  border-top:20px solid #f5f4f4;
}
.content_bottom{
  width:100%;
  font-size: 30px;
  color: #333;
  box-sizing:border-box;
  padding: 0px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:32px 0px;
}
.bottom{
  width:100%;
  box-sizing:border-box;
  padding: 0px 86px;
  position: fixed;
  left:0;
  top:1050px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom > div{
  width: 250px;
  background: #faa901;
  text-align: center;
  font-size: 32px;
  color: #ffffff;
  border-radius: 60px;
  box-sizing:border-box;
  padding: 24px 58px;
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
   text-align:center;
}
.con{
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 40px 30px;
  line-height: 50px;
}
 .caos{
   width: 100%;
   font-size: 30px;
   color: #333;
   display:flex;
   justify-content: space-between;
   margin:0 auto;
}
 .ones{
   width: 50%;
   text-align: center;
   height: 110px;
   line-height: 110px;
    border: 0.4px solid #e6e6e6;
}
.fails{
  width:100%;
  border: 0.2px solid #e6e6e6;
}
fail{
  width: 0.1px;
  height: 110px;
  border: 0.1px solid #e6e6e6;
}
.one{
  color: #999999;
  border-bottom-left-radius: 14px;
}
.oo{
  color: #f66913;
   border-bottom-right-radius: 14px;
}
.box{
  position: fixed;
  top:0;
  left:0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.body{
  position: fixed;
  top:35%;
  left:70px;
  width: 610px;
  background: white;
  border-radius: 20px;
}
.top{
  width: 100%;
  font-size: 34px;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #dedede;
  color: #333333;
  box-sizing: border-box;
  padding: 15px 40px;
}
.bottoms{
  width: 100%;
  height: 110px;
  font-size: 32px;
  color: #666666;
  text-align: center;
  line-height: 110px;
}
.bodys{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0;
  left: 0;
}
.boxs{
  width: 610px;
  height: 586px;
  background: white;
  margin: 0 auto;
  margin-top: 250px;
  border-radius: 20px;
 
}
.tops{
   box-sizing: border-box;
  padding: 44px 0px;
  padding-right: 44px;
  padding-left: 60px;
  border-bottom: 1px solid #dbdbdb;
}
.title{
  width: 100%;
  height: 66px;
  line-height: 66px;
  text-align: center;
  font-size: 32px;
  color: #333333;
  font-weight: bold;
}
.contents{
  width: 100%;
  height: 156px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.imgs{
  width: 124px;
  height: 104px;
}
.contents_right{
  width: 482px;
  height: 104px;
  position: relative;
}
.right_tops{
  font-size: 32px;
  color: #333333;
  position: absolute;
  top: 5px;
  left: 40px;
}
.right_bottoms{
  font-size: 30px;
  color: #666666;
   position: absolute;
  bottom: 5px;
  left: 40px;
}
.bottomss{
  width: 100%;
  height: 123px;
  line-height: 123px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.bottomss_left{
  width: 50%;
  height: 100%;
  border-right: 1px solid #dbdbdb;
  font-size: 32px;
  color: #999999;
}
.bottomss_right{
   width: 50%;
   height: 100%;
   font-size: 32px;
   color: #faa901;
}
.top_title{
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 40px;
  box-sizing: border-box;
  padding-left: 40px;
}
.top_right{
  font-size: 30px;
  color: #faa901;
  margin-left: 18px;
}
.time{
  margin-top: 25px;
  font-size: 30px;
  color:333;
  box-sizing: border-box;
  padding-left: 50px;
}
.leave{
  width: 442px;
  text-align: center;
  position: absolute;
  top:624px;
  left:170px;
  font-size: 30px;
  color: #666;
}
.electric{
  width: 442px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top:624px;
  left:170px;
}
.electric_img{
  width: 32px;
  height: 32px;
}
.electric_text{
  margin-left: 20px;
  font-size: 30px;
  color: #e40b2f;
}
.user_message{
    width: 90%;
    height: 92px;
    font-size: 30px;
    color: #333;
    border-bottom: 1px solid #f0efef;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user{
  width: 50%;
  text-align: left;
}
.user_name{
  width: 50%;
  text-align: right;
}
.down_time{
  width: 90%;
    height: 92px;
    font-size: 30px;
    color: #333;
    border-bottom: 1px solid #f0efef;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.down_timees{
     width: 90%;
    height: 92px;
    font-size: 30px;
    color: #333;
    border-bottom: 1px solid #f0efef;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
