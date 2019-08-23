// 访问域名： https: //api.linkmoreparking.cn 线下地址
//          https: //api.linkmoreparking.com 线上地址
let Url = {
  // 授权认证接口 第三方token换取凌猫access_token
  login: '/api/account/open/auth/token',

  //临停车位

  // 车区列表接口 此处车区列表融合了车区分组的部分， 跟现有系统比去掉了车区详情接口
  car_list: '/api/prefecture/app/prefectures/v2.0/open-list',
  // 车牌列表接口 此处车牌由第三方token中获取， 并初始化到凌猫系统中
  plate_list: '/api/account/app/plate-numbers/v2.0/list',
  //当前车牌是否可预约，若不可约流程结束 参数为车牌列表id
  check_plate: '/api/prefecture/app/prefectures/v2.0/check-plate',
  //车区车位分布图   参数为车区分组id
  car_lists: '/api/prefecture/app/prefectures/v2.0/group_strategy',
  //预约下单接口
  Create_Submit: '/api/order/app/order/v2.1/create',
  //当前订单
  current: '/api/order/app/order/v2.0/current',
  //取消订单接口
  cancel: '/api/order/app/order/v2.0/cancel',
  // 用户操作降锁
  control_down: '/api/order/app/order/v2.0/control-down',
  //用户操作升锁
  control_up: '/api/order/app/order/v2.0/control-up',
  //订单回调
  verify: '/api/order/app/pay/v2.0/verify',
  //切换车位
  switchTab: "/api/order/app/order/v2.1/switch",
  //降锁异常原因
  CarError: '/api/common/app/dicts/v2.0/cause/switch',
  //添加车牌号
  add_plate:'/api/account/app/plate-numbers/v2.0/save',
  //删除车牌
  del_plate:'/api/account/app/plate-numbers/v2.0/delete',
  //授权人授权记录列表
  user_impower:"/api/enterprise/app/auth-record/v2.0/list",
  //查询用户可授权的车位
  sure: "/api/enterprise/app/user-rent-stall/v2.0/auth-stall",
   //亲属关系
  friends: "/api/common/app/dicts/v2.0/relation/code",
   //查询用户详情
   choose_user: "/api/account/app/users/v2.0/detail",
    //新增授权接口
    newImpower: "/api/enterprise/app/auth-record/v2.0/save",
    //修改授权接口
    update: "/api/enterprise/app/auth-record/v2.0/update",
    //取消授权接口
    cancels: "/api/enterprise/app/auth-record/v2.0/cancel",
    //首页是否显示授权
    show_impower: "/api/enterprise/app/user-rent-stall/v2.0/auth-flag",
    //生成账单
    checkout: "/api/order/app/pay/v2.0/checkout",
    //确认支付
  confirm: "/api/order/app/pay/v2.0/confirm",
    //出租人出租记录列表
  rent_list:"/api/enterprise/app/rent-record/v2.0/list",

  //固定车位

  //用户是否有长租车位权限-- 暂时可不用
  choose_carModule: '/api/enterprise/app/user-rent-stall/v2.0/owner',
  //获取长租车位列表
  long_carList: '/api/enterprise/app/user-rent-stall/v2.0/list',
  // 长租车位列表
  long_carLists: '/api/enterprise/app/user-rent-stall/v2.0.1/list',
  //长租用户操作车位锁
  long_control: '/api/enterprise/app/user-rent-stall/v2.0/control',
  //查询当前是否有使用长租车位
  long_current: '/api/enterprise/app/user-rent-stall/v2.0/current',
  //故障车位上报 
  long_Feedback: '/api/account/app/fault-stall/feedback/v2.0/save',
  //故障车位失败原因列表 
  long_Feedbacks: '/api/common/app/dicts/v2.0/cause/fault',
   //停车记录
  record: "/api/enterprise/app/user-rent-stall/v2.0/parking-record",
   //导航  车区入口管理
  entrance:'/api/prefecture/app/prefectures/v2.0/entrance-list'
}

function Time(time) {
  let now = new Date(time);
  var year = now.getFullYear(); //年
  var month = now.getMonth(); //月
  var date = now.getDate(); //日
  var hour = now.getHours(); //时
  var minu = now.getMinutes(); //分
  // var sec = now.getSeconds(); //秒
  return year + '/' + month + '/' + date + ' ' + hour + ':' + minu
}
Time()
module.exports = {
  url: Url,
  Time: Time
}
