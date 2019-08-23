<template>
    <div class="page">
        <div class='line'></div>
<div class='box'>
  <div class='carName'>
    <div>
      车位
    </div>
    <div>
      {{title}}
    </div>
  </div>
  <div class='title'>
    请选择故障原因
  </div>
</div>

<div class='titles'>
<div class='out_border' v-for='(item,index) in causeList' :key='index'>
  <div :class="index == indexs ? 'titles_two' : 'titles_one'" @click='nei_border(item,index)'>
    {{item.name}}
  </div>
  </div>
</div>

<div class='boxs'>
  <textarea placeholder="请描述具体车位故障" class='textarea' placeholder-class='placeholder_class'  maxlength='30' v-on:input='values' :value='value' />
  <div class='bottom'>{{number}}/{{numbers}}</div>
</div>
<button class='btn' @click='btn' :disabled='ff'>提交</button>

<!-- 弹出提示框 -->
<div class='black' v-if='show == true'>
  <div class='content'>
    <div class='content_top'>{{ss}}</div>
    <div class='lines'></div>
    <div class='content_bottom' @click='que'>确定</div>
  </div>
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
            number: 0,
    value: '',
    numbers: 30,
    classe: 'titles_one',
    classee: 'titles_two',
    show: false,
    show1: false,
    val: '',
    title: '',
    stallId: '',
    causeList: [],
    id: '',
    index: '',
    indexs: '11',
    ss: '提交成功，请联系车场工作人员',
    ff:true
        }
    },
    created(){
         let self = this;
         let that = this
    console.log(that.$route.query)

      that.stallName = that.$route.query.val

    let orderId = that.$route.query.stallId;
    let causeList = [];
    axios.request({
        url:Url.url.long_Feedbacks,
        method:"get"
    }).then(res =>{
        console.log(res)
         causeList = res.data;
          that.causeList = causeList,
          that.orderId = orderId
    })
    console.log(that.$route.query, that.$route.query.stallId)

      that.title = that.$route.query.val,
      that.stallId = that.$route.query.stallId

    },
    methods:{
     values(e) {
    let that = this
    console.log(e.target.value)
      that.value = e.target.value,
      that.number = e.target.value.length

  },
  nei_border(item,index) {
      let that = this
      console.log(item,index)
      that.id = item.id,
      that.index = index,
      that.indexs = index,
      that.val = item.name,
      that.ff = false
  },
  btn() {
      console.log('55555')
    let that = this
    if (that.id == "") {
        that.bus.$emit("tips", { show: true, title: "请选择故障原因" });
    } else {

        that.ff = true
      if (that.id == 102) {
        // console.log('其他')
        if (that.value != "") {
          console.log('提交成功')
          console.log(that.val , that.value,that.stallId,that.id )
          axios.request({
              url:Url.url.long_Feedback,
              method:"post",
               params: {
              dictId: that.id,
              dictName: that.val,
              extra: that.value,
              stallId: that.stallId
            },
          }).then(res => {
              console.log(res)
                if (res.status == true) {
                if (res.data == true) {
                    that.show = true,
                    that.ss = '提交成功，请联系车场工作人员'
                } else {
                     that.show = true,
                    that.ss = '提交失败，请联系车场工作人员'
                }
              } else {
                 that.show = true,
                    that.ss = '提交失败，请联系车场工作人员'
              }
          })
        } else {
          that.bus.$emit("tips", { show: true, title: "请填写详细描述" });
            that.ff = false
        }

      } else {
        console.log("别的选项")
         console.log(that.val , that.value,that.stallId,that.id )
        axios.request({
            url:Url.url.long_Feedback,
            method:"post",
            params: {
            dictId: that.id,
            dictName: that.val,
            extra: that.value,
            stallId: that.stallId
          }
        }).then(res => {
            console.log(res)
            if (res.status == true) {
              if (res.data == true) {
                that.show = true,
                that.ss = "提交成功，请联系车场工作人员"
                that.id = ''      
              } else {
                that.show = true,
                that.ss = "提交失败，请联系车场工作人员"
                that.id = ''
              }
            } else {
                that.show = true,
                that.ss = "提交失败，请联系车场工作人员"
            }
        })
      }
    }
  },
  que() {
    let that = this

      that.show = false,
      that.value = '',
      that.indexs = '11',
      that.number = 0

   that.$router.go(-1)
  },
  }
}
</script>
<style lang="scss" scoped>
        .page{
  width: 100%;
  height: 100%;
}
.line{
  width:100%;
  border-top:1px solid #e1e1e1;
}
.box{
  box-sizing: border-box;
  padding: 0px 30px;
  padding-top: 34px;
}
.carName{
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 34px;
}
.title{
  width:50%;
  font-size: 26px;
  color: #999999;
}
.titles{
  width:100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
.out_border{
  width: 32%;
  text-align: center;
  margin-left: 8px;
}
.titles_one{
  width:188px;
  height:58px;
  text-align: center;
  line-height: 58px;
  font-size: 24px;
  color: #999999;
  border:1px solid #999999;
  border-radius: 60px;
  margin: 0 auto;
  margin-top:30px;
}
.titles_two{
  width:188px;
  height:58px;
  text-align: center;
  line-height: 58px;
  font-size: 24px;
  color: #f66913;
  border:1px solid #f66913;
  border-radius: 60px;
  margin: 0 auto;
  margin-top:30px;
}
.boxs{
  box-sizing: border-box;
  padding: 0px 30px;
}
.placeholder_class{
  font-size: 26px;
  color: #999999;
}
.textarea{
  width:100%;
  height: 178px;
  font-size: 26px;
  border:1px solid #999999;
  margin-top:34px;
  border-radius: 12px;
  box-sizing: border-box;
  padding:20px 20px;
}
.bottom{
  width:100%;
  margin-top: 28px;
  font-size: 28px;
  color: #999999;
  text-align: right;
}
.btn{
  width: 100%;
  height: 98px;
  background: #f66913;
  font-size: 36px;
  color: #ffffff;
  text-align: center;
  line-height: 98px;
  border-radius: 0px;
  outline: none;
  border: none;
  position: absolute;
  left:0;
  bottom:0;
}
.black{
width:100%;
height:100%;
position: fixed;
top:0;
left:0;
background: rgba(0, 0, 0, 0.5);
z-index: 9999;
}
.content{
width:80%;
position: fixed;
top:38%;
left:10%;
background: white;
border-radius: 14px;
text-align: center;
z-index: 10000;
}
.content_top{
height:30%;
line-height: 100px;
font-size: 30px;
color: #666666;
}
.content_bottom{
height: 60%;
line-height: 100px;
}
.lines{
width: 90%;
height: 0.1px;
margin: 0 auto;
border-top: 0.5px solid #ece7e7;
}
button[disabled]:not([type]) {
color: #fff;
background: #c5c1c1;
}
</style>


