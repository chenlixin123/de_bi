<template>
  <div class="order">
    <!-- 降锁失败/升锁失败提示框 -->
    <div class="starts" v-if="begins == 'true'">
      <div class="begin">
        <div class="con">{{aligns}}</div>
        <div class="fails"></div>
        <div class="caos">
          <div class="ones one" @click="xiao">取消</div>
          <div class="ones oo" @click="ones">{{ss}}</div>
        </div>
      </div>
    </div>
    <!-- 取消预约提示框 -->
    <div class="boxs" v-if="begin == 'true'">
      <div class="centers">
        <div class="tops">
          <div class="text">{{aligin}}</div>
        </div>
        <div class="bottoms">
          <div class="lefts" @click="xiao">否</div>
          <div class="rights" @click="cancel_order">是</div>
        </div>
      </div>
    </div>

    <!-- 降锁/升锁成功弹框 -->
    <div class="boxxs" v-if="nocar == 'true'">
      <div class="center">
        <div class="top">
          <div class="text">{{nocar_content}}</div>
        </div>
        <div class="bottomss">
          <div class="left" @click="close_nocar">确定</div>
        </div>
      </div>
    </div>

    <!-- <div class="head">
      <div class="head-list">
        <img src="@/assets/fanhui@3x.png" @click="back">
        当前订单
      </div>
    </div>-->
    <div class="parknum">
      <figure class="img">
        <img src="@/assets/chepai@3x.png" width="100%">
      </figure>
      <div class="num">{{data.stallName}}</div>
      <div class="fault" @click="error">
        <figure class="img">
          <img src="@/assets/guzhang@3x.png" width="100%">
        </figure>
        <div class="fault-txt">故障</div>
      </div>

      <div class="faults" @click='carwhere'>
        <figure class="img">
          <img src='@/assets/where.png' width="100% ">
        </figure>
        <div class="fault-txt">找车位</div>
      </div>


      

    </div>
    <div class="body">
      <div class="body-content">
        <div class="body-time">
          <span>停车时长</span>
          <span>{{time}}{{times}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-time">
          <span>当前费用</span>
          <span>￥{{data.amount}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-time">
          <span>车牌号</span>
          <span>{{data.plateNumber}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-time">
          <span>停车场</span>
          <div class="navigation">
            {{data.prefectureName}}
            <figure class="img">
              <img src="@/assets/daohang@3x.png" style="width:100%;margin-bottom:20px;">
            </figure>
          </div>
        </div>
      </div>
      <div class="body-content">
        <div class="body-time">
          <span>车位在哪</span>
          <figure class="img">
            <img src="@/assets/cheweizaina@3x.png" style="width:100%;margin-bottom:20px;">
          </figure>
          <!-- <span></span> -->
        </div>
      </div>
    </div>
    <div class="foot">
      <button v-if="data.cancelFlag == 1" @click="cancel_orders">取消预约</button>
      <button v-else @click="top">结账离场</button>
      <button @click="bottom">降下地锁</button>
    </div>
  </div>
</template>

<script>
import axios from "@/libs/api.request";
import Url from "@/libs/url";
export default {
  name: "Order",
  data() {
    return {
      data: {},
      begins: "false",
      aligns: "",
      ss: "",
      s: "",
      time: "",
      times: "",
      begin: "false",
      aligin: "您确定要取消本次预约吗？取消后将会取消为您预留车位",
      nocar: "false",
      nocar_content: "降锁成功",
      stallId:'',
      preId:'',
      name:'',
      orderId:''
    };
  },
  created() {
    let that = this;
    axios
      .request({
        url: Url.url.current
      })
      .then(res => {
        console.log(res);
        that.name = res.data.stallName
        that.stallId = res.data.stallId
        that.orderId = res.data.id
        if(that.$route.query.preId == undefined){
          that.preId = localStorage.getItem('preId')
        }else{
             that.preId = that.$route.query.preId
        }
         console.log(that.preId)
        if (res.data != null) {
          that.bus.$emit("loading", true);
          that.bus.$emit("tip", { title: "加载中请稍候..." });
          that.orders();
          localStorage.setItem("router", true);
        } else {
          that.$router.go(-2)
        }
      });
  },
  methods: {
      // 导航
     carwhere(){
    let that = this
      console.log('跳转室内导航')
      console.log(that.preId,that.stallId,that.name+'66666666666')
      that.$router.push({
           path: '/entrance?preId=' + that.preId + '&stallId=' + that.stallId + '&stallName=' + that.name,
      })
  },
    // 渲染订单接口
    orders() {
      let that = this;
      axios
        .request({
          url: Url.url.current
        })
        .then(res => {
          that.data = res.data;
          console.log(res);
          localStorage.setItem("orderId", res.data.id);
          that.times = res.data.parkingTime + 1;
          console.log(that.times);
          that.bus.$emit("loading", false);
          if (that.times >= 5940) {
            (that.time = parseInt(that.times / 60) + "时"), (that.times = "");
          } else {
            if (that.times >= 60) {
              that.time = parseInt(that.times / 60) + "时";
              // times: (that.data.times - (parseInt(that.data.times / 60) * 60)) + '分'
              if (that.times - parseInt(that.times / 60) * 60 == 0) {
                that.times = "";
              } else {
                that.times = that.times - parseInt(that.times / 60) * 60 + "分";
              }
            } else {
              (that.time = ""),
                (that.times =
                  that.times - parseInt(that.times / 60) * 60 + "分");
            }
          }
          let times = res.data.remainMins;
          console.log(times);
          setTimeout(() => {
            axios
              .request({
                url: Url.url.current
              })
              .then(res => {
                that.data = res.data;
                that.begin = "false";
                that.times = res.data.parkingTime + 1;
                console.log(that.times);
                console.log(res.data.endTime, res.data.startTime);
                localStorage.setItem("orderId", res.data.id);
                if (that.times >= 5940) {
                  (that.time = parseInt(that.times / 60) + "时"),
                    (that.times = "");
                } else {
                  if (that.times >= 60) {
                    that.time = parseInt(that.times / 60) + "时";
                    // times: (that.data.times - (parseInt(that.data.times / 60) * 60)) + '分'
                    if (that.times - parseInt(that.times / 60) * 60 == 0) {
                      that.times = "";
                    } else {
                      that.times =
                        that.times - parseInt(that.times / 60) * 60 + "分";
                    }
                  } else {
                    (that.time = ""),
                      (that.times =
                        that.times - parseInt(that.times / 60) * 60 + "分");
                  }
                }
              });
          }, times * 1000);
          setInterval(() => {
            axios
              .request({
                url: Url.url.current
              })
              .then(res => {
                that.data = res.data;
                that.times = res.data.parkingTime + 1;
                console.log(that.times);
                if (that.times >= 5940) {
                  (that.time = parseInt(that.times / 60) + "时"),
                    (that.times = "");
                } else {
                  if (that.times >= 60) {
                    that.time = parseInt(that.times / 60) + "时";
                    // times: (that.data.times - (parseInt(that.data.times / 60) * 60)) + '分'
                    if (that.times - parseInt(that.times / 60) * 60 == 0) {
                      that.times = "";
                    } else {
                      that.times =
                        that.times - parseInt(that.times / 60) * 60 + "分";
                    }
                  } else {
                    (that.time = ""),
                      (that.times =
                        that.times - parseInt(that.times / 60) * 60 + "分");
                  }
                }
              });
          }, 600000);
        });
    },
    close_nocar() {
      let that = this;
      that.nocar = "false";
    },
    //升锁离场（预约）
    top() {
      let that = this;
      that.$router.push({
         path: "/paySuccess",
         query:{
              orderId:that.orderId
         }
         });
      // that.bus.$emit("loading", true);
      // that.bus.$emit("tip", { title: "升锁中请稍候..." });
      // console.log(that);
      // axios
      //   .request({
      //     url: Url.url.control_up,
      //     method: "post",
      //     params: {
      //       orderId: that.data.id, //订单ID
      //       parkingStatus: 1, //状态
      //       stallId: that.data.stallId // 车位ID
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     if (res.status == false) {
      //       if (res.message != null) {
      //         that.bus.$emit("loading", false);
      //         console.log(res.message.code, res.message.content);
      //         if (res.message.code == 8005099) {
      //           (that.aligns = res.message.content),
      //             (that.ss = "再升一次"),
      //             (that.s = 1),
      //             (that.begins = "true"),
      //             console.log(res.message.content);
      //         } else if (res.message.code == 8005101) {
      //           console.log(res.message.content);
      //           (that.aligns = res.message.content),
      //             (that.ss = "故障上报"),
      //             (that.s = 3),
      //             (that.begins = "true");
      //         } else if (res.message.code == 8005092) {
      //           console.log(res.message.content);
      //           (that.aligns = res.message.content),
      //             (that.ss = "切换车位"),
      //             (that.s = 4),
      //             (that.begins = "true");
      //         } else if (res.message.code == 8005073) {
      //           that.bus.$emit("tips", { show: true, title: res.message.content});
      //         } else if (res.message.code == 8005072) {
      //           that.bus.$emit("tips", { show: true, title: res.message.content});
      //         }
      //       }
      //     } else {
      //       that.$router.push({ path: "/paySuccess" });
      //       that.bus.$emit("loading", false);
      //     }
      //   });
    },
    //降下车锁（预约）
    bottom() {
      let that = this;
      that.bus.$emit("loading", true);
      that.bus.$emit("tip", { title: "降锁中请稍候..." });
      console.log(that.bus);
      axios
        .request({
          url: Url.url.control_down,
          method: "post",
          params: {
            orderId: that.data.id,
            parkingStatus: 1,
            stallId: that.data.stallId
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == false) {
            if (res.message != null) {
              that.bus.$emit("loading", false);
              console.log(res.message.code, res.message.content);
              if (res.message.code == 8005091) {
                (that.aligns = res.message.content),
                  (that.ss = "再降一次"),
                  (that.s = 2),
                  (that.begins = "true"),
                  console.log(res.message.content);
              } else if (res.message.code == 8005102) {
                console.log(res.message.content);
                (that.aligns = res.message.content),
                  (that.ss = "故障上报"),
                  (that.s = 3),
                  (that.begins = "true");
              } else if (res.message.code == 8005092) {
                console.log(res.message.content);
                (that.aligns = res.message.content),
                  (that.ss = "切换车位"),
                  (that.s = 4),
                  (that.begins = "true");
              } else if (res.message.code == 8005073) {
                that.bus.$emit("tips", { show: true, title:res.message.content});
              } else if (res.message.code == 8005072) {
                that.bus.$emit("tips", { show: true, title: res.message.content});
              }
            }
          } else {
            that.bus.$emit("loading", false);
            that.bus.$emit("tips", { show: true, title: "降锁成功" });
            that.data.cancelFlag = 2;
            // that.nocar = "true";
            // that.nocar_content = "降锁成功";
          }
        });
    },
    ones() {
      let that = this;
      that.begins = "none";
      if (that.s == 1) {
        //再升一次
        that.top();
      } else if (that.s == 2) {
        //再降一次
        that.bottom();
      } else if (that.s == 4) {
        //切换车位
        axios
          .request({
            url: Url.url.switchTab,
            method: "post",
            params: {
              orderId: that.data.id
            }
          })
          .then(res => {
            console.log(res);
            if (res.status == false) {
              if (res.message != null) {
                console.log(res.message.code, res.message.content);
                if (res.message.code == 8005106) {
                  //切换车位失败，若返回有车位名称则表示切换车位成功
                  (that.aligns = res.message.content),
                    (that.ss = "确定"),
                    (that.s = 6),
                    (that.begins = "true"),
                    console.log(res.message.content);
                } else if (res.message.code == 8005105) {
                  //无空闲车位，订单已关闭
                  console.log(res.message.content);
                  (that.aligns = res.message.content),
                    (that.ss = "确定"),
                    (that.s = 5),
                    (that.begins = "true");
                }
              }
            } else {
              that.bus.$emit("tips", { show: true, title: "切换成功" });
              that.orders();
            }
          });
      } else if (that.s == 5) {
        // var u = navigator.userAgent;
        // // android终端
        // var isAndroid = u.indexOf("wehome/1") > -1;
        // var isiOS = u.indexOf("wehome/2") > -1;
        // // ios终端
        // if (isiOS) {
        //   window.finish_current_activity_webView("", "");
        // } else if (isAndroid) {
        //   window.jsObject.finish_current_activity_webView("", "");
        // }
        that.$router.go(-1)
      } else if (that.s == 6) {
        console.log("切换车位失败");
      } else {
        console.log("跳转故障车位页");
        that.$router.push({
          path: "/CarError",
          query: {
            orderId: that.data.id,
            name: that.data.stallName
          }
        });
      }
    },
    error() {
      let that = this;
      that.$router.push({
        path: "/CarError",
        query: {
          orderId: that.data.id,
          name: that.data.stallName
        }
      });
    },
    xiao() {
      let that = this;
      that.begins = "false";
      that.begin = "false";
      console.log("取消");
    },
    cancel_orders() {
      let that = this;
      that.begin = "true";
      that.aligin = "您确定要取消本次预约吗？取消后将会取消为您预留车位";
    },
    cancel_order() {
      let that = this;
      that.begin = "false";
      axios
        .request({
          url: Url.url.cancel,
          method: "post",
          params: {
            orderId: that.data.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == true) {
            that.bus.$emit("tips", { show: true, title: "取消成功" });
            let tap = localStorage.getItem('tap')
            setTimeout(() => {
              // var u = navigator.userAgent;
              // // android终端
              // var isAndroid = u.indexOf("wehome/1") > -1;
              // var isiOS = u.indexOf("wehome/2") > -1;
              // // ios终端
              // if (isiOS) {
              //   window.finish_current_activity_webView("", "");
              // } else if (isAndroid) {
              //   window.jsObject.finish_current_activity_webView("", "");
              // }
              if(tap == 1){
                  that.$router.go(-2)
              }else{
                that.$router.go(-1)
              }
              
            }, 2000);
            localStorage.setItem("yue", false);
          } else {
            if (res.message.code == 8005009) {
              that.bus.$emit("tips", { show: true, title: "取消失败" });
            }
          }
        });
    },
    back() {
      let that = this;
      that.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped lang='scss'>
html,
body {
  background: #fff;
  width: 100%;
  height: 100%;
}
.head {
  width: 100%;
  height: 92px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #f5f4f4;
}
.head-list {
  width: 95%;
  height: 100%;
  line-height: 92px;
  background: #fff;
  text-align: center;
  position: relative;
}
.head-list img {
  width: 22px;
  height: 36px;
  position: absolute;
  left: 0;
  top: 30px;
}
.parknum {
  /* width: 100%; */
  display: absolute;
  justify-content: space-around;
  margin-top: 120px;
  margin-bottom: 130px;
  .img {
    width: 388px;
    height: 244px;
    padding: 0;
    margin: 0;
    margin: 0 auto;
  }
  .num {
    width: 388px;
    height: 207px;
    font-size: 73px;
    font-family: "HYShangWeiShouShuW";
    text-align: center;
    line-height: 207px;
    position: absolute;
    top: 120px;
    left: 180px;
  }
}
.fault {
  position: absolute;
  right: 30px;
  top: 120px;
  .img {
    width: 56px;
    height: 56px;
    padding: 0;
    margin: 0;
    margin-bottom: 12px;
    margin-left: 10px;
  }
}

.faults {
  position: absolute;
  right: 30px;
  top: 260px;
  .img {
    width: 56px;
    height: 56px;
    padding: 0;
    margin: 0;
    margin-bottom: 12px;
    margin-left: 10px;
  }
}

.fault-txt {
  font-size: 24px;
  color: #999;
  text-align: center;
  margin-bottom: 30px;
}
.body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}
.body-content {
  width: 95%;
  height: 92px;
}
.body-time {
  width: 100%;
  line-height: 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f5f4f4;
  font-size: 30px;
  color: #333;
}
.body-time .img {
  padding: 0;
  margin: 0;
  width: 32px;
  height: 32px;
}
.body-time .navigation {
  display: flex;
  align-items: center;
}
.navigation {
  .img {
    padding: 0;
    margin: 0;
    width: 27px;
    height: 28px;
    margin-left: 14px;
  }
}
.foot {
  width: 100%;
  margin-top: 96px;
  display: flex;
  justify-content: space-around;
}
.foot button {
  width: 232px;
  height: 76px;
  font-size: 30px;
  color: #fff;
  outline: none;
  border-radius: 60px;
  background: #f66913;
  border: none;
}
.starts {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1100;
}
.begin {
  width: 80%;
  background: #fff;
  position: absolute;
  top: 36%;
  left: 10%;
  border-radius: 14px;
  font-size: 28px;
  color: #666;
  text-align: center;
}
.con {
  width: 100%;
  text-align: center;
  height: 150px;
  line-height: 150px;
}
.caos {
  width: 100%;
  font-size: 30px;
  color: #333;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.ones {
  width: 50%;
  text-align: center;
  height: 110px;
  line-height: 110px;
  border: 0.4px solid #e6e6e6;
}
.fails {
  width: 100%;
  border: 0.2px solid #e6e6e6;
}
.one {
  color: #999999;
}
.oo {
  color: #f66913;
}
.boxs {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  .centers {
    width: 75%;
    background: #fff;
    margin: 70% auto;
    border-radius: 14px;
    font-size: 32px;
    color: #333;
    text-align: center;
    .tops {
      width: 100%;
      text-align: center;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .text {
        width: 80%;
        line-height: 60px;
        text-align: center;
      }
    }
    .bottoms {
      width: 100%;
      font-size: 30px;
      color: #333;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      .lefts {
        width: 50%;
        text-align: center;
        height: 110px;
        line-height: 110px;
        border: 0.4px solid #e6e6e6;
      }
      .rights {
        width: 50%;
        text-align: center;
        height: 110px;
        color: #f66913;
        line-height: 110px;
        border: 0.4px solid #e6e6e6;
      }
    }
  }
}
.boxxs {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  .center {
    width: 80%;
    background: white;
    margin: 70% auto;
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
        text-align: center;
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
