<template>
<div>
    <div class='lines'></div>
<div class='box'>
  <div class='car'>
      <div class='carname'>{{data.preName}}</div>
      <div class='name'>{{data.stallName}}</div>
  </div>
  <div class='mobile'>{{datas.mobile}}</div>
  <div class='user'>
    <div class='friend'>{{datas.relationName}}</div>
    <div class='username'>{{datas.username}}</div>
  </div>
  <div class='time'>
    <div class='start_time'>{{datas.startTime}}</div>
    -
    <div class='end_time'>{{datas.endTime}}</div>
  </div>
  <div class='bottom'>{{datas.authFlag == 1 ? '授权已取消' : datas.authFlag == 2 ? '授权已过期' : '授权已失效' }}</div>
</div>
</div>
</template>

<script>
export default {
    data(){
        return{
            data: [],
            datas: ''
        }
    },
    created(){
    let that = this
    console.log(that.$route.query)
    let data = JSON.parse(that.$route.query.data)
    let datas = JSON.parse(that.$route.query.datas)
    console.log(data)
    console.log(datas)
      that.data = data,
      that.datas = datas
    }
}
</script>

<style scoped>
    .lines{
  width: 100%;
  border-top: 1px solid #e6e6e6;
}
.box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 60px;
}
.car{
  width: 100%;
  height: 115px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 86px;
}
.carname{
  font-size: 32px;
  color: #333;
}
.name{
   font-size: 32px;
  color: #faa901;
  font-weight: bold;
  margin-left: 18px;
}
.mobile{
   width: 100%;
  height: 115px;
  line-height: 115px;
   font-size: 32px;
  color: #333;
  border-bottom: 1px solid #e6e6e6;
}
.user,.time{
  width: 100%;
  height: 115px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.friend{
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
.username{
   font-size: 30px;
  color: #999;
}
.start_time{
   font-size: 32px;
  color: #333;
  width: 50%;
  text-align: left;
}
.end_time{
   font-size: 32px;
  color: #333;
  width: 50%;
  text-align: right;
}
.bottom{
  width: 100%;
  margin-top: 160px;
  font-size: 28px;
  color: #999;
  text-align: center;
}
</style>


