;(function() {
  function Game(map) {
    this.map = map
    this.snake = new Snake()
    this.food = new Food()
    this.timeId = -1
    this.duration = 100
  }

  var flag = true

  Game.prototype = {
    constructor: Game,
    init: function() {
      this.snake.render(this.map)
      this.food.render(this.map)
      this.addEvent()
    },
    start: function() {
      var snake = this.snake
      var map = this.map
      var food = this.food
      var that = this
      this.timeId = setInterval(function() {
        // 让蛇移动
        snake.move(map, food)

        // 判断撞墙的逻辑
        var head = snake.body[0]
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= map.offsetWidth / snake.width ||
          head.y >= map.offsetHeight / snake.height
        ) {
          // 结束游戏
          that.stop()
        }

        // 判断撞身体的逻辑
        for (var i = 1; i < snake.body.length; i++) {
          if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            that.stop()
          }
        }
      }, this.duration)
    },
    addEvent: function() {
      var snake = this.snake
      var that = this
      document.addEventListener('keydown', function(e) {
        // 必须在事件中去获取方向
        if (flag) {
          flag = false
          var direction = snake.direction
          switch (e.keyCode) {
            case 37:
              if (direction !== 'right') {
                snake.direction = 'left'
              }
              break
            case 38:
              if (direction !== 'down') {
                snake.direction = 'up'
              }
              break
            case 39:
              if (direction !== 'left') {
                snake.direction = 'right'
              }
              break
            case 40:
              if (direction !== 'up') {
                snake.direction = 'down'
              }
              break
          }

          setTimeout(function() {
            flag = true
          }, that.duration)
        }
      })
    },
    stop: function() {
      alert('game over!!!')
      clearInterval(this.timeId)
    },
    extend: function() {}
  }

  window.Game = Game
})()
