<style scoped lang="scss">
.ff {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
.chessboard {
  text-align: center;
  width: 69px;
  // line-height: 30px;
  padding: 0;
  vertical-align: middle;
  margin-top: 93px;
  margin-bottom: 96px;
  // border: 1px solid #000;
}
.chessboard-y {
  text-align: center;
  width: 100%;
  height: 78px;
  line-height: 78px;
  // border-left: solid 1px #dedede;
  // border-top: solid 1px #dedede;
  padding: 0;
  vertical-align: middle;
  z-index: -1000;
  // border: 1px solid #000;
}
.self-img {
  padding: 0;
  margin: 0;
  /* moz-transform:rotate(-90deg);
        -webkit-transform:rotate(-90deg);
        filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);*/
  text-align: center;
  // vertical-align: middle;
}
.img {
  text-align: center;
  vertical-align: middle;
  height: 100%;
}
.self-btn {
  text-align: center;
  background: #f3955b;
  color: #fff;
  border: none;
  outline: none;
  box-sizing: border-box;
  vertical-align: middle;
}
.self-btns {
  text-align: center;
  background: #fff;
  color: #000;
  border: 1px solid #c6c5c5;
  outline: none;
  vertical-align: middle;
}
.self-btnes {
  text-align: center;
  vertical-align: middle;
  background: #c6c5c5;
  color: #fff;
  border: none;
  outline: none;
  z-index: 100;
}
.self-bt {
  text-align: center;
  vertical-align: middle;
  // background: #f66913;
  background: #fff;
  color: #000;
  background: #f66913;
  outline: none;
  border: none;
  color: white;
}
.head-lists {
  width: 100%;
  height: 100px;
  position: fixed;
  left: 0px;
}
.head-names {
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 38px;
  top: 0px;
  color: #333;
  margin: auto;
  background: white;
}
.fan {
  width: 22px;
  position: absolute;
  top: 33px;
  left: 35px;
}
.head_two {
  width: 100%;
  height: 88px;
  border-top: 3px solid rgb(240, 240, 240);
  background: white;
  font-size: 28px;
  color: #666;
  box-sizing: border-box;
  padding: 0 40px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head_btn {
  border: 1px solid #888;
  font-size: 26px;
  width: 160px;
  height: 46px;
  line-height: 46px;
  border-radius: 10px;
}
.bottom {
  width: 100%;
  height: 96px;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
}
.bottom_left {
  width: 50%;
  height: 100%;
  font-size: 38px;
  text-align: center;
  color: #f66913;
  border: none;
  outline: none;
}
.bottom_right {
  width: 50%;
  height: 96px;
  background: #f66913;
  color: #fff;
  font-size: 32px;
  border: none;
  outline: none;
  border-radius: 0;
  text-align: center;
  line-height: 96px;
}
.box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.box_center {
  width: 80%;
  background: white;
  margin: 60% auto;
  border-radius: 10px;
  position: relative;
  .disappear{
    width: 58px;
    height: 58px;
    position: absolute;
    bottom: -162px;
    left: 45%;
  }
  .box_title{
    width: 100%;
    height:80px;
    font-size: 32px;
    line-height: 90px;
  }
}
.box_top {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid rgb(230, 226, 226);
  box-sizing: border-box;
  padding: 0px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.box_bottom {
  width: 100%;
  height: 100px;
  display: flex;
  line-height: 100px;
  font-size: 38px;
}
.box_left {
  width: 50%;
  height: 100%;
  border-right: 1px solid rgb(230, 226, 226);
}
.box_right {
  width: 50%;
  height: 100%;
  color: #f66913;
}
.box_top_left {
  font-size: 38px;
  color: #666;
}
.box_top_right {
  width: 38px;
}
.boxs {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .boxs_center {
    position: relative;
    width: 80%;
    background: white;
    margin: 40% auto;
    border-radius: 10px;
    .img {
      width: 70px;
      height: 70px;
      position: absolute;
      bottom: -100px;
      left: 47%;
    }
    .boxs_top {
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .boxs_num {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 30px;
      box-sizing: border-box;
      padding: 0 10px;
      .num1 {
        width: 33%;
        height: 100%;
        font-size: 24px;
        color: #f66913;
        font-weight: bold;
      }
      .num2 {
        width: 33%;
        height: 100%;
        font-size: 22px;
        color: #999;
      }
    }
    .boxs_num1 {
      width: 100%;
      height: 80px;
      border-bottom: 1px solid rgb(233, 232, 232);
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 80px;
      box-sizing: border-box;
      padding: 0 10px;
      .num2 {
        width: 33%;
        height: 100%;
        font-size: 22px;
        color: #999;
      }
    }
    .bottoms {
      width: 100%;
      display: flex;
      .left {
        width: 30%;
        font-size: 22px;
        color: #999;
        margin-top: 45px;
      }
      .right {
        width: 60%;
        margin-top: 30px;
        margin-bottom: 30px;
      }
      .times {
        width: 100%;
        margin-top: 15px;
        margin-bottom: 20px;
        font-size: 26px;
      }
    }
  }
}
.boxx {
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
        width: 50%;
        height: 100%;
        border-right: 1px solid rgb(230, 226, 226);
      }
      .right {
        width: 50%;
        height: 100%;
        color: #f66913;
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
      }
    }
  }
}
</style>
<template style="text-align: -webkit-center">
  <!--
     实现在线选座位实现流程
     1 绘制 车区底部棋盘(根据车区具体情况来设定该车区最大x值, 及 最大 y值)。 同时定义每个格子的长和宽

     2 瞄点 根据传入的数据取得其对应点上的节点

     3 定位 定位其节点展示属性
     type 类型 1 车位 2 电梯 3 柱子 4 墙 5 路 6 不可用区域
     state 状态 1 可约 2 已经被约 3 不可约
  -->
  <!-- 顶部 -->
  <div :style="indexStyle">
    <!-- <div class="head-lists">
      <img class="fan" src="@/assets/fanhui@3x.png" @click="black">
      <div class="head-names">凌猫停车</div>
    </div>-->
    <!-- 头部查看详情 -->
    <div class="head_two">
      <div class="head_left">{{currentTimePeriod}} | &nbsp;{{currentFee}}</div>
      <div class="head_btn" @click="watch">查看详情</div>
    </div>
    <!-- 底部input框 -->
    <div class="bottom">
      <input
        type="text"
        class="bottom_left"
        placeholder="请输入车位号"
        :value="val"
        v-on:input="inputFunc"
      >
      <div class="bottom_right" @click="yue">预约</div>
    </div>
    <!-- <div class="ff">{{ss}}</div> -->
    <!-- 车牌号 -->
    <div class="box" v-if="show == 'true'">
      <div class="box_center">
        <div class="box_title">选择车牌</div>
        <div class="box_top" v-for="(item,index) in carlist" :key="index" @click="car(item,index)">
          <div class="box_top_left">{{item.vehMark}}{{ss}}</div>
          <img :src="index == inds ? src1 : src2" class="box_top_right">
        </div>
        <div class="box_bottom">
          <div class="box_left" @click="edit">编辑</div>
          <div class="box_right" @click="que_car">确认</div>
        </div>
         <img class="disappear" src="@/assets/tubiao@2x.png" alt=""  @click="qu_car">
      </div>
    </div>

    <!-- 查看详情 -->
    <div class="boxs" v-if="sho == 'true'">
      <div class="boxs_center">
        <img class="img" src="@/assets/shoufeixiangqing_cha@2x.png" alt @click="close_watch">
        <div class="boxs_top">收费详情</div>
        <div class="boxs_num">
          <div class="num1">{{businessTime}}</div>
          <div class="num1">{{freeMins}}</div>
          <div class="num1">{{topFee}}</div>
        </div>
        <div class="boxs_num1">
          <div class="num2">运营时段</div>
          <div class="num2">免费时长</div>
          <div class="num2">24小时封顶</div>
        </div>
        <div class="bottoms">
          <div class="left">计价规则</div>
          <div class="right">
            <div class="times" v-for="(item,index) in descList" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 预约确认弹框 -->
    <div class="boxx" v-if="shows == 'true'">
      <div class="center">
        <div class="top">
          <div class="text">预约成功后车位免费保留{{freeMins}}，{{freeMins}}后将开始计费</div>
        </div>
        <div class="bottomss">
          <div class="left" @click="qus_car">取消</div>
          <div class="right" @click="yues">预约车位</div>
        </div>
      </div>
    </div>

    <!-- 预约成功跳转页面弹窗 -->
    <div class="boxxs" v-if="showss == 'true'">
      <div class="center">
        <div class="top">
          <div class="text">[{{val}}]车位预约成功，请到达车位后再点击"降下地锁"</div>
        </div>
        <div class="bottomss">
          <div class="left" @click="suss">确定</div>
        </div>
      </div>
    </div>

    <!-- 车位不可用弹框 -->
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

    <div class="chessboard" v-for="(x,index) in chessboardXvalue" :key="index">
      <div class="chessboard-y" v-for="(y,index) in chessboardYvalue" :key="index">
        <div
          v-if="parkingMap[(x + ',' +y)]"
          :style="{
                        width: '100%',
                        height: '100%',
                        padding:0,
                        margin: 0,
                        verticalAlign: 'middle',
                        textAlign: 'center',
                    }"
        >
          <div
            :class="(parkingMap[(x+','+y)].index == ind) ? 'self-bt': (parkingMap[(x + ',' +y)].status  == 2) ? 'self-btn' : (parkingMap[(x + ',' +y)].status  == 1) ? 'self-btns' : 'self-btnes'"
            v-if="parkingMap[(x + ',' +y)].type === 'button'"
            :style="{
                    width:  parkingMap[(x + ',' +y)].width * 100 + '%',
                    height:  parkingMap[(x + ',' +y)].height * 75 + '%',
                    outline:'none',
                    borderRadius: '6px',
                    verticalAlign: 'middle',
                    textAlign: 'center',
                    fontSize:'16px',
                    lineHeight:'34px',
                  }"
            @click="btn(parkingMap[(x + ',' +y)].name,parkingMap[(x + ',' +y)].stallId,parkingMap[(x + ',' +y)].status,parkingMap[(x + ',' +y)].index)"
          >{{parkingMap[(x + ',' +y)].name}}</div>
          <img
            class="self-img"
            :style="{
                    width:  parkingMap[(x + ',' +y)].width * 100 + '%',
                    height:  parkingMap[(x + ',' +y)].height * 100 + '%',
                  }"
            v-if="parkingMap[(x + ',' +y)].type === 'img'"
            :src="parkingMap[(x + ',' +y)].src"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import Url from "@/libs/url";
