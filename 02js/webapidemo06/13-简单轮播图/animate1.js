function animate(element, target, num) {
  clearInterval(element.timeId);
  element.timeId = setInterval(function(){
    // 原来的位置
    var current = element.offsetLeft;
    // 每次运动的距离
    var step = target > current ? num : -num;
    // 判断条件
    if (Math.abs(current - target) >= Math.abs(step)) {
      current += step;
      element.style.left = current + 'px';
    } else {
      clearInterval(element.timeId);
      element.style.left = target + 'px';
    }
  }, 16);
}