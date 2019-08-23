import Axios from 'axios'
//import baseURL from '_conf/url'
import Cookies from 'js-cookie'
//import { TOKEN_KEY } from '@/libs/util'

class httpRequest {
  constructor() {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy(url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors(instance, url) {
    let that = this
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      //config.headers['token'] = Cookies.get(TOKEN_KEY)
      // config.headers['X-Access-Auth-Token'] = 'b36d78cda79f40e49e56840409f924af'
      console.log('add token for heard')
      config.headers['X-Access-Auth-Token'] = Cookies.get('tokens')
      config.headers['os'] = 4
      // alert('token :' + Cookies.get('tokens'))
      // let contentType = (config.headers['Content-Type'])
      config.data = JSON.stringify(config.params)
      // if (contentType === 'undefined' || contentType === 'application/json; charset=utf-8') {
      //   config.data = JSON.stringify(config.params)
      // }
      // Spin.show()
      // 在发送请求之前做些什么
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let data = res.data
      console.log(data)
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }
      if (data.message == null) {

      } else {
        if (data.message.code == 9002000) {
          console.log('走了')
          var u = navigator.userAgent;
          // android终端
          var isAndroid = u.indexOf("wehome/1") > -1;
          var isiOS = u.indexOf("wehome/2") > -1;
          // ios终端
          if (isiOS) {
            window.finish_current_activity_webView("", "");
          } else if (isAndroid) {
            window.jsObject.finish_current_activity_webView("", "");
          }
        }
      }
      if (data.code !== 200) {
        // 后端服务在个别情况下回报201，待确认
        if (data.code === 401) {
          Cookies.remove(TOKEN_KEY)
          window.location.href = window.location.pathname + '#/login'
          Notice.error({
            title: '系统提示',
            desc: data.message
          })
        } else {
          if (data.message) {
            //Notice.error({title: '系统提示', desc: data.message})
            console.log(data)
          }
        }
        return data
      }
      return data
    }, (error) => {
      console.log(error)
      // Notice.error({title: '系统提示', desc: error})
      //Cookies.remove(TOKEN_KEY)
      //window.location.href = window.location.pathname + '#/login'
      return Promise.reject(error)
    })
  }
  // 创建实例
  create() {
    let conf = {
      baseURL: '/',
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    console.log('create error')
    return Axios.create(conf)
  }
  // 请求实例
  request(options) {
    console.log('request')
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
