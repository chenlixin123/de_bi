<template>
<div class="page">
    <div class="line"></div>
<div class='body'>
  <input class='put_mobile' placeholder='请输入被授权人手机号' type='number' readonly='true' oninput="if(value.length==12)value=value.slice(0,11)" :value="mobile">
  <input class='put_user' placeholder='请输入被授权人备注名'  v-on:input='put_user' maxlength='10' :value="username">
  <div class='relation'>
    <div v-for='(item,index) in relation' :key='index' :class="inds == index ? 'texts' : 'texte'" @click='tap(item,index)'>{{item.name}}</div>
  </div>
  <div class='time'>
  <input type="text" @click='input1' id="showDate" readonly='true' class='start_time' placeholder='开始时间' :value='start_time'> -
  <input type="text" @click='input2' readonly='true' class='end_time' placeholder='到期时间' :value='end_time'>
  </div>
  <button :class="dis == true ? 'btns' : 'btn'" @click='btn'>确定授权</button>
   <div class='cancel_bottom'>
    <div class='cancels' @click='cancels'>取消授权</div>
   </div>
  </div>
</div>
</template>

<script>
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import Url from "@/libs/url";
import '../assets/iosSelect.js'
import '../assets/iosSelect.css';
import './zepto.js'
    export default {
        data() {
            return {
     start_time: '',
    end_time: '',
    ss: '',
    show: 'false',
    relation: [],
    inds: -1,
    mobile: '',
    username: '',
    hours: '',
    min: '',
    value: [],
    times: '',
    time: '',
    hour: '',
    mins: '',
    judge: '',
    dis: true,
    preId: '',
    stallId: '',
    carname: '',
    name: '',
    relationId: '',
    relationName: '',
    loadingText:'加载中请稍候',
    loading:'none',
    stallEndTime:'',
    title:'',
    id:''
            }
        },
      created() {
      let that = this
      console.log(that.$route.query)
      let data = JSON.parse(that.$route.query.data)
      let datas = JSON.parse(that.$route.query.datas)
      console.log(data)
      console.log(datas)
      that.preId = data.preId,
      that.stallId = data.stallId,
      that.carname = data.preName,
      that.name = data.stallName,
      that.id = datas.id,
      that.mobile = datas.mobile,
      that.username = datas.username,
      that.relationName = datas.relationName,
      that.relationId = datas.relationId,
      that.start_time = datas.startTime,
      that.end_time = datas.endTime,
      that.stallEndTime = datas.stallEndTime
       that.bus.$emit("loading", true);
      that.bus.$emit("tip", { title: "加载中请稍候..." });


        //用户关系渲染
        axios.request({
        url:Url.url.friends,
        method:'get'
    }).then(res => {
        console.log(res.data)
          if (res.status == true){

          that.relation = res.data,
           that.bus.$emit("loading", false);

        for(let i = 0; i < res.data.length; i++){
          if (that.relationName == res.data[i].name){
              that.inds = i
            if (that.start_time == '' || that.end_time == '' || that.inds == -1) {
                that.dis = true
            } else {
                that.dis = false
            }
          }
        }
        }else{
          that.bus.$emit("loading", false);
         that.bus.$emit("tips", { show: true, title: "加载失败" });
        }
    })
        },

methods: {

//输入备注名称
put_user(e){
    let that = this
    // console.log(e.target.value.length)
    that.username = e.target.value
    },

//选择关系
 tap(e,index) {
    console.log('选择关系')
    let that = this
    console.log(e)
      that.inds = index,
      that.relationId = e.id,
      that.relationName = e.name
      if (that.start_time == '' || that.end_time == '' || that.inds == -1) {
          that.dis = true
      } else {
          that.dis = false
      }
  },
  //点击开始时间输入框
  //   时间选择器
input1(){
    var showDateDom = $('#showDate');
    var that = this;
    //截取小时与分钟
     let fen = that.start_time.split(' ')
      console.log(fen[0])
      let data = fen[0].split('月')
        console.log(data[0])
        console.log(parseInt(data[1]))
     let time = fen[1].split(':')

    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    var hours = parseInt(time[0])
    var minutes = parseInt(time[1])
    var date = data[0] + '月' + parseInt(data[1]) + '日'
    console.log(date,hours,minutes)
    var arrs = [];
    showDateDom.attr('data-year',date);
    showDateDom.attr('data-month', hours);
    showDateDom.attr('data-date', minutes);
    // 数据初始化
    function formatYear (nowYear) {
        for(var i=1;i<13;i++){
            setDate(i);
        }
        return arrs;
    }
    
    function formatMonth () {
        var arr = [];
       for(var i=0;i<24;i++){
           arr.push({
                id: i + '',
                value: i
            });
       }
        return arr;
    }
    function formatDate () {
         var arr = [];
        for (var i = 0; i <= 59; i++) {
           arr.push({
                id: i + '',
                value: i
            });
        }
        return arr;
    }
        function getDate(month,count){
            for(var i=1;i<=count;i++){
                arrs.push({
                id: month+'月'+i + '日',
                value: month+'月'+i + '日'
            });
            }
        }
    function setDate(nowMonth){
        if (/^(1|3|5|7|8|10|12)$/.test(nowMonth)) {
            getDate(nowMonth,31);
        }
        else if (/^(4|6|9|11)$/.test(nowMonth)) {
            getDate(nowMonth,30);
        }
        else if (/^2$/.test(nowMonth)) {
            if (nowYear % 4 === 0 && nowYear % 100 !==0 || nowYear % 400 === 0) {
                getDate(nowMonth,28);
            }
            else {
                getDate(nowMonth,29);
            }
        }
        else {
            throw new Error('month is illegal');
        }
    }
    var yearData = function(callback) {
       callback(formatYear(nowYear))
    }
    console.log(yearData)
    var monthData = function (year, callback) {
        callback(formatMonth());
    };
    var dateData = function (year, month, callback) {
        callback(formatDate());
    };

        var oneLevelId = showDateDom.attr('data-year');
        var twoLevelId = showDateDom.attr('data-month');
        var threeLevelId = showDateDom.attr('data-date');
        var iosSelect = new IosSelect(3, 
            [yearData, monthData, dateData],
            {
                title: '开始时间',
                itemHeight: 35,
                itemShowCount:5,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    showDateDom.attr('data-year', date);
                    showDateDom.attr('data-month', hours);
                    showDateDom.attr('data-date', minutes);
                    showDateDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                    console.log(selectOneObj.value,selectTwoObj.value,selectThreeObj.value)

                       let selectTwoObjs = ''
                    if(selectTwoObj.value < 10){
                       selectTwoObjs =  '0' + selectTwoObj.value
                       console.log(selectTwoObjs)
                    }else{
                            selectTwoObjs = selectTwoObj.value
                    }

                    let selectThreeObjs = ''
                      if(selectThreeObj.value < 10){
                       selectThreeObjs =  '0' + selectThreeObj.value
                       console.log(selectThreeObjs)
                    }else{
                            selectThreeObjs = selectThreeObj.value
                    }

                    that.start_time = selectOneObj.value + ' ' + selectTwoObjs + ':' + selectThreeObjs
                     if (that.start_time == '' || that.end_time == '' || that.inds == -1) {
                        that.dis = true
                      } else {
                        that.dis = false
                      }
                }
        });
},
  //点击结束时间输入法
  input2(){
      console.log('结束时间')
    var showDateDom = $('#showDate');
    var that = this;

     //截取小时与分钟
     let fen = that.end_time.split(' ')
      console.log(fen[0])
      let data = fen[0].split('月')
        console.log(data[0])
        console.log(parseInt(data[1]))
     let time = fen[1].split(':')
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    var hours = parseInt(time[0])
    var minutes = parseInt(time[1])
    var date = data[0] + '月' + parseInt(data[1]) + '日'
    var arrs = [];
    showDateDom.attr('data-year',date);
    showDateDom.attr('data-month', hours);
    showDateDom.attr('data-date', minutes);
    // 数据初始化
    function formatYear (nowYear) {
        for(var i=1;i<13;i++){
            setDate(i);
        }
        return arrs;
    }
    
    function formatMonth () {
        var arr = [];
       for(var i=0;i<24;i++){
           arr.push({
                id: i + '',
                value: i
            });
       }
        return arr;
    }
    function formatDate () {
         var arr = [];
        for (var i = 0; i <= 59; i++) {
           arr.push({
                id: i + '',
                value: i
            });
        }
        return arr;
    }
        function getDate(month,count){
            for(var i=1;i<=count;i++){
                arrs.push({
                id: month+'月'+i + '日',
                value: month+'月'+i + '日'
            });
            }
        }
    function setDate(nowMonth){
        if (/^(1|3|5|7|8|10|12)$/.test(nowMonth)) {
            getDate(nowMonth,31);
        }
        else if (/^(4|6|9|11)$/.test(nowMonth)) {
            getDate(nowMonth,30);
        }
        else if (/^2$/.test(nowMonth)) {
            if (nowYear % 4 === 0 && nowYear % 100 !==0 || nowYear % 400 === 0) {
                getDate(nowMonth,28);
            }
            else {
                getDate(nowMonth,29);
            }
        }
        else {
            throw new Error('month is illegal');
        }
    }
    var yearData = function(callback) {
       callback(formatYear(nowYear))
    }
    var monthData = function (year, callback) {
        callback(formatMonth());
    };
    var dateData = function (year, month, callback) {
        callback(formatDate());
    };

        var oneLevelId = showDateDom.attr('data-year');
        var twoLevelId = showDateDom.attr('data-month');
        var threeLevelId = showDateDom.attr('data-date');
        var iosSelect = new IosSelect(3, 
            [yearData, monthData, dateData],
            {
                title: '到期时间',
                itemHeight: 35,
                itemShowCount:5,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    showDateDom.attr('data-year', date);
                    showDateDom.attr('data-month', hours);
                    showDateDom.attr('data-date', minutes);
                    showDateDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                    console.log(selectOneObj.value,selectTwoObj.value,selectThreeObj.value)
                    let selectTwoObjs = ''
                    if(selectTwoObj.value < 10){
                       selectTwoObjs =  '0' + selectTwoObj.value
                       console.log(selectTwoObjs)
                    }else{
                            selectTwoObjs = selectTwoObj.value
                    }

                    let selectThreeObjs = ''
                      if(selectThreeObj.value < 10){
                       selectThreeObjs =  '0' + selectThreeObj.value
                       console.log(selectThreeObjs)
                    }else{
                            selectThreeObjs = selectThreeObj.value
                    }

                    that.end_time = selectOneObj.value + ' ' + selectTwoObjs + ':' + selectThreeObjs
                    console.log(that.num,that.start_time,that.end_time,that.inds)
                     if (that.start_time == '' || that.end_time == '' || that.inds == -1) {
                        that.dis = true
                    } else {
                      that.dis = false
                      }
                 }
        });
  },
  //确定授权
  btn(){
    //   开始时间截取
      let that = this
    let date=new Date;
    let y = date.getFullYear()//年
    console.log(that.start_time)
    console.log(parseInt(that.start_time))
    let m = parseInt(that.start_time) //月
    let ri = that.start_time.split('月')
    let d = parseInt(ri[1])  //日
    console.log(d)
    let shi = that.start_time.split('日')
    let shis = parseInt(shi[1])
    console.log(shis) //时
    let fen = that.start_time.split(':')
    let fens = parseInt(fen[1])//分
    let start_time = y + '/' + m + '/' + d + " " + shis + ":" + fens
    console.log(y + '/' + m + '/' + d + " " + shis + ":" + fens) 


    // 结束时间截取
    console.log(that.end_time)
    console.log(parseInt(that.end_time))
    let end_m = parseInt(that.end_time) //月
    let end_ri = that.end_time.split('月')
    let end_d = parseInt(end_ri[1])  //日
    console.log(d)
    let end_shi = that.end_time.split('日')
    let end_shis = parseInt(end_shi[1])
    console.log(shis) //时
    let end_fen = that.end_time.split(':')
    let end_fens = parseInt(end_fen[1])//分
    let end_time = y + '/' + end_m + '/' + end_d + " " + end_shis + ":" + end_fens
    console.log(y + '/' + end_m + '/' + end_d + " " + end_shis + ":" + end_fens)



 let stallEndTime = that.stallEndTime.split('-')
    console.log(stallEndTime)
     console.log(stallEndTime[0]+'-'+stallEndTime[1]+'-'+stallEndTime[2])
    let data = new Date(stallEndTime[0]+'-'+stallEndTime[1]+'-'+stallEndTime[2])
    let time = data.getTime();  
    console.log(time)

    console.log(y + '-' + m + '-' + d + " " + shis + ":" + fens)
     let data1 = new Date(y + '-' + m + '-' + d + " " + shis + ":" + fens)
    let start_times = data1.getTime()
    console.log(start_times)

    
     let data2 = new Date(y + '/' + end_m + '/' + end_d + " " + end_shis + ":" + end_fens)
    let end_times = data2.getTime();  
    console.log(end_times)
if(start_times > time){
    that.bus.$emit("tips", { show: true, title: "开始时间不能大于车位使用时间" });
        return
}else if(end_times > time){
    that.bus.$emit("tips", { show: true, title: "到期时间不能大于车位使用时间" });
       return
}
      console.log('确定授权')
       let mobile_verify = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(16[0-9]{1}))+\d{8})$/;
    if (that.mobile == '') {
            that.bus.$emit("tips", { show: true, title: "请输入被授权人的手机号" });
    } else if (!mobile_verify.test(that.mobile)) {
         that.bus.$emit("tips", { show: true, title: "请输入正确的手机号" });
    }else if (that.inds == -1) {
         that.bus.$emit("tips", { show: true, title: "请选择被授权人与您的关系" });
    } else if (that.start_time == '') {
         that.bus.$emit("tips", { show: true, title: "请输入开始时间" });
    } else if (that.end_time == '') {
         that.bus.$emit("tips", { show: true, title: "请输入到期时间" });
    }else if(start_times == end_times){
     that.bus.$emit("tips", { show: true, title: "请设置有效时间" });
    }else{
        console.log(mobile_verify.test(that.mobile))
        that.bus.$emit("loading", true);
        that.bus.$emit("tip", { title: "加载中请稍候..." });

        //请求授权接口
        axios.request({
            url:Url.url.update,
            method:"post",
            params:{
                endTime: end_time, //结束时间
                startTime: start_time, //开始时间
                // mobile: that.mobile, //手机号
                // preId: that.preId, //车区ID
                // preName: that.carname, // 车区名称
                // stallIds:that.stallId, //车位ID
                // stallNames:that.name, //车位名称
                id:that.id,//主键ID
                username: that.username, //用户名称
                relationId: that.relationId, //关系ID
                relationName: that.relationName, //关系名称
            }
        }).then(res => {
            console.log(res)
             if(res.data == true){
           that.bus.$emit("tips", { show: true, title: "授权成功" });
           localStorage.setItem('show', '1')
            that.bus.$emit("loading", false);
            setTimeout(() => {
              that.$router.push({
                path: '/succeedImpower?start_time=' + that.start_time + '&endtime=' + that.end_time + '&mobile=' + that.mobile + '&username=' + that.username + '&relationName=' + that.relationName + '&carname=' + that.carname + '&name=' + that.name + '&stallId=' + that.stallId + '&skip=1'
              })
            },1000)
          }else{
           that.bus.$emit("loading", false);
            console.log(res.message.content)
            if (res.message.code == 9000001) {
             that.bus.$emit("tips", { show: true, title: "开始时间不能大于到期时间" });
            } else {
                that.bus.$emit("tips", { show: true, title: res.message.content });
            }
          }
        })
    }
  },
   //取消授权
  cancels(){
    let that = this
     that.bus.$emit("loading", true);
      that.bus.$emit("tip", { title: "加载中请稍候..." });
    console.log(that.id)
    axios.request({
      url:Url.url.cancels + '?id=' + that.id,
      method:"post"
    }).then(res => {
      console.log(res)
      if(res.data == true){
           that.bus.$emit("loading", false);
           that.bus.$emit("tips", { show: true, title: "取消成功" });
            setTimeout(function () {
                that.$router.go(-1)
            }, 1000);
          }else{
             that.bus.$emit("loading", false);
           that.bus.$emit("tips", { show: true, title: "取消失败" });
          }
    })
  },
        }
    }
