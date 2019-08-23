<template>
  <div class="loading" v-show="loading">
    <div class="loading_img">
      <figure class="img">
        <img src="./logo.png" width="100%">
      </figure>
      <figure class="img_box">
        <img :src="url" alt width="100%">
      </figure>
      <div class="text">{{tip.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loading",
  data() {
    return {
      loading: "",
      url: "",
      text: "",
      tip: {
        title: ""
      }
    };
  },
  created() {
    var that = this;
    this.bus.$on("loading", function(data) {
      that.loading = !!data;
    });
    this.bus.$on("tip", data => {
      this.tip = data;
    });
    let i = 0;
    setInterval(() => {
      if (i >= 21) {
        i = 0;
      } else {
        i += 1;
      }
      that.url = require("./loading_" + i + ".png");
    }, 50);
  }
};
</script>
<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0);
  .loading_img {
    width: 320px;
    height: 80px;
    border-radius: 10px;
    box-sizing: border-box;
    padding-right: 20px;
    background: blue;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.7);
    position: relative;
    .img {
      width: 30px;
      padding: 0;
      margin: 0;
      position: absolute;
      top: 26px;
      left: 28px;
    }
    .img_box {
      width: 55px;
      padding: 0;
      margin: 0;
      position: absolute;
      top: 15px;
      left: 15px;
      // animation: haha1 0.8s linear infinite;
    }
    // @-webkit-keyframes haha1 {
    //   0% {
    //     transform: rotate(0deg);
    //   }

    //   25% {
    //     transform: rotate(90deg);
    //   }

    //   50% {
    //     transform: rotate(180deg);
    //   }

    //   75% {
    //     transform: rotate(270deg);
    //   }

    //   100% {
    //     transform: rotate(360deg);
    //   }
    // }
  }
}
</style>
