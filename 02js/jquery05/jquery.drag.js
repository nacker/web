$.fn.drag = function() {
  // 使用变量把this给存起来
  var that = this;
  that.on('mousedown', function(e) {
    e.preventDefault();
    var x = e.offsetX;
    var y = e.offsetY;

    $(document).on('mousemove', function(e) {
      that.css({
        position: 'absolute',
        left: e.pageX - x,
        top: e.pageY - y
      });
    });
  });

  that.on('mouseup', function() {
    $(document).off('mousemove');
  });

  return that;
};

// js高级
