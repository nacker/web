function animate(element, target, num) {
  // 默认step为50
  num = num || 50;
  // 开启定时器，让盒子不停的在原来的位置的基础上运动一小段距离
  clearInterval(element.timeId);
  element.timeId = setInterval(function() {
    var current = element.offsetLeft;
    var step = target > current ? num : -num;
    // 跑
    if (Math.abs(current - target) >= Math.abs(step)) {
      current += step;
      element.style.left = current + 'px';
    } else {
      clearInterval(element.timeId);
      element.style.left = target + 'px';
    }
  }, 16);
}