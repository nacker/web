// 属性
// 宽度  高度  headColor bodyColor body direction
// 方法
// render
// move
function Snake(options) {
  options = options || {};
  this.width = options.width || 20;
  this.height = options.height || 20;
  this.headColor = options.headColor || 'green';
  this.bodyColor = options.bodyColor || 'hotpink';
  this.direction = options.direction || 'right';
  this.body = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0}
  ]
}

Snake.prototype.render = function(target) {
  //0. 删除原来的span
  //1. 根据body动态创建span
  //2. 添加到target
  //3. 设置样式 
  var olds = target.querySelectorAll('span');
  for(var i = 0; i < olds.length; i++) {
    target.removeChild(olds[i]);
  }

  for(var i = 0; i < this.body.length; i++) {
    var span = document.createElement('span');
    target.appendChild(span);
    span.style.position = 'absolute';
    span.style.width = this.width + 'px';
    span.style.height = this.height + 'px';
    span.style.backgroundColor = i === 0 ? this.headColor : this.bodyColor;

    span.style.left = this.body[i].x * this.width + 'px';
    span.style.top = this.body[i].y * this.height + 'px';
  }
}

Snake.prototype.move = function(target, food) {
  // 1. 新增一个蛇头， 位置和蛇头一样
  // 2. 根据方向来控制蛇头的位置
  // 3. 把蛇头添加到body中
  // 4. 删除蛇尾
  var head = {
    x: this.body[0].x,
    y: this.body[0].y
  }
  switch(this.direction) {
    case 'left':
      head.x--;
      break;
    case 'up':
      head.y--;
      break;
    case 'right':
      head.x++;
      break;
    case 'down':
      head.y++;
      break;
  }
  this.body.unshift(head);

  // 如果蛇吃食物，需要删除
  if (head.x === food.x && head.y === food.y) {
    // 蛇吃食物
    // 食物重新渲染
    food.render(target);
  } else {
    this.body.pop();
  }
  


  // 蛇的位置发生了改变，需要重新渲染
  this.render(target);
}