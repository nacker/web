function animate(element,target,num) {
  // 默认step为50
  num=num ||50;
  // 开启定时器，让盒子不停的在原来的位置的基础上运动一小段距离
  // 进来先清除一下定时器
  clearInterval(element.timeId);
  element.timeId=setInterval(function() {
    // 把元素现在的距离存住
    var current=element.offsetLeft;
    // 如果现在距离比目标距离小 就让num得值为正数 不然为负
    var step=current<target ? num:-num;
    // 动起来
    // 如果现在距离和目标距离之间有一步或一步以上的距离，就走.
    // 如果没有一步的距离就清除定时器效果,直接到目标距离
    if (Math.abs(current-target)>=Math.abs(step)) {
      current+=step;
      element.style.left=current+'px';
    } else {
      clearInterval(element.timeId);
      element.style.left=target+'px'; 
    }
  },16)
}