</script>

<style scoped>
    .body {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 100px;
        position: relative;
    }

    .line {
        width: 100%;
        border-top: 1px solid #eee;
    }

    .put_mobile {
        width: 100%;
        height: 115px;
        font-size: 32px;
        outline: none;
        border: none;
        border-bottom: 1px solid #eee;
        position: relative;
    }

    .put_user {
        width: 100%;
        height: 115px;
        font-size: 32px;
         border: none;
        border-bottom: 1px solid #eee;
        outline: none;
    }

    .relation {
        width: 100%;
        height: 115px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .texte {
        width: 98px;
        height: 42px;
        line-height: 42px;
        border: 1px solid #cdcdcd;
        border-radius: 8px;
        font-size: 26px;
        color: #333;
        text-align: center;
    }

    .texts {
        width: 98px;
        height: 42px;
        line-height: 42px;
        border: 1px solid #faa901;
        background: #faa901;
        border-radius: 8px;
        font-size: 26px;
        color: #fff;
        text-align: center;
    }

    .time {
        width: 100%;
        height: 115px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .start_time {
        width: 50%;
        text-align: left;
        font-size: 32px;
        background: white;
        border: none;
    }

    .end_time {
        width: 50%;
        text-align: right;
        font-size: 32px;
         background: white;
        border: none;
    }

    .btn {
        width: 100%;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background: #faa901;
        color: #fff;
        border-radius: 50px;
        margin-top: 140px;
        border: none;
        outline: none;
        font-size: 30px;
    }

    .btns {
        width: 100%;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background: #e6e6e6;
        color: #ffffff;
        border: none;
        border-radius: 50px;
        margin-top: 140px;
        border: none;
        outline: none;
         font-size: 30px;
    }

    .box {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }

    .time_bottom {
        width: 610px;
        height: 96px;
        background: white;
        position: absolute;
        bottom: 96px;
        left: 9%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .cancel {
        width: 50%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #999;
        font-size: 30px;
        border-right: 1px solid #eee;
    }

    .confirm {
        width: 50%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #333;
        font-size: 30px;
    }

    .time_top {
        width: 610px;
        height: 80px;
        background: white;
        position: absolute;
        bottom: 568px;
        left: 9%;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }

    .title {
        width: 100%;
        height: 50px;
        margin-top: 30px;
        text-align: center;
        font-size: 30px;
        color: #333;
    }
    .cancel_bottom{
  width: 100%;
  margin-top: 54px;
  text-align: center;
}
.cancels{
  font-size: 28px;
  color: #999;
}
</style>