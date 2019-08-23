<template>
    <div class="page">
        <div class='box' v-for='(item,index) in data' :key='index' @click='big(item)'>
  <div class='title'>{{item.preName}}</div>
  <div class='boxs'>
    <div class='text' v-for='(item,index) in item.stalls' :key='index'>
      <div :class="ind == index ? 'contents' : 'content'" @click='tap(item,index)'>{{item.stallName}}</div>
    </div>
  </div>
</div>
<div class="btn" @click='submit'>确认车位</div>
    </div>
</template>
<script>
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import Url from "@/libs/url";
export default {
    data(){
    return{
         data:[],
      ind:-1,
      name:'',
      carname:'',
      num:'',
    stallId:'',
    preId:"",
    stallEndTime:''
    }},
    created(){
        let that = this
      console.log(that.$route.query)
    if (that.$route.query.num == undefined){
        console.log('非切换车位')
      }else{
        console.log('切换车位')
            that.ind = that.$route.query.index,
            that.name = that.$route.query.name,
            that.carname = that.$route.query.carname,
            that.num = that.$route.query.num,
          that.stallId = that.$route.query.stallId,
          that.preId = that.$route.query.preId,
          that.stallEndTime = that.$route.query.stallEndTime
      console.log(that.stallId)
      }
      that.shows()
    },
    methods:{

   
      //渲染车位授权列表
  shows(){
      let that = this
      axios.request({
          url:Url.url.sure,
          method:'get'
      }).then(res => {
          console.log(res)
          that.data = res.data
      })
  },
     //选择车位
  tap(e,index){
    let that = this 
    console.log(e)
    console.log(index)
      that.ind = index,
      that.name = e.stallName,
      that.stallId = e.stallId,
      that.stallEndTime = e.stallEndTime
  },
  //确认车位
  submit(){
      let that = this
      if(that.name == ''){
         alert('请选择车位')
      }else{
        that.$router.push({
          path: '/carImpower?name=' + that.name + "&carname=" + that.carname + "&index=" + that.ind + "&num=" + that.num + '&preId=' + that.preId + '&stallId=' + that.stallId + '&stallEndTime=' + that.stallEndTime
        })
      }
      console.log('确认车位')
  },
  big(e){
      console.log(e)
    let that = this
    console.log(e.preName)
      that.carname = e.preName,
      that.num = 2,
      that.preId = e.preId  
  },
   }
}
</script>
<style scoped>
    .page {
  width: 100%;
  height: 100%;
  background: #f5f4f4;
}

.box {
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 34px 0px;
  /* margin-top: 20px; */
  margin-bottom: 20px;
}

.title {
  font-size: 30px;
  color: #666;
  margin-left: 35px;
}

.boxs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.text {
  width: 33.3%;
  text-align: center;
  margin-top: 34px;
}

.content {
  width: 170px;
  height: 68px;
  border: 1px solid#c6c5c5;
  font-size: 32px;
  border-radius: 10px;
  color: #666;
  background: #fff;
  line-height: 68px;
  text-align: center;
  margin-left: 35px;
}

.contents {
  width: 170px;
  height: 68px;
  font-size: 32px;
  border-radius: 10px;
  background: #fff;
  line-height: 68px;
  text-align: center;
  margin-left: 35px;
  background-color: #f66913;
  color: #fff;
  border: 1px solid #fff;
}

.btn {
  width: 100%;
  background-color: #f66913;
  border: none;
  border-radius: 0;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 38px;
  height: 104px;
  padding-left: 0;
  padding-right: 0;
  line-height: 104px;
  text-align: center;
}

</style>

