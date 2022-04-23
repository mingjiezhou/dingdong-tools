let request = require('request')
let child_process = require('child_process')
let config = require('./config.js')

// barkId 替换成自己的
// 中文有可能乱码
let barkId = '******'
let curl = `curl https://api.day.app/${barkId}/${encodeURIComponent(
  '美团买菜有可用配送时段请尽快下单'
)}?sound=minuet`
let cycle = 10 // 调用频率 （比如 20 秒 1 次）

function checkMultiReserveTime(times) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      request(config['meituanNotice'], function (error, response) {
        if (error) {
          console.log('error:')
          console.log(error)
          reject()
        }

        let res = JSON.parse(response.body)

        if (res.code !== 0) {
          console.log(res)
          console.log('\x1B[31m%s\x1B[0m', `请求失败，${cycle} 秒后将再次尝试`)
          console.log()
          return resolve()
        }

        if (res.data && res.data.cycleType == 2) {
          console.log(res.data.msg)
          console.log('\x1B[36m%s\x1B[0m', `${cycle} 秒后将再次尝试`)
          return resolve()
        }

        if (res.data && res.data.cycleType == 0) {
          console.log('🎉 恭喜 发现可用的配送时段 请尽快下单!')
          child_process.exec(curl)
        }

        resolve()
      })
    }, times)
  })
}

async function loop() {
  while (true) {
    await checkMultiReserveTime(cycle * 1000)
  }
}
child_process.exec(
  `curl https://api.day.app/${barkId}/${encodeURIComponent('美团买菜运力监控中')}?sound=minuet`
)
console.log('正在检查是否有可用配送时段...')

loop()
