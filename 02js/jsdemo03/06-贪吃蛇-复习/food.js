/* 
  属性： width height bgColor x y
  方法： render
*/
function Food(options) {
  options = options || {};
  this.width = options.width || 20;
  this.height = options.height || 20;
  this.bgColor = options.bgColor || 'blue';
  this.x = 0;
  this.y = 0;
}

Food.prototype.render = function(target) {
  // 清除地图中原来的食物
  var old = target.querySelector('div');
  target.querySelector('div') && target.removeChild(old);

  // 1. 创建div
  var div = document.createElement('div');
  // 2. 添加到target
  target.appendChild(div);
  // 3. 设置样式
  div.style.width = this.width + 'px';
  div.style.height = this.height + 'px';
  div.style.position = 'absolute';
  div.style.backgroundColor = this.bgColor;

  this.x = Math.random() * target.offsetWidth / this.width | 0;
  this.y = Math.random() * target.offsetHeight / this.height | 0;

  div.style.left = this.x * this.width + 'px';
  div.style.top = this.y * this.height + 'px';
}


