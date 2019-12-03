function animate(element, target) {
  // 一进来，清除之前开的定时器
  // 把timeId传给了element的一个属性
  clearInterval(element.timeId);
  element.timeId = setInterval(function() {
    // 当前位置
    var current = element.offsetLeft;
    // 每次的步数
    var step = target > current ? 30 : -30;
    // 能够继续动画的条件， current和target的距离要超过一个step
    if ( Math.abs(current - target) >= Math.abs(step) ) {
      current += step;
      element.style.left = current + 'px';
    } else {
      clearInterval(element.timeId);
      element.style.left = target + 'px';
    }
  }, 16);
}