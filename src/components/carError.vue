<template>
  <div class="body">
    <!-- 切换车位失败弹出框 -->
    <div class="boxs" v-if="shows == 'true'">
      <div class="content">
        <div class="top">{{text}}</div>
        <div class="bottom" @click="confirm">确定</div>
      </div>
    </div>

    <!-- <div class="head">
      <div class="head-list">
        <img class="back" src="@/assets/fanhui@3x.png" @click="back">
        车位异常
      </div>
    </div>-->
    <div class="box">
      <div class="car_module">
        <div class="left">车位</div>
        <div class="right">{{name}}</div>
      </div>
      <div class="error">请描述问题具体原因</div>
      <div class="errors">
        <div
          :class="index == ind ? 'active' : 'errors_content'"
          v-for="(item , index) in ErrorList"
          :key="index"
          @click="chose(item,index)"
        >{{item.name}}</div>
      </div>
      <div class="input_top">详细描述</div>
      <textarea class="text" maxlength="200" placeholder="请详细的描述问题" @input="descInput"></textarea>
      <div class="input_bottom">还可以输入{{200-inputLength}}字</div>
      <button
        :class="show == 'true' ? 'btns' : 'btn'"
        type="button"
        :disabled="show == 'true'"
        @click="btns"
      >切换车位</button>
    </div>
  </div>
</template>
<script>
import axios from "@/libs/api.request";
import Url from "@/libs/url";
export default {
  name: "carError",
  data() {
    return {
      data: "",
      inputLength: 0,
      inputValue: "",
      ErrorList: [],
      show: "true",
      ind: -1,
      name: "",
      text: "",
      shows: "false"
    };
  },
  //渲染异常原因
  created() {
    let that = this;
    console.log(that.$route.query.name);
    that.name = that.$route.query.name;
    that.orderId = that.$route.query.orderId;
    axios
      .request({
        url: Url.url.CarError,
        method: "get"
      })
      .then(res => {
        console.log(res);
        that.ErrorList = res.data;
      });
  },
  methods: {
    //返回
    back() {
      let that = this;
      that.$router.go(-1);
    },
    //输入框绑定事件
    descInput(e) {
      console.log(e.target.value);
      console.log(e.target.value.length);
      let that = this;
      that.inputLength = e.target.value.length;
      that.inputValue = e.target.value;
      if (that.inputLength > 0) {
        if (that.id == 66) {
          that.show = "false";
        }
      } else {
        that.show = "true";
      }
    },
    //选择原因
    chose(item, index) {
      console.log(item, index);
      let that = this;
      that.ind = index;
      that.id = item.id;
      if (item.id == 66) {
        console.log("其他");
        that.show = "true";
        if (that.inputLength > 0) {
          that.show = "false";
        }
      } else {
        that.show = "false";
      }
    },
    //切换车位
    btns() {
      let that = this;
      console.log("切换");
      axios
        .request({
          url: Url.url.switchTab,
          method: "post",
          params: {
            orderId: that.orderId
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == false) {
            if (res.message != null) {
              console.log(res.message.code, res.message.content);
              if (res.message.code == 8005106) {
                //切换车位失败，若返回有车位名称则表示切换车位成功
                that.text = res.message.content;
                that.shows = "true";
                that.c = 1;
                console.log(res.message.content);
              } else if (res.message.code == 8005105) {
                //无空闲车位，订单已关闭
                that.text = res.message.content;
                that.shows = "true";
                that.c = 2;
                console.log(res.message.content);
              }
            }
          } else {
            that.bus.$emit("tips", { show: true, title: "切换成功" });
            setTimeout(() => {
              that.$router.go(-1);
            }, 1000);
          }
        });
    },
    //关闭切换车位弹出框并做出动作
    confirm() {
      let that = this;
      that.shows = "false";
      console.log(that.c);
      if (that.c == 2) {
        var u = navigator.userAgent;
        // android终端
        var isAndroid = u.indexOf("wehome/1") > -1;
        var isiOS = u.indexOf("wehome/2") > -1;
        console.log('走了')
        // ios终端
        if (isiOS) {
          window.finish_current_activity_webView("", "");
        } else if (isAndroid) {
          window.jsObject.finish_current_activity_webView("", "");
        }
      } else {
        that.$router.go(-1);
      }
    }
  }
};
</script>
<style scoped lang='scss'>
.body {
  width: 100%;
  height: 100%;
  .head {
    width: 100%;
    height: 92px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #f5f4f4;
    .head-list {
      width: 95%;
      height: 100%;
      line-height: 92px;
      background: #fff;
      text-align: center;
      position: relative;
      .back {
        width: 22px;
        height: 36px;
        position: absolute;
        left: 0;
        top: 30px;
      }
    }
  }
  .box {
    width: 100%;
    // border: 1px solid red;
    box-sizing: border-box;
    padding: 0 30px;
    .car_module {
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 38px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
    }
    .error {
      width: 100%;
      height: 80px;
      line-height: 80px;
      color: #666;
      font-size: 26px;
      margin: 20px 0 10px 0;
    }
    .errors {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .errors_content {
        height: 56px;
        border-radius: 12px;
        box-sizing: border-box;
        padding: 0 26px 0 26px;
        border: 1px solid #454245;
        font-size: 26px;
        color: #454245;
        text-align: center;
        line-height: 56px;
        margin-top: 30px;
        margin-bottom: 5px;
        margin-left: 15px;
      }
      .active {
        height: 56px;
        border-radius: 12px;
        box-sizing: border-box;
        padding: 0 26px 0 26px;
        font-size: 26px;
        text-align: center;
        line-height: 56px;
        margin-top: 30px;
        margin-bottom: 5px;
        margin-left: 15px;
        border: 1px solid #f66913;
        color: #f66913;
      }
    }
    .input_top {
      font-size: 26px;
      color: #666;
      margin-top: 26px;
    }
    .text {
      width: 669px;
      height: 160px;
      padding: 10px;
      border-radius: 12px;
      border: 1px solid #454245;
      margin-top: 34px;
      outline: none;
      color: #666;
      font-size: 30px;
    }
    .input_bottom {
      margin-top: 30px;
      font-size: 24px;
      color: #666;
      text-align: right;
    }
    .btn {
      width: 474px;
      height: 72px;
      background: #f66913;
      border-radius: 12px;
      font-size: 38px;
      color: #fff;
      text-align: center;
      line-height: 72px;
      margin: 130px 0 0 106px;
      outline: none;
      border: none;
    }
    .btns {
      width: 474px;
      height: 72px;
      background: #d4d4d4 !important;
      border-radius: 12px;
      font-size: 38px;
      color: #fff !important;
      text-align: center;
      line-height: 72px;
      margin: 130px 0 0 106px;
      border: none;
    }
  }
  .boxs {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .content {
      width: 80%;
      background: white;
      border-radius: 10px;
      margin: 70% auto;
      .top {
        text-align: center;
        padding: 40px 0px;
        color: #666;
      }
      .bottom {
        text-align: center;
        padding: 35px 0px;
        border-top: 1px solid #999;
      }
    }
  }
}
</style>
