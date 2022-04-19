let request = require('request')
let child_process = require('child_process')
let config = require('./config.js')

// barkId 替换成自己的
// 中文有可能乱码
let timeCurl = "curl https://api.day.app/{barkId}/叮咚买菜有可用配送时段请尽快下单?sound=minuet"

function cardCurl(str) {
  return `curl https://api.day.app/{barkId}/叮咚买菜${str}?sound=minuet`
}

function timePromise(time) {
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve()
    }, time)
  })
}

// 返回true表示成功
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
          // 规避新发现的错误码 { success: false, code: -3000, msg: '当前人多拥挤，请稍后尝试刷新页面', data: [] }
          console.log(res)
          if (res.code == '405') {
            console.log('请求失败， 10秒后将再次尝试')
          }
          return resolve(false)
        }

        if (!(res.data && res.data[0] && res.data[0].time[0] && res.data[0].time[0].times)) {
          console.log(res)
          return resolve(false)
        }

        let times = res.data[0].time[0].times

        if (
          times.some(i => {
            return i.fullFlag == false
          })
        ) {
          console.log('🎉 恭喜 发现可用的配送时段 请尽快下单!')
          resolve(true)
        } else {
          console.log('当前无可用配送时段 10秒后再试...')
        }

        resolve(false)
      })
    }, times)
  })
}

function checkCardReserveTime(times) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      request(config['cardConfig'], function (error, response) {
        if (error) {
          console.log(error)
          reject()
        }

        let res = JSON.parse(response.body)

        if (!res.success) {
          if (res.code == '405') {
            console.log(res)
            console.log('请求失败， 10秒后将再次尝试')
          }
          return resolve(false)
        }

        if (!(res.data && res.data.product)) {
          console.log(res)
          return resolve(false)
        }

        let effective = res.data.product.effective
        
        

        if (
          effective && effective.length > 0
        ) {
          console.log('🎉 恭喜 发现有货 请尽快下单!')
          let products = effective[0].products
          const str = products.map(ele => ele.product_name).join()
          child_process.exec(cardCurl(str))
          resolve(true)
          // throw Error('err')
        } else {
          console.log('当前购物车无货 10秒后再试...')
        }

        resolve(false)
      })
    }, times)
  })
}

async function loop() {
  while (true) {
    // 是否有配送时段
    const timeFlag = await checkMultiReserveTime(0)
    if (timeFlag) {
      // 可以不推送
      // child_process.exec(timeCurl)
      const cardFlag = await checkCardReserveTime(0)
    }
    await timePromise(10 * 1000)
  }
}

console.log('正在检查是否有可用配送时段...')
loop()
