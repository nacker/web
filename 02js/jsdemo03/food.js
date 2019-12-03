function Food(options) {
  options = options || {};
  this.width = options.width || 20;
  this.height = options.height || 20;
  this.bgColor = options.bgColor || 'blue';
  this.x = options.x || 0;
  this.y = options.y || 0;
}

// target用于指定 食物渲染到那个目标元素内
Food.prototype.render = function(target) {
  // 删除之前的div
  var oldDiv = target.querySelector('div');
  // 如果之前有div，就删除
  oldDiv && target.removeChild(oldDiv);
  
  // 1. 创建一个div
  var div = document.createElement('div');
  // 2. 添加到target中
  target.appendChild(div);
  // 3. 根据食物的属性 给创建的div设置样式
  div.style.width = this.width + 'px';
  div.style.height = this.height + 'px';
  div.style.backgroundColor = this.bgColor;
  
  // 4. 设置食物的位置
  this.x = Math.random() * target.offsetWidth / this.width | 0;
  this.y = Math.random() * target.offsetHeight / this.height | 0;
  
  div.style.position = 'absolute';
  div.style.left = this.x * this.width + 'px';
  div.style.top = this.y * this.height + 'px';
}