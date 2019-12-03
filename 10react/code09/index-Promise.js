const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('resolve 暴露出来的数据')
    resolve({ label: '上海', value: 'adsjfasdlfjaldskfajds' })
    // reject('reject ： 出错了')
  }, 1000)
})

async function fn() {
  try {
    const res = await p
    console.log('Promise 成功的结果为：', res)
  } catch (e) {
    // 此时，说明 Promise 失败了，也就是内部调用了 reject
    // 通过参数 e ，获取到 reject 暴露的内容
    console.log('获取到 reject 暴露的内容：', e)
  }

  // p.then(res => {
  //   console.log('Promise 成功的结果为：', res)
  // })
}

fn()
