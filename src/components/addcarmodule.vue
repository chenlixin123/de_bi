<template>
    <div class='add-plate'>
   <div class='plate-txt'>请添加真实有效的车牌号码</div>
   <div class='plate-inp'>
      <div @click="plateZh" class='plate-zh'>{{zhData[0]}}</div>
      <div @click='inMsg' class='plate-zh'>{{zhData[1]}}</div>
      <img class='plate-circle' src='@/assets/circle.png'>
      <div class='plate-num' @click='inMsg'>
        <div class="div" v-for="(item,index) in zhData" :key="index" v-if="index>1">{{item}}</div>
         <div v-if="zhData.length<3">请输入完整信息</div>
      </div>
   </div>
   <div class='eight'>
      <div class='eight-num'>8位新能源车牌</div>
      <img @click='changeNum' class='eight-img' :src="img">
      <image @click='changeNum' class='eight-img' :src="img"></image>
   </div>
   <div class="add-btns"><button @click='addPlete' class='add-btn' data-clicknum=''>保存</button></div>
   <div class='keyword' v-if="keyWord==true">
      <div class='key-txt'>
         <div @click='keyDel' class='key-del'>删除</div>
         <div @click='keyTrue' class='key-true'>确定</div>
      </div>
      <div class='key-btn-container'>
         <div class='key-btn' v-for="(item,index) in keyBtn" :key="index" @click='inPleteNumber(item)'>
            {{item}}
         </div>
      </div>
   </div>
    <div class='keyword' v-if="keyWords==true">
      <div class='key-txt'>
         <div @click='keyDel' class='key-del'>删除</div>
         <div @click='keyTrue' class='key-true'>确定</div>
      </div>
      <div class='key-btn-container'>
         <div class='key-btn' v-for="(item,index) in descWord" :key="index" @click='inPleteNumber(item)'>
            {{item}}
         </div>
      </div>
   </div> 


<!--    
   <input type="text" v-on:input ="inputFunc">
   <button @click="bnt">提交</button> -->
</div>
</template>
<script>
import axios from "@/libs/api.request";
import Cookies from "js-cookie";
import Url from "@/libs/url";
export default {
    data(){
        return{
    keyWord: false,
    keyWords:false,
    eightWord: false,
    carPlete: ["京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪",
      "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤",
      "桂", "琼", "渝", "川", "贵", "云", "藏", "陕", "甘", "青",
      "宁", "新", "使"
    ], //中文键盘key
    descWord: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
      "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L",
      "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
      "Y", "Z", "领", "警", "学", "使", "港", "澳"
    ], //中文键盘key
    zhData: [],
    zhDatas: [],
    CanNum: 7,
    types: "",
    numes: "",
    preId:"",
     distance:"",
     statues:"",
     preIds:"",
     nums:"",
     txt:"",
     data:"",
     num:'',
     img:'',
    //本地经纬度
    location: {
      longitude: "116.41361",
      latitude: "39.91106"
    },
    preName:'',
    val:'',
    stallEndTime:'',
    plate:'',
    stallId:'',
    battery:'',
    gatewayStatus:'',
    carlist:[],
    obj:'',
    value:''
        }
    },
    created(){
        let that = this 
        console.log(that.$route.query.num)
        that.groupId = localStorage.getItem('groupId')
        console.log(that)
           this.img = require('@/assets/tianjiachepaihao@3.png')
        axios.request({
            url: Url.url.plate_list,
            method: "get"
        }).then(res => {
            console.log(res)
             let plateList = res.data
          that.carlist = plateList
        })
    },
    methods:{
        // inputFunc(e){
        //         console.log(e.target.value)
        //         this.value = e.target.value
        // },
    //     bnt(){
    //         let that = this
    //         console.log(that.value)
    //                  axios.request({
    //        url: Url.url.add_plate,
    //         method: "post",
    //     params: {
    //       vehMark: that.value,
    //        preId: that.groupId
    //     }
    //   }).then(res => {
    //       console.log(res)
    //   })
    //     },
    //调取车牌区域软键盘
  plateZh() {
    let btns = this.carPlete;
    console.log(btns)
      this.keyBtn = btns,
      this.keyWord = true,
      this.keyWords = false,
      console.log(this.keyWord)
  },
  //调取车牌号软键盘
  inMsg() {
    let btns = this.descWord;
    console.log(btns)
      this.keyBtns = btns,
      this.keyWords = true,
      this.keyWord = false
  },

  //键盘删除
  keyDel() {
    let zhData = this.zhData;
    zhData.pop();
      this.zhData = zhData
  },
  //键盘确定
  keyTrue() {

     this.keyWord = false
     this.keyWords = false

  },
  //输入
  inPleteNumber(e) {
    console.log(e);
    let zh = e;
    let zhData = this.zhData;
    let keword1 = this.carPlete;
    let keword2 = this.descWord;
    if (zhData.length == 0) {
        this.inpStyle = "border: 1px solid #f66913",
        this.keyBtn = keword2
    }
    //可输车牌号数量
    let CanNum = this.CanNum;
    if (zhData.length < CanNum) {
      zhData.push(zh);
        this.zhData = zhData
    }
  },
  //是否启用8位车牌
  changeNum() {
    if (this.CanNum == 7) {
        this.CanNum = 8
        this.img = require('@/assets/xunahzong.png')
        console.log(this.CanNum)
    } else {
        this.CanNum = 7
         this.img = require('@/assets/tianjiachepaihao@3.png')
         console.log(this.CanNum)
    }
  },
  //提交车牌
  addPlete() {
      console.log('11111111111')
    let self = this;
    let that = this
    let nums = this.zhData;
    let list = []
    console.log(self.carlist)
    nums = nums.toString().replace(/,/g, '');
    if (nums == "") {
      that.bus.$emit("tips", { show: true, title: "请输入正确的车牌号" });
      //return false;
    }

    self.carlist.map((res) => {
      console.log(res, 'ppppppppppppppppppppp' + self.data.zhData)
      if (res.vehMark == nums) {
        list.push(res.vehMark)
        console.log(list,"LLLLAAAAAAAAAAAAAAAAAAAAAAAAAA")
      }
    })
    if(list.length != 0){
      list.map((res) => {
        if (res == nums) {
          that.bus.$emit("tips", { show: true, title: "添加失败，车牌号已存在" });
          return
        }
      })
    }else{
    let xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    let creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (nums.length == 7 && creg.test(nums)) {
      axios.request({
           url: Url.url.add_plate,
            method: "post",
        params: {
          vehMark: nums,
           preId: self.data.preId
        }
      }).then(res => {
          console.log(res)
           that.statues = res.status,
           that.data = res.data.data
           that.bus.$emit("tips", { show: true, title: "添加成功" });
          console.log("成功")
          if(that.$route.query.num == 1){
            axios.request({
            url:Url.url.long_carLists,//查看长租用户车位列表
            method:"post",
            params: {
                    latitude: that.location.latitude,
                    longitude: that.location.longitude
                  },
          }).then(res => {
                console.log(res)
                if(res.data.num == 0){
                    setTimeout(() =>{
              that.$router.go(-2)
          })
                }else{
                  setTimeout(() =>{
              that.$router.go(-3)
          })
                }
          })
             
          }else{
            if(that.$route.query.num == 2){
                        setTimeout(() =>{
              that.$router.go(-1)
          })
            }else{
                      setTimeout(() =>{
              that.$router.go(-2)
          })
            }
         
          }
      })  
      } else if (nums.length == 8 && xreg.test(nums)) {
      axios.request({
        url: Url.url.add_plate,
        method:'post',
        params: {
          vehMark: nums
        },
      }).then(res => {
          console.log(res)
           if(that.$route.query.num == 1){
            axios.request({
            url:Url.url.long_carLists,//查看长租用户车位列表
            method:"post",
            params: {
                    latitude: that.location.latitude,
                    longitude: that.location.longitude
                  },
          }).then(res => {
                console.log(res)
                if(res.data.num == 0){
                    setTimeout(() =>{
              that.$router.go(-2)
          })
                }else{
                  setTimeout(() =>{
              that.$router.go(-3)
          })
                }
          })
             
          }else{
            if(that.$route.query.num == 2){
                        setTimeout(() =>{
              that.$router.go(-1)
          })
            }else{
                      setTimeout(() =>{
              that.$router.go(-2)
          })
            }
         
          }
      }) 
    } else {
      that.bus.$emit("tips", { show: true, title: "请输入正确的车牌号" });
    };
  }
}
}
}
</script>

