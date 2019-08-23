<template>
    <div class="page">
        <div class='carname'>
  <div class='carname_left'>停车场</div>
  <div class='carname_right'>{{data.preName}}</div>
</div>
<div class='carname'>
  <div class='carname_left'>车位号</div>
  <div class='carname_right'>{{data.stallName}}</div>
</div>
<div class='carname'>
  <div class='carname_left'>使用状态</div>
  <div class='carname_right'>已完成</div>
</div>
<div class='carname'>
  <div class='carname_left'>开始时间</div>
  <div class='carname_right'>{{data.startTime}}</div>
</div>
<div class='carname'>
  <div class='carname_left'>结束时间</div>
  <div class='carname_right'>{{data.endTime}}</div>
</div>
<div class='carname'>
  <div class='carname_left'>使用时长</div>
  <div class='carname_right'>{{data.serviceTime == '' ? '0分钟' : data.serviceTime}}</div>
</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:''
        }
    },
    created(){
        let that = this
    let data = JSON.parse(that.$route.query.data)

        that.data = data

      console.log(that.data)
    }
}
</script>

<style scoped>
    .page{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  background: #f5f4f4;
}
.carname{
  width: 100%;
  height: 80px;
  line-height: 80px;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
   font-size: 30px;
  color: #333333;
  background: white;
}
.carname_left{
  width: 100%;
  height: 100%;
  text-align: left;
  border-bottom: 2px solid #f5f4f4;
}
.carname_right{
   width: 100%;
  height: 100%;
  text-align: right;
  border-bottom: 2px solid #f5f4f4;
}
</style>


