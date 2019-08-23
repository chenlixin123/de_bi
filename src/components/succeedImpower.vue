<template>
    <div>
<div class="lines"></div>
<div class='title'>授权成功</div>
<div class='box'>
  <div class='carname'>
    <div class='carnames'>{{carname}}</div>
    <div class='name'>{{name}}</div>
  </div>
  <div class='user'>
    <div class='user_left'>被授权人</div>
    <div class='user_right'>
      <div class='right1'>{{relationName}}</div>
      <div class='right2'>{{username}}</div>
    </div>
  </div>
  <div class='mobile'>
    <div class='mobile_left'>手机号</div>
    <div class='mobile_right'>{{mobile}}</div>
  </div>
  <div class='start_time'>
    <div class='start_left'>开始时间</div>
    <div class='start_right'>{{start_time}}</div>
  </div> 
   <div class='end_time'>
    <div class='end_left'>到期时间</div>
    <div class='end_right'>{{endtime}}</div>
  </div> 
</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            carname:'', //车场名称
            name:'', //车位名称
            start_time:'', //开始时间
            endtime:'', //结束时间
            mobile:'', //电话号
            relationName:'', //关系名称
            username:'' ,//被授权人
            stallId:'',//车位ID
            skip:'',//返回第几页
        }
    },
    created(){
        let that = this
        console.log(that.$route.query)
          that.carname = that.$route.query.carname,
          that.name = that.$route.query.name,
          that.start_time = that.$route.query.start_time,
          that.endtime = that.$route.query.endtime,
          that.mobile = that.$route.query.mobile,
          that.relationName = that.$route.query.relationName,
          that.username = that.$route.query.username,
          that.stallId = that.$route.query.stallId,
          that.skip = that.$route.query.skip
    },
    beforeDestroy(){
        let that = this
    if (that.skip == 1){
        that.$router.go(-2)
      console.log('修改授权')
    }else{
       that.$router.go(-3)
      //  that.$router.push({
      //    path:'/goback'
      //  })
    //  that.$router.push({
    //    path:'/NoEmpower'
    //  })
      console.log('授权成功')
    }
    }
}
</script>

<style lang="scss" scoped>
    .lines{
  width: 100%;
  border-top: 1px solid #e6e6e6;
}
.title{
  width: 100%;
  margin-top: 108px;
  margin-bottom: 88px;
  font-size: 46px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
.box{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
}
.carname{
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}
.carnames,.user_left,.mobile_left,.start_left,.end_left{
  height: 100px;
  line-height: 100px;
   font-size: 30px;
   color: #333;
}
.name{
  font-size: 30px;
  color: #faa901;
  font-weight: bold;
  margin-left: 18px;
}


.user,.mobile,.start_time,.end_time{
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
}
.user_right{
  /* position: relative; */
  display: flex;
  align-items: center;
}
.right1{
  width: 54px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background: #ffe7b6;
  font-size: 18px;
  color: #faa901;
  border-radius: 2px;
  margin-right: 18px;
}
.right2,.mobile_right,.start_right,.end_right{
  font-size: 30px;
  color: #999;
}
</style>



