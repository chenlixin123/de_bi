<template>
    <div class="bo">
<div class="line"></div>
<div class='text'>
  <div class='title'>{{carname}}</div>
  <div class='name'>{{name}}</div>
  <img class='img' src='@/assets/qiehuan@2x.png' @click='switc' v-if='num > 1'>
</div>
<div class='lines'></div>
<button class='btne' @click='after'>下一步</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
             name:'',
      carname:'',
      num:'',
      index:'',
    stallId:'',
    preId:'',
    stallEndTime:'',
    ss:8
        }
    },
    created(){
         let that = this
         console.log(that.$route.query.num)
    if (that.$route.query.index == undefined){
        that.name = that.$route.query.name,
        that.carname = that.$route.query.carname,
        that.num = that.$route.query.num,
        that.stallId = that.$route.query.stallId,
        that.preId = that.$route.query.preId,
        that.stallEndTime = that.$route.query.stallEndTime
    }else{
        that.name = that.$route.query.name,
        that.carname = that.$route.query.carname,
        that.num = that.$route.query.num,
        that.index = that.$route.query.index,
        that.stallId = that.$route.query.stallId,
        that.preId = that.$route.query.preId,
        that.stallEndTime = that.$route.query.stallEndTime
    }
    },
    methods:{

  
      //切换授权车位
  switc(){
      console.log('跳转选车位页面')
      let that = this 
    that.$router.push({
      path: '/addImpower?index=' + that.index + '&num=' + that.num + '&carname=' + that.carname + '&name=' + that.name + '&stallId=' + that.stallId + '&preId=' + that.preId + '&stallEndTime=' + that.stallEndTime,
    })
  },
  //下一步
  after(){
    let that = this
    that.$router.push({
      path: '/confirm?preId=' + that.preId + "&stallId=" + that.stallId + '&carname=' + that.carname + '&name=' + that.name + '&stallEndTime=' + that.stallEndTime
    })
  }
    }
}
</script>


<style scoped>
.bo{
  text-align: center;
}
    .line{
  width: 100%;
  border-top: 1px solid #eee;
}
.text{
  width: 100%;
  box-sizing: border-box;
  padding: 0 100px;
  display: flex;
  align-items: center;
  margin-top: 264px;
  position: relative;
}
.title{
  font-size: 30px;
  color: #333;
}
.name{
  font-size: 30px;
  font-weight: bold;
  color: #faa901;
  margin-left: 18px;
}
.img{
  width: 50px;
  height: 50px;
  margin-left: 150px;
  position: absolute;
  top: 0;
  right: 100px;
}
.lines{
  width:75%;
  margin: 0 auto;
  margin-top: 50px;
  border-top: 1px solid #eee;
}

 .btne{
  width: 80%;
  height: 80px;
  margin-top: 342px;
  border: none;
  outline: none;
  border-radius: 50px;
  background: #faa901;
  color: white;
  font-size: 34px;
}
</style>


