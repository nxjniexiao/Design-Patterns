var Animate = function(dom) {
  this.dom = dom; // dom 元素
  this.startTime = 0; // 动画开始时间
  this.duration = 0; // 动画持续时间
  this.startPos = 0; // 起始位置
  this.endPos = 0; // 结束位置
  this.propName = null; // CSS 属性名
  this.timeFunc = null; // 缓动函数
};
Animate.prototype.start = function(propName, endPos, duration, timeFunc) {
  this.propName = propName; // CSS 属性名
  this.endPos = endPos; // 结束位置
  this.duration = duration; // 动画持续时间
  this.timeFunc = timeFunc; // 缓动函数
  this.startPos = this.dom.getBoundingClientRect()[propName]; // 起始位置
  var _this = this;
  this.startTime = +new Date(); // 动画开始时间
  this.timer = setInterval(function() {
    if (_this.step() === false) {
      clearInterval(_this.timer);
      _this.timer = null;
    }
  }, 20);
};
Animate.prototype.step = function() {
  var currTime = +new Date();
  var timeSpent = currTime - this.startTime;
  if (timeSpent >= this.duration) {
    this.update(this.endPos); // 修正位置
    return false;
  }
  var newPos = this.timeFunc(
    timeSpent,
    this.startPos,
    this.endPos - this.startPos,
    this.duration
  );
  this.update(newPos); // 更新位置
  // return true; // 可以取消，返回 undefined(undefined !== false)
};
Animate.prototype.update = function(newPos) {
  this.dom.style[this.propName] = `${newPos}px`;
};
// module.exports = Animate;