export default {
  data() {
    return {
      parkingMap: {},
      chessboardXvalue: "",
      chessboardYvalue: "",
      indexStyle: {
        textAlign: "center",
        display: "flex",
        display: "-webkit-flex",
        /* 从左端开始沿水平轴防止flex item */
        flexDirection: "row",
        /* 强制 flex item不换行，沿着同一行堆叠 */
        flexWrap: "nowrap",
        /* flex item在主轴上的对齐方式，这里定义左对齐 */
        justifyContent: "flex-start",
        /* 定义交叉轴对其方式 */
        alignItems: "stretch",
        margin: "0",
        // borderBottom: 'solid 1px #DEDEDE',
        // borderRight: 'solid 1px #DEDEDE',
        background: "#F7F6F6"
      },
      groupId: "",
      ind: -1,
      val: "",
      carlist: [],
      inds: 0,
      src1: require("@/assets/tingchequan_xuanhzong@3x.png"),
      src2: require("@/assets/xaunzechepaihao_huise@3x.png"),
      show: "true",
      data: [],
      stallId: "", //车位ID
      status: "", //车位状态
      input_val: "",
      currentTimePeriod: "", //当前时间
      currentFee: "", //当前价格
      sho: "false",
      hao: "",
      businessTime: "", //运营时段
      freeMins: "", //免费时间
      topFee: "", //24小时封顶
      descList: "", //计价规则
      shows: "false",
      showss: "false",
      plateId: "", //车牌ID
      prefectureId: "",
      nocar: "false",
      ss: "",
      preId:''
    };
    //   && (parkingMap[(x + ',' +y)].index = ind)?'self-btn':''
  },
  methods: {
    btn(name, stallId, status, index) {
      console.log(name, stallId, status, index);
      let that = this;
      that.stallId = stallId;
      that.status = status;
      if (status == 1) {
        that.ind = index;
        that.val = name;
      } else if (status == 2) {
        that.ind = -1;
        that.val = "";
        that.nocar = "true";
        that.nocar_content = "该车位已被他人使用，请选择其他车位";
      } else {
        that.ind = -1;
        that.val = "";
        that.nocar = "true";
        that.nocar_content = "该车位不可用，请选择其他车位";
      }
      // var u = navigator.userAgent;
      // // android终端
      // var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      // // ios终端
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      // if (isiOS) {
      //   window.webkit.messageHandlers.pay.postMessage(
      //     name + "," + stallId + "," + status
      //   );
      // } else if (isAndroid) {
      //   window.Android.showToast(name + "," + stallId + "," + status);
      // }
      // // window.webkit.messageHandlers.pay.postMessage(name+","+stallId+","+status)   //iOS交互
      // // window.Android.showToast(name+","+stallId+","+status)  //安卓
      // // console.log(this.parkingMap)
      // for (var i in this.parkingMap) {
      //   // let item = this.parkingMap[i]
      //   // console.log(item)
      //   // if(name == item.name&& stallId == item.stallId){
      //   // console.log(status)
      //   if (status == 1) {
      //     // 状态 1  是空闲可点击的
      //     this.ind = index;
      //     // alert(this.ind)
      //     return;
      //   } else {
      //     this.ind = -1;
      //     return;
      //   }
      // }
    },
    // try{   //安卓交互
    // window.Android.showToast(name+","+stallId+","+status);
    //     // window.Android.txt("0000");
    // }catch(err){
    //     alert(err,"1111")
    // }
    // },
    formatData() {
      let _self = this;
      this.parkingData.forEach(item => {
        let key = item.x + "," + item.y;
        this.parkingMap.set(key, item);
      });
    },
    // initPanel () {
    // this.chessboardXvalue = 9
    // this.index++;
    // },
    jhajax() {
      let that = this;
      that.bus.$emit("loading", true);
      that.bus.$emit("tip", { title: "加载中请稍候..." });
      // this.groupId = string;
      // let tokens = strings;
      console.log(that.groupId)
      Cookies.set("tokens", that.token);
      localStorage.setItem("token", that.token);
      localStorage.setItem("groupId", that.groupId);
      let t = Cookies.get("tokens");
      console.log(t,that.groupId)
      axios
        .request({
          url: Url.url.car_lists + "?groupId=" + that.groupId,
          method: "get"
        })
        .then(res => {
          // console.log(res.data.gridX,res.data.gridY)
          console.log(res);
          that.preId = res.data.preId
          if (res.status) {
            this.currentTimePeriod = res.data.currentTimePeriod; //当前时间
            this.currentFee = res.data.currentFee; //当前价格
            this.businessTime = res.data.businessTime; //运营时段
            this.freeMins = res.data.freeMins; //免费时间
            this.topFee = res.data.topFee; //24小时封顶
            this.descList = res.data.descList; //计价规则
            // this.plateId = res.data.plateId; //车牌ID
            this.prefectureId = res.data.preId; //车区ID
            this.data = res.data.parkingDataMap;
            this.chessboardXvalue = res.data.gridX;
            this.chessboardYvalue = res.data.gridY;
            if(res.data.parkingDataMap ==  null){
                  that.bus.$emit("tips", { show: true, title: "没有车位" });
            }else{
                  res.data.parkingDataMap.forEach((item, index) => {
              let key = item.x + "," + item.y;
              Vue.set(this.parkingMap, key, item);
            });
            }
            setTimeout(() => {
              this.bus.$emit("loading", false);
            }, 500);
          }else{
            this.bus.$emit("loading", false);
            that.bus.$emit("tips", { show: true, title: res.message.content });
          }
        });
    },
    // 渲染车牌事件
    carlists() {
      let that = this;
      that.bus.$emit("loading", true);
      axios
        .request({
          url: Url.url.plate_list,
          method: "get"
        })
        .then(res => {
          console.log(res);
          that.carlist = res.data;
           let id = localStorage.getItem("carlist_index");
           console.log(id)
           for(let i = 0; i < res.data.length; i++){
             console.log(res.data[i].id)
             if(res.data[i].id == id){
               console.log('走了')
                that.inds = i
                 that.plateId = res.data[that.inds].id;
                return
             }else{
               that.inds = 0
               that.plateId = res.data[0].id;
             }
             console.log(that.inds)
           }

          if(res.status == true){
            that.bus.$emit("loading", false);
          }
        });
    },
    //查看详情
    watch() {
      let that = this;
      that.sho = "true";
    },
    //编辑车牌号
    edit(){
         this.$router.push({ 
          path: "/CarModuleList",
           });
    },
    //关闭查看详情
    close_watch() {
      let that = this;
      that.sho = "false";
    },
    close_nocar() {
      let that = this;
      that.nocar = "false";
    },
    // input框实时输入事件
    inputFunc(e) {
      let that = this;
      let ss = [];
      console.log(e.target.value);
      that.input_val = e.target.value;
      for (let i = 0; i < that.data.length; i++) {
        // console.log(that.data[i]);
        if (e.target.value == that.data[i].name) {
          if (that.data[i].status == 1) {
            that.ind = that.data[i].index;
          }
          ss.push(that.data[i].name);
          that.stallId = that.data[i].stallId;
          that.status = that.data[i].status;
          that.val = that.data[i].name;
        }
        if (ss.length == 1) {
          ss = [];
          return;
        } else {
          that.ind = -1;
          that.val = e.target.value;
        }
      }
    },
    // webview() {
    //   window.finish_current_activity_webView("", "");
    // },
    // 返回事件
    // black() {
    //   let that = this;
    //   that.$router.go(-1);
    // },
    // 点击车牌
    car(item, index) {
      let that = this;
      that.inds = index
      that.id = item.id;
      console.log(item, index);
      that.plateId = item.id;
      localStorage.setItem("carlist_indexs", item.id);
    },
    // 取消选择车牌
    qu_car() {
      let that = this;
      that.show = "false";
      that.hao = "false";
      that.shows = "false";
    },
    qus_car() {
      let that = this;
      that.shows = "false";
    },
    // 确认选择车牌
    que_car() {
      let that = this;
      that.show = "false";
      that.hao = "true";
      let id = localStorage.getItem("carlist_indexs");
      console.log(id);
      if (id == null) {
        localStorage.setItem("carlist_index", null);
      } else {
        localStorage.setItem("carlist_index", id);
      }
    },
    // 准备预约车位
    yue() {
      console.log("预约车位");
      let that = this;
      if (that.hao == "true") {
        if (that.val == "") {
          that.nocar = "true";
          that.nocar_content = "请选择车位";
        } else {
          let ss = [];
          that.data.map(res => {
            // console.log(res.name);
            if (that.val == res.name) {
              ss.push(res.name);
            }
          });
          console.log(ss[0]);
          if (that.val == ss[0]) {
            console.log(that.status);
            if (that.status == 1) {
              that.shows = "true";
            } else if (that.status == 2) {
              that.nocar = "true";
              that.nocar_content = "该车位已被他人使用，请选择其他车位";
            } else {
              that.nocar = "true";
              that.nocar_content = "该车位不可用，请选择其他车位";
            }
          } else {
            that.nocar = "true";
            that.nocar_content = "未找到该车位";
          }
        }
      } else {
        that.show = "true";
      }
    },
    //预约车位
    yues() {
      let that = this;
      that.bus.$emit("loading", true);
      that.bus.$emit("tip", { title: "加载中请稍候..." });
      that.shows = "false";
      console.log(that.plateId);
      axios
        .request({
          url: Url.url.Create_Submit,
          method: "post",
          params: {
            orderSource: "1", //订单来源标识  1 预约 2 扫码
            plateId: that.plateId, //车牌ID
            prefectureId: that.prefectureId, // 车区ID
            stallId: that.stallId //车位ID
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == true) {
            setTimeout(() => {
              axios
                .request({
                  url: Url.url.current
                })
                .then(res => {
                  console.log(res);
                  if (res.data == null) {
                    that.bus.$emit("loading", false);
                    that.nocar = "true";
                    that.nocar_content = "当前车位已被占用，请选择其他车位";
                  } else {
                    that.showss = "true";
                    that.bus.$emit("loading", false);
                  }
                });
            }, 1500);
          } else {
            that.bus.$emit("tips", { show: true, title: "预约失败" });
            that.bus.$emit("loading", false);
          }
        });
    },
    suss() {
      let that = this;
      that.showss = "false";
      localStorage.setItem('preId',that.preId)
      that.$router.push({
        path: "/Order?preId=" + that.preId
      });
    }
  },
  created() {
    let that = this;
    localStorage.setItem('tap',1)
    console.log(that.$route.query)
    that.token = that.$route.query.token;
    that.groupId = that.$route.query.groupId;
    if (that.token == undefined || that.groupId == undefined) {
      that.token = localStorage.getItem("token");
      that.groupId = localStorage.getItem("groupId");
      console.log(that.token);
    } else {
      that.token = that.$route.query.token;
      that.groupId = that.$route.query.groupId;
      console.log(that.token);
    }
    Cookies.set("tokens", that.token);
    localStorage.setItem("token", that.token);
    localStorage.setItem("groupId", that.groupId);
    let router = localStorage.getItem("router");
    console.log(that.token);
    axios
      .request({
        url: Url.url.current
      })
      .then(res => {
        console.log(res);
        that.carlists();
        if (res.data == null) {
          let token = Cookies.get("tokens");
          that.jhajax();
        } else {
          if (router == "true") {
            that.$router.go(-1)
          } else {
            that.$router.push({
              path: "/Order"
            });
            console.log("预约详情页");
          }
        }
      });
  },
  //离开当前页面后执行
// destroyed() {
//   let router = localStorage.getItem('router')
//     console.log(router)
// },
};
</script>
