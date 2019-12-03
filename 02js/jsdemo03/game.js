function Game(options) {
  options = options || {};
  this.map = options.map;
  this.snake = options.snake || new Snake();
  this.food = options.food || new Food();
  this.timeId = 0;
  // 食物和蛇都没有显示
  this.snake.render(this.map);
  this.food.render(this.map);
}

Game.prototype.start = function() {
  // 开启定时器
  // 因为定时器中的this永远指向window
  var that = this;
  this.timeId = setInterval(function() {
    // 让蛇移动
    that.snake.move(that.map, that.food);

    // 判断蛇头的位置是否超出地图
    var head = that.snake.body[0];
    var maxX = that.map.offsetWidth / that.snake.width;
    var maxY = that.map.offsetHeight / that.snake.height;
    if (head.x < 0 || head.y < 0 || head.x >= maxX || head.y >= maxY) {
      that.stop();
    }
    // 判断蛇头是否撞身体
    // 判断蛇头和蛇身的位置是否重合
    for(var i = 4; i < that.snake.body.length; i++) {
      var temp = that.snake.body[i];
      if (head.x === temp.x && head.y === temp.y) {
        // 蛇头和身体重合了
        that.stop();
      }
    }
  }, 200);

  this.addEvent();
}

Game.prototype.addEvent = function() {
  var that = this;
    // 给document注册keydown事件
  document.onkeydown = function(e) {
    switch(e.keyCode) {
      case 37:
        // 如果当前方向是 right. 就不能改成left
        if (that.snake.direction !== 'right') {
          that.snake.direction = 'left';
        }
        break; 
      case 38:
        if (that.snake.direction !== 'down') {
          that.snake.direction = 'up';
        }
        break; 
      case 39:
        if (that.snake.direction !== 'left') {
          that.snake.direction = 'right';
        }
        break; 
      case 40:
        if (that.snake.direction !== 'up') {
          that.snake.direction = 'down';
        }
        break; 
    }
  }
}


Game.prototype.stop = function() {
  alert('game over');
  clearInterval(this.timeId);
}