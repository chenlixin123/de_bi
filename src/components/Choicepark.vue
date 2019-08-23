<template>
<div class="page">
 <div class='container'>
   <div>
      <div class='column' v-for="(itemName,outindex) in PositionList"  :key='outindex' @click="menuClick1(itemName,outindex)">
         <div class='titel'>{{itemName.preName}}</div>
         <div class='number'>
            <div v-for="(item,index) in itemName.rentUserStalls"  :key='index'>
               <div v-if="item.stallStatus == 1" :class="nav==index&&outnav==outindex? 'cur':'num'"  @click='menuClick(item,index)' >{{item.stallName}}<img v-if='item.userStatus == 0' class='img' src='@/assets/impower.png'></div>
               <div v-else  :class="nav==index&&outnav==outindex?' cur ':'nums'" @click='menuClicks(item,index)'>{{item.stallName}}<img v-if='item.userStatus == 0' class='imgs' src='@/assets/impower.png'></div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="btn" @click='submit'>确认车位</div>
<div class='box' v-if='show == true'>
  <div class='body'>
    <div class='top'>该车位正被他人使用，请使用其他车位</div>
    <div class='bottom' @click='shows'>确定</div>
  </div>
</div>

</div>
</template>

<script>
import axios from "@/libs/api.request";
import Url from "@/libs/url";
import Cookies from "js-cookie";
export default {
  name: "Choice",
  data() {
    return {
      nav: -1,
    nav: "-1", //内层index
    val: "",
    outnav: "-1", //外层index
    PositionList: "",
    num:'',
    gatewayStatus:'',
    //本地经纬度
    location: {
      longitude: "116.41361",
      latitude: "39.91106"
    },
    battery:'',
    show:false,
    longitude:"",
    latitude:"",
    rentMoType:"",
    rentOmType:"",
    switchFlag:"",
    data:'',
    id:''
    };
  },
  created() {
    let that = this;
    let name = encodeURI("localhost:8080/#/Choice?token=65897b879c4a491ea35d42752959bb65&latitude=39.91106&longitude=116.41361")
    //如果 URI 组件中含有分隔符，比如 ? 和 #，则应当使用 encodeURIComponent() 方法分别对各组件进行编码
    let url = encodeURIComponent('localhost:8080/#/Choice?token=65897b879c4a491ea35d42752959bb65&latitude=39.91106&longitude=116.41361')
    console.log(url,name)
    that.bus.$emit("loading", true);
    that.bus.$emit("tip", { title: "加载中请稍候..." });
    that.token = that.$route.query.token;
    if (that.token == undefined) {
      that.token = localStorage.getItem("token");
      console.log(that.token);
    } else {
      that.token = that.$route.query.token;
      console.log(that.token);
    }
    Cookies.set("tokens", that.token);
    localStorage.setItem("token", that.token);
    console.log(that.$route.query, "-------------------------------=================------------------------------")

      that.longitude = that.$route.query.longitude,
      that.latitude = that.$route.query.latitude,
      that.switchFlag = that.$route.query.switchFlag,
      that.id = that.$route.query.id

    console.log(that.data)
    
    if (that.switchFlag == 1){
        console.log(that.$route.query, "-------------------------------=================------------------------------")
        that.datas =  JSON.parse(that.$route.query.data)
     axios.request({
        url:Url.url.long_carLists,
        method:"post",
         params: {
          latitude: that.$route.query.latitude,
          longitude: that.$route.query.longitude,
          switchFlag: 1
        },
      }).then(res => {
        console.log(res)
        console.log(res.data.num,res.message)
        if(res.status == true){
          that.bus.$emit("loading", false);
             that.PositionList = res.data.rentUsers,
            that.num = res.data.num
        }else{
          that.bus.$emit("loading", false);
           that.bus.$emit("tips", { show: true, title:res.message.content });
        } 
      })
    }else{
       axios.request({
        url:Url.url.long_carLists,
        method:"post",
         params: {
          latitude: that.$route.query.latitude,
          longitude: that.$route.query.longitude,
        },
      }).then(res => {
        console.log(res)
        console.log(res.data.num,res.message)
        if(res.status == true){
          that.bus.$emit("loading", false);
             that.PositionList = res.data.rentUsers,
            that.num = res.data.num
        }else{
          that.bus.$emit("loading", false);
           that.bus.$emit("tips", { show: true, title:res.message.content });
        }
           
      })
    }
  },
  methods: {
    // 外围点击
    menuClick1(e,index){
      let that = this
        that.outnav = index
        that.data1 = e
    },
    //空闲点击
  menuClick(e,index) {
    let that = this;
    let data = e
      that.data = data,
      that.nav = index
  },
  //占用点击
  menuClicks(e,index){
    let that = this;
    console.log(e,index)
        that.id = e.stallId
    console.log(that.datas.rentOmType, that.datas.isAuthUser, that.datas.stallId, that.id)
    if (that.datas.rentOmType == 1 || that.datas.isAuthUser == 1 || that.datas.stallId == that.id){
        that.data = e,
        that.nav = index,
      console.log(that.data)
    }else{
        that.show = true
    }
  },
    shows(){
    let that = this
      that.show = false
  },
  //确认车位
  submit(e) {
     let that = this
    
    if (that.data != '') {
      let datas = JSON.stringify(that.data)
      let datas1 = JSON.stringify(that.data1)
      that.$router.push({
        path:'/park?data=' + datas + '&data1=' + datas1
      })
    }
    else {
      that.bus.$emit("tips", { show: true, title: '请选择车位' });
    }
  }
  }
};
</script>

