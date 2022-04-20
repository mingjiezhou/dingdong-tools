let request = require('request')
let child_process = require('child_process')
let config = require('./config.js')

// barkId 替换成自己的
// 中文有可能乱码
let curl = "curl https://api.day.app/{barkId}/叮咚买菜有可用配送时段请尽快下单?sound=minuet"

function checkMultiReserveTime(times) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      request(config['capacityConfig'], function (error, response) {
        if (error) {
          console.log('error:')
          console.log(error)
          reject()
        }

        let res = JSON.parse(response.body)

        if (!res.success) {
          if (res.code == '405') {
            console.log(res)
            console.log('请求失败， 10秒后将再次尝试')
            return resolve()
          }
        }

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
          console.log('当前无可用配送时段 10秒后再试...')
        }

        resolve()
      })
    }, times)
  })
}

async function loop() {
  while (true) {
    await checkMultiReserveTime(10 * 1000)
  }
}

console.log('正在检查是否有可用配送时段...')
loop()
