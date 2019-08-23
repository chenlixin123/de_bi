import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Parking from '@/components/Parking'
import Order from '@/components/Order'
import Pay from '@/components/paySuccess'
import Lock from '@/components/Lockup'
import Choice from '@/components/Choicepark'
import Park from '@/components/mypark'
import CarError from '@/components/carError'
import Addcarmodule from '@/components/addcarmodule'
import CarModuleList from '@/components/CarModuleList'
import NoEmpower from '@/components/NoEmpower'
import confirm from '@/components/confirm'
import pastdue from '@/components/pastdue'
import addImpower from '@/components/addImpower'
import carImpower from '@/components/carImpower'
import succeedImpower from '@/components/succeedImpower'
import Impowers from '@/components/Impowers'
import malfunction from '@/components/malfunction'
import record from '@/components/record'
import particulars from '@/components/particulars'
import entrance from '@/components/entrance'
import nocarmodule from '@/components/nocarmodule'
import paySuccess from '@/components/paySuccess'
import longrentfail from '@/components/longrentfail'
import Release from '@/components/Release'
import fails from '@/components/fails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //预约车位页面
      name: 'List',
      component: List,
      meta: {
        title: '车区列表'
      }
    },
    {
      path: '/Parking', //预约车位页面
      name: 'Parking',
      component: Parking,
      meta: {
        title: '预约车位'
      }
    },
    {
      path: '/CarModuleList', //车牌号管理页面
      name: 'CarModuleList',
      component: CarModuleList,
      meta: {
        title: '车牌号管理'
      }
    },
    {
      path: '/Park', //我的车位详情页
      name: 'Park',
      component: Park,
      meta: {
        title: '我的车位'
      }
    },
    {
      path: '/Choice', //长租选择车位页面
      name: 'Choice',
      component: Choice,
      meta: {
        title: '选择车位'
      }
    },
    {
      path: '/Lock', //出场凭证页面
      name: 'Lock',
      component: Lock,
      meta: {
        title: '出场凭证'
      }
    },
    {
      path: '/Pay', //支付成功页面
      name: 'Pay',
      component: Pay
    },
    {
      path: '/Order', //当前订单页面
      name: 'Order',
      component: Order,
      meta: {
        title: '当前订单'
      }
    },
    {
      path: '/CarError',
      name: 'CarError',
      component: CarError,
      meta: {
        title: '车位异常'
      }
    },
    {
      path: '/Addcarmodule',
      name: 'Addcarmodule',
      component: Addcarmodule,
      meta: {
        title: '添加车牌号'
      }
    },
    {
      path: '/NoEmpower', //车位授权页面
      name: 'NoEmpower',
      component: NoEmpower,
      meta: {
        title: '车位授权和出租'
      }
    },
    {
      path: '/confirm', //确认授权页
      name: 'confirm',
      component: confirm,
      meta: {
        title: '确认授权'
      }
    },
    {
      path: '/pastdue', //授权信息页
      name: 'pastdue',
      component: pastdue,
      meta: {
        title: '授权信息'
      }
    },
    {
      path: '/addImpower', //授权选择车位页
      name: 'addImpower',
      component: addImpower,
      meta: {
        title: '选择车位'
      }
    },
    {
      path: '/carImpower', //确认车位页
      name: 'carImpower',
      component: carImpower,
      meta: {
        title: '确认车位'
      }
    },
    {
      path: '/succeedImpower', //授权成功页面
      name: 'succeedImpower',
      component: succeedImpower,
      meta: {
        title: '授权成功'
      }
    },
    {
      path: '/Impowers', //预约车位页面
      name: 'Impowers',
      component: Impowers,
      meta: {
        title: '授权信息'
      }
    },
    {
      path: '/malfunction', //车位故障页面
      name: 'malfunction',
      component: malfunction,
      meta: {
        title: '车位故障'
      }
    },
    {
      path: '/record', //使用记录页面
      name: 'record',
      component: record,
      meta: {
        title: '使用记录'
      }
    },
    {
      path: '/particulars', //使用记录详情页面
      name: 'particulars',
      component: particulars,
      meta: {
        title: '详情页'
      }
    },
    {
      path: '/entrance', //车位导航入口页面
      name: 'entrance',
      component: entrance,
      meta: {
        title: '选择入口'
      }
    },
    {
      path: '/nocarmodule', //没有长租车位页面
      name: 'nocarmodule',
      component: nocarmodule,
      meta: {
        title: '我的车位'
      }
    },
    {
      path:'/goback',
      redirect: '/NoEmpower',
      component: NoEmpower,
      meta: {
        title: '车位授权和出租'
      }
    },
    {
      path: '/paySuccess', //确认订单页面
      name: 'paySuccess',
      component: paySuccess,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/longrentfail', //预约车位页面
      name: 'longrentfail',
      component: longrentfail,
      meta: {
        title: '失效授权'
      }
    },
    {
      path: '/Release', //预约车位页面
      name: 'Release',
      component: Release,
      meta: {
        title: '车位出租'
      }
    },
    {
      path: '/fails', //预约车位页面
      name: 'fails',
      component: fails,
      meta: {
        title: '失效出租'
      }
    },
  ]
})
