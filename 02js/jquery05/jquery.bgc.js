$.fn.bgc = function(color) {
  // 在$.fn的方法中， this指的就是当前的jquery对象
  this.css('backgroundColor', color);

  return this;
}