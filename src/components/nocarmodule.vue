<template>
    <div>
        <img class='img' src='@/assets/noCartupian@2x.png'>
<div class='title'>暂未发现您的长租车位信息</div>
<div class='content'>添加车牌号，将自动导入您开通的长租车位</div>
<div class='btn' @click='btn'>添加车牌号</div>
<!-- <div class='box' v-if='show'>
  <div class='small_box'>
    <div class='box_one'>
        最多能添加三个车牌
    </div> 
    <div class='box_two'>
        请去[个人中心]-[车牌号]进行修改
    </div> 
    <div class='line'></div>
    <div class='btns' @click='btns'>确定</div>
  </div>
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
            data:'',
            show:false,
             longitude: "116.41361",
      latitude: "39.91106",
        }
    },
    created(){
              let that = this
              axios.request({
                  url:Url.url.long_carLists,//查看长租用户车位列表
                  method:"post",
                   params: {
                    latitude: that.latitude,
                    longitude: that.longitude
                  },
              }).then(res => {
                    console.log(res.data.num)
                    if(res.data.num != 0){
                        that.$router.go(-1)
                    }
              })
            
    },
    methods:{
          btn(){
      // console.log('11111111111111')
      let that = this
              that.$router.push({
                  path:'/CarModuleList?num=1'
              })
  },
//   btns(){
//     let that = this
//       that.show = false
//   },
    }
}
</script>

<style lang="scss" scoped>
        .img{
  width: 170px;
  height:190px;
  margin-left:290px;
  margin-top:186px;
  margin-bottom: 50px;
}
.title{
  text-align: center;
  width:100%;
  font-size: 30px;
  color: #333333;
  margin-bottom: 36px;
}
.content{
  width:100%;
  text-align: center;
  font-size: 26px;
  color: #999999;
  margin-bottom: 138px;
}
.btn{
  width:594px;
  height: 80px;
  background: #f66913;
  border-radius: 60px;
  text-align: center;
  line-height: 80px;
  color: #ffffff;
  font-size:34px;
  margin: 0  auto;
  margin-bottom: 300px;
}
.bottom{
  font-size: 26px;
  color:#b3b2b2;
  width:100%;
  text-align: center;
}
.box{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  background: rgba(0, 0, 0, .5)
}
.small_box{
  width:554px;
  background: white;
  margin: 54% auto;
  border-radius: 12px;
  box-sizing: border-box;
  padding-top: 36px;
  padding-bottom: 32px;
}
.box_one{
  margin-left:40px;
  font-size: 30px;
  color:#666666;
  margin-bottom: 36px;
  font-weight:600;
}
.box_two{
  margin-left:40px;
  font-size: 30px;
  color:#666666;
  margin-bottom: 32px;
}
.line{
  width:478px;
  margin-left:40px;
  border-top:1px solid #f0efef;
}
.btns{
  width: 100%;
  text-align: center;
  margin-top: 32px;
  font-size: 30px;
  color: #333333;
}
</style>


