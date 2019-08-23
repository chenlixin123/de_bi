<template>
    <div class="box">
        <div class="top" v-for="(item,index) in data" :key="index" @click="taps(index)">
            <div class="title">{{item.entranceType}}</div>
            <div class="center">
                <div class="texts" v-for="(items,indexs) in item.entranceDetail" :key="indexs">
                    <div :class="ind == indexs && outind == index ? 'text1' : 'text'" @click="tap(items,indexs)">{{items}}</div>
                </div>
            </div>
        </div>
        <div class="btn" @click="btn">确认</div>
    </div>
</template>

<script>
import axios from "@/libs/api.request";
import Url from "@/libs/url";
import Cookies from "js-cookie";
export default {
    data(){
        return{
            data:[],
            outind:-1,
            ind:-1,
            name:'',
            stallId:'',
            skip:1,
            stallName:''
        }
    },
    created(){
        let that = this
       that.skip = localStorage.getItem('skip')
       console.log(localStorage.getItem('skip'))
        if(that.skip == 2){
            console.log('555555555555')
            that.$router.go(-1)
           localStorage.setItem('skip',1)
        }
        that.stallName = that.$route.query.stallName
        that.stallId = that.$route.query.stallId
        console.log(that.stallName)
        axios.request({
            url:Url.url.entrance,
            method:'get',
            params:{
                preId:that.$route.query.preId
            }
        }).then(res => {
            console.log(res)
            that.data = res.data
        })
    },
    methods:{
        taps(index){
            let that = this
            that.outind = index
            console.log(index)
        },
        tap(item,indexs){
            let that = this
            that.ind = indexs
            that.name = item
            console.log(item,indexs)
        },
        btn(){
            let that = this
            console.log('确认')
             localStorage.setItem('skip',2)
            if(that.ind == -1){
                 that.bus.$emit("tips", { show: true, title: "请选择起点" });
                 localStorage.setItem('skip',1)
            }else{
                if(that.name == '出口'){
                    console.log('111111111')
                     window.location.href = 'https://map.linkmoretech.cn/#/ParkingCell?plateNo=H'+'&id=68'+'&start=' + that.stallName + '&end=' + that.name
                }else{
                    console.log('22222222222222222')
                     window.location.href = 'https://map.linkmoretech.cn/#/ParkingCell?plateNo=H'+'&id=68'+'&start=' + that.name + '&end=' + that.stallName
                }
              
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.box{
    width: 100%;
    height: 100%;
    background: #f5f4f4;
    box-sizing: border-box;
    padding-top: 20px;
}
.top{
    width: 100%;
    box-sizing: border-box;
    padding-top: 38px;
    background: white;
    margin-bottom: 20px;
}
.title{
    width: 100%;
    font-size: 30px;
    color: #333;
    box-sizing: border-box;
    padding: 0 38px;
    margin-bottom: 38px;
}
.center{
    width: 100%;
    display: flex;
     flex-wrap: wrap;
     box-sizing: border-box;
     padding-left: 3%;
}
.texts{
    width: 24%;
    margin-bottom: 36px;
    // border: 1px solid;
}
.text{
    width: 142px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #c6c5c5;
    color: #666;
    font-size: 26px;
    margin: 0 auto;
}
.text1{
    width: 142px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid white;
    color: white;
    font-size: 26px;
    margin: 0 auto;
    background: #f66913;
}
.btn{
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 40px;
    background: #f66913;
    color: white;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
}
</style>