<style scoped lang='scss'>
.page {
  width: 100%;
  height: 100%;
   background: #f5f4f4;
   box-sizing: border-box;
   padding: 0;
   margin: 0;
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

.container {
   width: 100%;
   background: white;
   box-sizing: border-box;
    padding: 0;
   margin: 0;
}

.column:last-child {
   margin-bottom: 40px;
   border: none;
   border-top: 20px solid #f5f4f4;
}

.column {
   width: 100%;
   border-top: 20px solid #f5f4f4;
   background: white;
}

.titel {
   width: 100%;
   height: 108px;
   line-height: 108px;
   font-size: 32px;
   color: #333333;
   box-sizing: border-box;
   padding-left: 43px;
}

.number {
   display: flex;
   flex-wrap: wrap;
   width:100%;
   margin:auto;
}

.num {
   width: 170px;
   height: 68px;
   border: 1px solid#c6c5c5;
   font-size: 32px;
   border-radius: 10px;
   color: #666666;
   background: #ffffff;
   line-height: 68px;
   text-align: center;
   margin-bottom: 35px;
   margin-left:38px;
   margin-right: 35px;
   position: relative;
}
.img{
   width: 60px;
  height: 50px;
  position: absolute;
  top: -1px;
  right: -1px;
}
.nums {
   width: 170px;
   height: 68px;
   border: 1px solid #ffb489;
   font-size: 32px;
   border-radius: 10px;
   color: #fff;
   background: #ffb489;
   line-height: 68px;
   text-align: center;
   margin-bottom: 35px;
   margin-left:38px;
   margin-right: 35px;
   position: relative;
}
.imgs{
  width: 60px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
}

.nums:nth-child(even) {
   margin-left: 150px;
   float: left;
}

.list-menu.cur {
   background-color: #f66913 !important;
   color: #fff !important;
   border: 1px solid #fff !important;
}

.cur {
   width: 170px;
   height: 68px;
   border:1px solid white;
   font-size: 32px;
   border-radius: 10px;
   color: #fff;
   background: #f66913;
   line-height: 68px;
   text-align: center;
   margin-bottom: 35px;
   margin-left:38px;
   margin-right: 35px;
   position: relative;
}
.curs {
   width: 170px;
   height: 68px;
   background-color: #f66913 !important;
   color: #fff !important;
}
.box{
  position: fixed;
  top:0;
  left:0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.body{
  position: fixed;
  top:35%;
  left:70px;
  width: 610px;
  background: white;
  border-radius: 20px;
}
.top{
  width: 100%;
  font-size: 34px;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #dedede;
  color: #333333;
  box-sizing: border-box;
  padding: 15px 40px;
}
.bottom{
  width: 100%;
  height: 110px;
  font-size: 32px;
  color: #666666;
  text-align: center;
  line-height: 110px;
}

</style>
