let request = require('request')
let child_process = require('child_process')

// 注意 建议使用 postman 将 抓包拿到 的curl 信息转化为 node request 形式
let options = {
  method: 'POST',
  url: 'https://maicai.api.ddxq.mobi/order/getMultiReserveTime',
  headers: {
    // 参数根据自己手机抓包里的适配（如下为示例）
    // Host: 'maicai.api.ddxq.mobi',
    // Referer: 'https://servicewechat.com/****/422/page-frame.html',
    // Cookie: '***************************',
    // 'User-Agent':
    //   'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x18000022) NetType/4G Language/zh_CN',
    // 'ddmc-city-number': '****',
    // 'ddmc-api-version': '****',
    // 'ddmc-build-version': '****',
    // 'ddmc-longitude': '****',
    // 'Content-Length': '****',
    // 'ddmc-latitude': '****',
    // 'ddmc-app-client-id': '****',
    // Connection: 'keep-alive',
    // 'ddmc-uid': '****',
    // 'Accept-Language': 'zh-cn',
    // 'ddmc-channel': 'applet',
    // 'ddmc-device-id': '****',
    // Accept: '*/*',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'ddmc-station-id': '****',
    // 'ddmc-ip': '',
    // 'Accept-Encoding': 'gzip, deflate, br',
    // 'ddmc-os-version': '[object Undefined]',
  },
  form: {
    // 参数根据自己手机抓包里的适配（如下为示例）
    // uid: '*************************',
    // longitude: '***********',
    // latitude: '***********',
    // station_id: '***********************',
    // city_number: '****',
    // api_version: '9.****.2',
    // app_version: '2.****.0',
    // applet_source: '',
    // channel: 'applet',
    // app_client_id: '4',
    // sharer_uid: '',
    // s_id: '****',
    // openid: '****',
    // h5_source: '',
    // device_token: 'WHJMrwNw1k/****/bpqSdJMkEPAvxVgF3SyAj1lqdCW1tldyDzmauSxIJm5Txg==1487582755342',
    // address_id: '****',
    // group_config_id: '',
    // products:
    //   '[[{"type":1,"id":"5e8eebcd7cdbf013083016dd","price":"9.50","count":1,"description":"","sizes":[],"cart_id":"5e8eebcd7cdbf013083016dd","parent_id":"","parent_batch_type":-1,"category_path":"58f9d213936edfe4568b569a,58fbf4bf936edfe3568b5990","manage_category_path":"13,1184,1190","activity_id":"","sku_activity_id":"","conditions_num":"","product_name":"崇明西葫芦 350g/份","product_type":0,"small_image":"https://img.ddimg.mobi/product/66de071d1afb51587521029608.jpg!deliver.product.list","total_price":"9.50","origin_price":"9.50","total_origin_price":"9.50","no_supplementary_price":"9.50","no_supplementary_total_price":"9.50","size_price":"0.00","buy_limit":0,"price_type":0,"promotion_num":0,"instant_rebate_money":"0.00","is_invoice":1,"sub_list":[],"is_booking":0,"is_bulk":0,"view_total_weight":"份","net_weight":"350","net_weight_unit":"g","storage_value_id":0,"temperature_layer":"","sale_batches":{"batch_type":-1},"is_shared_station_product":0,"is_gift":0,"supplementary_list":[],"order_sort":1,"is_presale":0}]]',
    // isBridge: 'false',
    // nars: '****',
    // sesi: '****',
  },
}

//BarkId 需要安装bark 后在自己app 里获取
let curl = "curl 'https://api.day.app/${BarkId}/叮咚买菜有可用配送时段请尽快下单?sound=minuet'"

function checkMultiReserveTime(times) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      request(options, function (error, response) {
        if (error) {
          console.log(error)
          reject()
        }

        let res = JSON.parse(response.body)

        if (!res.success) return console.log(res)

        if (!(res.data && res.data[0] && res.data[0].time[0] && res.data[0].time[0].times)) {
          return console.log(res)
        }

        let times = res.data[0].time[0].times

        if (
          times.some(i => {
            return i.fullFlag == false
          })
        ) {
          console.log('🎉 恭喜 发现可用的配送时段 请尽快下单!')
          child_process.exec(curl)
        } else {
          console.log('当前无可用配送时段 15秒后再试...')
        }

        resolve()
      })
    }, times)
  })
}

async function loop() {
  while (true) {
    await checkMultiReserveTime(15 * 1000)
  }
}

console.log('正在检查是否有可用配送时段...')
loop()
