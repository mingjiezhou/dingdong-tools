module.exports = {
  // headers 和 form 里的字段需要抓包替换成自己的
  // 运力接口配置

  // 1、叮咚
  capacityConfig: {
    method: 'POST',
    url: 'https://maicai.api.ddxq.mobi/order/getMultiReserveTime',
    headers: {
      Host: 'maicai.api.ddxq.mobi',
      Referer: 'https://servicewechat.com/wx1e113254eda17715/422/page-frame.html',
      Cookie: 'DDXQSESSID=911e13e5f3e937e749fc67ae37953fa9',
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x18000022) NetType/4G Language/zh_CN',
      'ddmc-city-number': '0101',
      'ddmc-api-version': '9.49.2',
      'ddmc-build-version': '2.82.0',
      'ddmc-longitude': '121.351886',
      'Content-Length': '2171',
      'ddmc-latitude': '31.180198',
      'ddmc-app-client-id': '4',
      Connection: 'keep-alive',
      'ddmc-uid': '6024eab82507db0001df2c65',
      'Accept-Language': 'zh-cn',
      'ddmc-channel': 'applet',
      'ddmc-device-id': 'osP8I0ZBjDUhEunUe7N9uzd8eadE',
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'ddmc-station-id': '5b988449c0a1ea8f1c8b5a6b',
      'ddmc-ip': '',
      // 'Accept-Encoding': 'gzip, deflate, br',
      'ddmc-os-version': '[object Undefined]',
    },
    form: {
      uid: '6024eab82507db0001df2c659',
      longitude: '121.351886',
      latitude: '31.180198',
      station_id: '5b988449c0a1ea8f1c8b5a6b',
      city_number: '0101',
      api_version: '9.49.2',
      app_version: '2.82.0',
      applet_source: '',
      channel: 'applet',
      app_client_id: '4',
      sharer_uid: '',
      s_id: '911e13e5f3e937e749fc67ae37953fa7',
      openid: 'osP8I0ZBjDUhEunUe7N9uzd8eadE',
      h5_source: '',
      device_token:
        'WHJMrwNw1k/F0qdLNvE01AWvIS0Q4A1YmwEF3N97L0MBl7ZD7oG3qEHftCYyGQXNFfIq3aU6/bpqSdJMkEPAvxVgF3SyAj1lqdCW1tldyDzmauSxIJm5Txg==1487582755342',
      address_id: '6236f950a4d2230001d21140',
      group_config_id: '',
      products:
        '[[{"type":1,"id":"5e8eebcd7cdbf013083016dd","price":"9.50","count":1,"description":"","sizes":[],"cart_id":"5e8eebcd7cdbf013083016dd","parent_id":"","parent_batch_type":-1,"category_path":"58f9d213936edfe4568b569a,58fbf4bf936edfe3568b5990","manage_category_path":"13,1184,1190","activity_id":"","sku_activity_id":"","conditions_num":"","product_name":"崇明西葫芦 350g/份","product_type":0,"small_image":"https://img.ddimg.mobi/product/66de071d1afb51587521029608.jpg!deliver.product.list","total_price":"9.50","origin_price":"9.50","total_origin_price":"9.50","no_supplementary_price":"9.50","no_supplementary_total_price":"9.50","size_price":"0.00","buy_limit":0,"price_type":0,"promotion_num":0,"instant_rebate_money":"0.00","is_invoice":1,"sub_list":[],"is_booking":0,"is_bulk":0,"view_total_weight":"份","net_weight":"350","net_weight_unit":"g","storage_value_id":0,"temperature_layer":"","sale_batches":{"batch_type":-1},"is_shared_station_product":0,"is_gift":0,"supplementary_list":[],"order_sort":1,"is_presale":0}]]',
      isBridge: 'false',
      nars: 'bb39647e9e7c2bc7cdcf316509b52ee9',
      sesi: '58hAkPT906e2610380d1c05204a94865bf4770e',
    },
  },

  // 购物车配置
  cardConfig: {
    method: 'GET',
    url: 'https://maicai.api.ddxq.mobi/cart/index?*******',
    headers: {
      // 参数 替换成自己抓包的
    },
  },

  // 2、美团
  meituanNotice: {
    // url 根据抓包替换成自己所在的站点
    // 118 代表你所在的 站点编号，需要通过抓包 获取你所在的站点编号 去替换，注意118 &poi=118&stockPois=118 三处需要替换
    method: 'GET',
    url: 'https://mall.meituan.com/api/c/poi/118/notice?uuid=1805465c9dcc8-93f09a12558fe0-0-5a900-1805465c9dc54&xuuid=1805465c9dcc8-93f09a12558fe0-0-5a900-1805465c9dc54&__reqTraceID=c88c301d-8a04-6c76-358b-c2471ce5f824&platform=ios&utm_medium=wxapp&brand=xiaoxiangmaicai&tenantId=1&utm_term=5.33.1&msgOpSource=2&poi=118&stockPois=118&ci=1&bizId=2&openId=oV_5G4wXrnpDWzzPA2OpxkkVlZrY&address_id=1950000008&sysName=iOS&sysVerion=15.4&app_tag=union&uci=1&userid=126711747',
    headers: {},
  },

  meituanCapacity: {}
}
