var request = require('request')
var child_process = require('child_process')

var options = {
  method: 'POST',
  url: 'https://maicai.api.ddxq.mobi/order/getMultiReserveTime',
  headers: {
  },
  form: {
  },
}

let curl =
  "curl 'https://api.day.app/${BarkId}/叮咚买菜有可用配送时段请尽快下单?sound=minuet'"

function checkMultiReserveTime(times) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      request(options, function (error, response) {
        if (error) throw new Error(error)
        let res = JSON.parse(response.body).data[0].time[0].times
        if (
          res.some(i => {
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
