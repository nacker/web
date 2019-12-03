async function fn() {
  // const res = await Promise.resolve('Promise 666')
  const res = await Promise.resolve({
    label: '北京',
    value: 'adfasdfauoi12u3143'
  })
  console.log('Promise.resolve() 结果为：', res)
}

fn()
