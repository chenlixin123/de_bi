<template>
  <div class="lockup">
    <div class="success">支付成功</div>
    <div class="much">￥{{data.sactualAmount}}</div>
    <div class="body">
      <div class="body-content">
        <div class="body-num">
          <span>车位号</span>
          <span>{{data.stallName}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-num">
          <span>车牌号码</span>
          <span>{{data.plateNumber}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-num">
          <span>开始时间</span>
          <span>{{start_Time}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-num">
          <span>结束时间</span>
          <span>{{end_Time}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-num">
          <span>订单编号</span>
          <span>{{data.orderNo}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-num">
          <span>停车时长</span>
          <span>{{data.parkingTime}}</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-num">
          <span>优惠减免</span>
          <span>{{data.couponAmount}}元</span>
        </div>
      </div>
       <div class='leave-txts'>结账成功后，请在{{data.leaveTime}}分钟内离场</div>
    </div>
    <div class="btn">
      <button @click="suss">完成</button>
    </div>
  </div>
</template>

<script>
import axios from "@/libs/api.request";
import Url from "@/libs/url";
export default {
  name: "Lock",
  data() {
    return {
      pay: {
        money: "10.0",
        num: "088",
        parknum: "京N12584",
        starttime: "2019/4/6  20:00",
        endtime: "2019/4/6  21:25",
        ordernum: "2019040610000460",
        parktime: "1时15分",
        dismoney: "5.0"
      },
      data: {},
      start_Time: "",
      end_Time: ""
    };
  },
  created() {
    let that = this;
    // console.log(Url.Time);
    let orderId = localStorage.getItem("orderId");
    console.log(orderId);
    axios
      .request({
        url: Url.url.verify,
        method: "get",
        params: {
          orderId: orderId
        }
      })
      .then(res => {
        console.log(res);
        that.data = res.data;
        that.start_Time = Url.Time(res.data.startTime);
        that.end_Time = Url.Time(res.data.endTime);
      });
  },
  methods: {
    suss() {
      let tap = localStorage.getItem('tap')
      if(tap == 0){
          this.$router.go(-2)
      }else{
         this.$router.go(-3)
      }
    }
  }
};
</script>
<style scoped>
.lockup {
  width: 100%;
  height: 100%;
}
.success {
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding-top: 60px;
  margin-bottom: 20px;
}
.much{
  width: 100%;
  font-size: 70px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 80px;
}
.leave-txts{
  width: 100%;
  font-size: 28px;
  color: #f66913;
  text-align: center;
  margin-top: 30px;
}
.body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.body-content {
  width: 95%;
  height: 98px;
}
.body-num {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  color: #333;
  border-bottom: 1px solid #f5f4f4;
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
.btn button {
  width: 286px;
  height: 74px;
  border-radius: 12px;
  font-size: 36px;
  color: #333;
  outline: none;
  background: #fff;
  border: 1px solid #333;
  margin-top: 80px;
}
</style>
