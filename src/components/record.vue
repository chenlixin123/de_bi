<template>
<div class="scoll">
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            
         
        <div class="ss">
    <div class="page" v-if='num > 0' ref="homepage">
  <div class='box' v-for='(item,index) in data' :key='index' @click='tap(item)'>
    <div class='title'>
      <div class='title_title'>{{item.preName}}</div>
      <div class='title_name'>{{item.stallName}}</div>
      <div class="title_use" v-if='item.stallAuthType == 1'>自用</div>
      <div class="title_uses" v-else>授权</div>
      <div class='title_status'>已完成 ＞</div>
    </div>
    <div class='time'>{{item.startTime}}</div>
    <div class='times'>使用时长:{{item.serviceTime == '' ? '0分钟' : item.serviceTime}}</div>
    <div class='username' v-if='item.stallAuthType == 2 && item.mobiles != null || item.stallAuthType == 2 && item.username != null'><div class='username3'>使用人:</div><div class='username1' v-if='item.mobiles != null'>{{item.mobiles}}</div><div class='username2' v-if='item.username != null'>({{item.username}}）</div></div>
  </div>
  <div class="none">没有更多数据</div>
     <!-- loading -->
  <div v-if='loading == true' class='loadingq'>
    <div class='load-txtq'>加载中请稍候...</div>
  </div>
    </div>
  </div>
   </div>

   <div class="pages" v-if='num == 0'>
  <img class='img' alt=""  src='@/assets/zanwuchepaihao@2x.png'>
  <div class='text'>暂无停车记录</div>
  </div>

  </div>
</template>

<script>
import axios from "@/libs/api.request";
import Url from "@/libs/url";
import Cookies from "js-cookie";
export default {
    data(){
        return{
             count: 0,
      data: [],
      busy: false,
    busy: false,
            num:-1,
      data:[],
      use:'' ,// 车位权限类型 1原始用户  2被授权用户
      number:'',
      mobile:'',
      page:0,
    loading:false,
    datas:'',
     fullHeight: "" ,//fullHeight: document.documentElement.clientHeight  屏幕高度 默认值
        }
    },
    created(){
           let that = this
           console.log(that.$route.query)
           console.log(that.page,that.$route.query.stallId)
           axios.request({
               url:Url.url.record,
               method:'get',
                params: {
                    pageNo: that.page,
                    stallId:that.$route.query.stallId
                        },
            }).then(res => {
                console.log(res)
                 if(res.data.length == 0){
         
                        that.num = 0
         
                }else{
            console.log(res.data)
            res.data.forEach((item) => {
             if (item.mobile == null){
                console.log('没有手机号')
                }else{
              let mobile = item.mobile.substring(0, 3); //要截取字段的字符串
              let mobiles = item.mobile.substring(7, 11);
              console.log(mobile + '****' + mobiles)
              item.mobiles = mobile + '****' + mobiles
            }
          })
          console.log(res.data)
            that.num =  res.data.length
            // that.data = res.data


        }
            })
    },
    methods:{

      // 上拉加载更多
       loadMore() {
         let that = this
      this.busy = true
    let self = this
    axios.request({
      url:Url.url.record,
      method:"get",
       params: {
        pageNo: that.page += 1,
        stallId: that.$route.query.stallId
      },
    }).then(res => {
      console.log(that.page)
      console.log(res)
      if (res.data.length == 0) {
        } else {
          console.log(res.data)
            that.bus.$emit("loading", true);
      that.bus.$emit("tip", { title: "加载中请稍候..." });
          let datas = []
          res.data.forEach((item) => {
            if (item.mobile == null){
              console.log('手机号为空')
              datas.push(item)
            }else{
              let mobile = item.mobile.substring(0, 3); //要截取字段的字符串
              let mobiles = item.mobile.substring(7, 11);
              console.log(mobile + '****' + mobiles)
              item.mobiles = mobile + '****' + mobiles
              datas.push(item)
            }
          })
          console.log(datas)
          let data = that.data.concat(datas)
            that.data = data
            that.bus.$emit("loading", false);
        }
    })
        this.busy = false
    },
//跳转使用记录详情页
tap(item){
  let that = this
  console.log(item)
  let data = JSON.stringify(item)
  // console.log(data)
    that.datas = data
    that.$router.push({
        path:'/particulars?data=' +that.datas
    })
},
    },
}
</script>
<style lang="scss" scoped>
.scoll{
  width: 100%;
  height: 100%;
}
.ss{
    width: 100%;
    height: 100%;
}
    .page{
   width: 100%;
  background: #f5f4f4;
   box-sizing: border-box;
   padding-top: 20px;
   }
.pages{
     width: 100%;
     height: 100%;
  background: #f5f4f4;
   box-sizing: border-box;
}
.box{
  width: 690px;
  border-radius: 8px;
  margin: 0 auto;
  margin-bottom: 20px;
  background: white;
  box-sizing: border-box;
  padding-left: 28px;
  padding-right: 28px;
  padding-top: 28px;
  padding-bottom: 28px;
  position: relative;
}
.title{
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
.title_title{
  font-size: 30px;
  color: #333;
  margin-right: 12px;
}
.title_name{
  font-size: 30px;
  color: #faa901;
  margin-right: 18px;
}
.title_use{
  width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  background: #aad0ff;
  color: #689ee2;
  border-radius: 5px;
}
.title_uses{
   width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  background: #fdd688;
  color: #faa901;
  border-radius: 5px;
}
.title_status{
  font-size: 26px;
  color: #999;
  position: absolute;
  top:28px;
  right:28px;
}
.time{
  font-size: 28px;
  color: #666;
  margin-bottom: 16px;
}
.times{
   font-size: 28px;
  color: #666;
  margin-bottom: 16px;
}
.username{
   font-size: 28px;
  color: #666;
  display: flex;
}
.img{
   width: 240px;
   height: 180px;
   margin-top:200px;
   margin-left:290px;
  margin-bottom: 40px;
}
.text{
  font-size: 26px;
  color: #666666;
  margin-left:320px;
}
.loadingq{
   width: 312px;
  height: 80px;
  color: #fff;
  position: fixed;
  top: 625px;
  left: 219px;
  line-height: 80px;
  font-size: 28px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  z-index: 11000;
}
.load-txtq{
  display: inline-block;
  line-height: 80px;
  margin-left: 72px;
}
.none{
  width: 100%;
  text-align: center;
  color: #666;
  background: #f5f4f4;
  padding-bottom: 10px;
}
</style>