<style lang='scss' scoped>
.add-plate {
 width: 100%;
 height: 100%;
}
.input{
    border: 1px solid white;
    background: white;
}
.div{
    width: 10px;
     display: inline-block;
     margin-left: 10px;
     color: #666;
}
.plate-txt {
  font-size: 32px;
  color: #666;
  box-sizing: border-box;
  padding: 40px 0 80px 30px;
}

.plate-inp {
  box-sizing: border-box;
  padding-left: 78px;
  position: relative;
  width: 100%;
  height: 70px;
}

.plate-zh {
  width: 70px;
  height: 68px;
  margin-left: 17px;
  float: left;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 68px;
  color: #666;
}

.inp-img {
  width: 70px;
  height: 68px;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
}

.inp-img2 {
  width: 70px;
  height: 68px;
  display: inline-block;
  position: absolute;
  left: 100px;
  top: 0;
}

.plate-circle {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 25px;
  margin: 0 0 0 31px;
}

.plate-num {
  font-size: 32px;
  color: #999;
  width: 363px;
  height: 64px;
  line-height: 64px;
  display: inline-block;
  margin-left: 70px;
  position: absolute;
  top: 0;
  border-bottom: 1px solid rgb(224, 224, 224);
}

.eight {
  margin-top: 25px;
}

.eight-num {
  float: right;
  margin: 0 77px 0 0;
  font-size: 26px;
  color: #666;
}

.eight-img {
  float: right;
  width: 21px;
  height: 21px;
  margin: 9px 9px 0 0;
  /* position: absolute;
  top: 282px;
  left: 471px; */
}

.add-btn {
  width: 594px;
  height: 80px;
  line-height: 80px;
  outline: none;
  border: 1px solid white;
  background: #f66913;
  border-radius: 60px;
  color: #fff;
  font-size: 38px;
  margin-top: 390px;
}
.add-btns{
    width: 100%;
    text-align: center;
}

.key-txt {
  width: 100%;
  height: 92px;
  line-height: 92px;
  color: #f66913;
  display: flex;
  justify-content: space-between;
}

.key-del {
  margin-left:30px;
}
.key-true{
    margin-right:30px;
}

.key-btn-container {
  width: 100%;
  height: 361px;
  background: #d3d4d9;
  padding-left: 6px;
}

.key-btn {
  width: 61px;
  height: 61px;
  background: #fff;
  border-radius: 12px;
  display: inline-block;
  text-align: center;
  margin: 20px 6px 0 6px;
  line-height: 61px;
  font-size: 23px;
  color: #666;
}

.keyword {
  position: fixed;
  bottom: 0;
}

</style>


