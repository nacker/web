// 轮播图功能
(function(){
  new Swiper('.jd_banner', {
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination'
    }
  });
})();

// 京东快报功能
(function(){
  new Swiper('#jd_news', {
    direction: 'vertical',
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
})();

// 倒计时的功能
(function(){
  var timeId;
  function addZero(n) {
    return n < 10 ? '0' + n : n;
  }
  var spans = document.querySelectorAll('.jd_seckill .time span:nth-child(odd)');
 
  function setTime() {
    // console.log(1)
    // 1. 需要两个时间
    var nowTime = new Date();
    // 经验之谈  手机端  safari浏览器时间不识别-
    var seckillTime = new Date('2019/04/19 18:30:00');
    // 位运算符  任何一个小数 | 0  把小数给去了 
    var time = (seckillTime - nowTime) / 1000 | 0;
    if (time <= 0) {
      time = 0;
      clearInterval(timeId);
    }
    var hours = time / 60 / 60 | 0;
    // time/60 分钟
    var minutes = (time / 60 | 0) % 60;
    var seconds = time % 60;
    spans[0].innerText = addZero(hours);
    spans[1].innerText = addZero(minutes);
    spans[2].innerText = addZero(seconds);
  }

  setTime();
  timeId = setInterval(setTime, 1000);
})();


// 秒杀商品功能
(function(){
  var ul = document.querySelector('.seckill_content ul');
  var lis = ul.children;
  // 每个li的宽度 * li的个数
  ul.style.width = lis[0].offsetWidth * lis.length + 'px';
})(); 


// 秒杀的区域滚动
(function(){
  new IScroll('.seckill_content', {
    scrollX: true
  })
})();