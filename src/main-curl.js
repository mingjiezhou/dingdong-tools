var request = require('request')
var http = require('http')
var fs = require('fs')
var child_process = require('child_process')
var curl =
  "curl 'https://maicai.api.ddxq.mobi/order/getMultiReserveTime'  -H 'Host: maicai.api.ddxq.mobi'  -H 'Referer: https://servicewechat.com/wx1e113254eda17715/422/page-frame.html'  -H 'Cookie: DDXQSESSID=911e13e5f3e937e749fc67ae37953fa7'  -H 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x18000022) NetType/4G Language/zh_CN'  -H 'ddmc-city-number: 0101'  -H 'ddmc-api-version: 9.49.2'  -H 'ddmc-build-version: 2.82.0'  -H 'ddmc-longitude: 121.351886'  -H 'Content-Length: 2171'  -H 'ddmc-latitude: 31.180198'  -H 'ddmc-app-client-id: 4'  -H 'Connection: keep-alive'  -H 'ddmc-uid: 6024eab82507db0001df2c65'  -H 'Accept-Language: zh-cn'  -H 'ddmc-channel: applet'  -H 'ddmc-device-id: osP8I0ZBjDUhEunUe7N9uzd8eadE'  -H 'Accept: */*'  -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8;'  -H 'ddmc-station-id: 5b988449c0a1ea8f1c8b5a6b'  -H 'ddmc-ip: '  -H  -H 'ddmc-os-version: [object Undefined]'   --data 'uid=6024eab82507db0001df2c65&longitude=121.351886&latitude=31.180198&station_id=5b988449c0a1ea8f1c8b5a6b&city_number=0101&api_version=9.49.2&app_version=2.82.0&applet_source=&channel=applet&app_client_id=4&sharer_uid=&s_id=911e13e5f3e937e749fc67ae37953fa7&openid=osP8I0ZBjDUhEunUe7N9uzd8eadE&h5_source=&device_token=WHJMrwNw1k%2FF0qdLNvE01AWvIS0Q4A1YmwEF3N97L0MBl7ZD7oG3qEHftCYyGQXNFfIq3aU6%2FbpqSdJMkEPAvxVgF3SyAj1lqdCW1tldyDzmauSxIJm5Txg%3D%3D1487582755342&address_id=6236f950a4d2230001d21140&group_config_id=&products=%5B%5B%7B%22type%22%3A1%2C%22id%22%3A%225e8eebcd7cdbf013083016dd%22%2C%22price%22%3A%229.50%22%2C%22count%22%3A1%2C%22description%22%3A%22%22%2C%22sizes%22%3A%5B%5D%2C%22cart_id%22%3A%225e8eebcd7cdbf013083016dd%22%2C%22parent_id%22%3A%22%22%2C%22parent_batch_type%22%3A-1%2C%22category_path%22%3A%2258f9d213936edfe4568b569a%2C58fbf4bf936edfe3568b5990%22%2C%22manage_category_path%22%3A%2213%2C1184%2C1190%22%2C%22activity_id%22%3A%22%22%2C%22sku_activity_id%22%3A%22%22%2C%22conditions_num%22%3A%22%22%2C%22product_name%22%3A%22%E5%B4%87%E6%98%8E%E8%A5%BF%E8%91%AB%E8%8A%A6%20350g%2F%E4%BB%BD%22%2C%22product_type%22%3A0%2C%22small_image%22%3A%22https%3A%2F%2Fimg.ddimg.mobi%2Fproduct%2F66de071d1afb51587521029608.jpg!deliver.product.list%22%2C%22total_price%22%3A%229.50%22%2C%22origin_price%22%3A%229.50%22%2C%22total_origin_price%22%3A%229.50%22%2C%22no_supplementary_price%22%3A%229.50%22%2C%22no_supplementary_total_price%22%3A%229.50%22%2C%22size_price%22%3A%220.00%22%2C%22buy_limit%22%3A0%2C%22price_type%22%3A0%2C%22promotion_num%22%3A0%2C%22instant_rebate_money%22%3A%220.00%22%2C%22is_invoice%22%3A1%2C%22sub_list%22%3A%5B%5D%2C%22is_booking%22%3A0%2C%22is_bulk%22%3A0%2C%22view_total_weight%22%3A%22%E4%BB%BD%22%2C%22net_weight%22%3A%22350%22%2C%22net_weight_unit%22%3A%22g%22%2C%22storage_value_id%22%3A0%2C%22temperature_layer%22%3A%22%22%2C%22sale_batches%22%3A%7B%22batch_type%22%3A-1%7D%2C%22is_shared_station_product%22%3A0%2C%22is_gift%22%3A0%2C%22supplementary_list%22%3A%5B%5D%2C%22order_sort%22%3A1%2C%22is_presale%22%3A0%7D%5D%5D&isBridge=false&nars=bb39647e9e7c2bc7cdcf316509b52ee9&sesi=58hAkPT906e2610380d1c05204a94865bf4770e'"

function check(i, times) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      child_process.exec(curl, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
        if (error !== null) {
          console.log('exec error: ' + error)
        }

        // var response = JSON.parse(stdout)
        resolve()
      })
    }, times)
  })
}
async function loop() {
  for (let i = 1; i < 356; i++) {
    await check(i, 1000)
  }
}
loop()
