function Snake(options) {
  options = options || {};

  // 蛇的关节的宽度
  this.width = options.width || 20;
  // 蛇的关节的高度
  this.height = options.height || 20;
  this.headColor = options.headColor || 'green';
  this.bodyColor = options.bodyColor || 'red';
  // 组成蛇的每一个关节的位置
  this.body = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0}
  ];
  // 蛇还应该有一个方向的属性
  // up right down left
  this.direction = options.direction || 'right';
}

// 给蛇的原型增加一个方法， render
Snake.prototype.render = function(target) {
  //1. 创建若干个节点
  //2. 添加到target
  //3. 根据蛇的属性来设置这些节点的样式 （宽 高 颜色 位置）
  // 删除之前的span
  var spans = target.querySelectorAll('span');
  for(var i = 0; i < spans.length; i++) {
    target.removeChild(spans[i]);
  }
  for(var i = 0; i < this.body.length; i++) {
    var span = document.createElement('span');
    // 添加到target中
    target.appendChild(span);
    // 设置span的大小
    span.style.width = this.width + 'px';
    span.style.height = this.height + 'px';
    span.style.position = 'absolute';

    // 设置span的颜色
    span.style.backgroundColor = i === 0 ? this.headColor : this.bodyColor;

    // 设置span的位置
    span.style.left = this.body[i].x * this.width + 'px';
    span.style.top = this.body[i].y * this.height + 'px';
  }
}

// target: 表示蛇在哪里移动
// food: 蛇要吃的食物
Snake.prototype.move = function(target, food) {
  // 如何移动，取决与蛇的方向
  // 1. 复制一个蛇头，添加到body中
  // 2. 控制复制的这个蛇头的位置
  // 3. 删除掉最后一个位置
  var head = {
    x: this.body[0].x,
    y: this.body[0].y
  };
  switch(this.direction) {
    case 'right':
      // 往右
      head.x++
      break;
    case 'left':
      // 往左
      head.x--;
      break;
    case 'up':
      // 往上
      head.y--;
      break;
    case 'down':
      // 往下
      head.y++;
      break;
  }
  // 增加蛇头
  this.body.unshift(head);
  // 删除蛇尾
  if(head.x === food.x && head.y === food.y) {
    // console.log('吃到了');
    // 重新渲染食物，  食物的位置应该发生改变了
    food.render(target);
  } else {
    this.body.pop();
  }
  // 重新渲染的内容不超出边界
  this.render(target);
}