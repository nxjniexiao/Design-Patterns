var tween = {
  /**
   * @param {Number} timeExpended 动画已消耗的时间
   * @param {Number} start 起始位置
   * @param {Number} distance 移动距离
   * @param {Number} duration 动画持续时间
   * @returns {Number} number 动画元素的新位置
   */
  linear: function(timeExpended, start, distance, duration) {
    return (distance * timeExpended) / duration + start;
  },
  easeIn: function(timeExpended, start, distance, duration) {
    return distance * (timeExpended /= duration) * timeExpended + start;
  },
  strongEaseIn: function(timeExpended, start, distance, duration) {
    return distance * (timeExpended /= duration) * timeExpended * timeExpended * timeExpended * timeExpended + start;
  },
  strongEaseOut: function(timeExpended, start, distance, duration) {
    return distance * ((timeExpended = timeExpended / duration - 1) * timeExpended * timeExpended * timeExpended * timeExpended + 1) + start;
  },
  sineaseIn: function(timeExpended, start, distance, duration) {
    return distance * (timeExpended /= duration) * timeExpended * timeExpended + start;
  },
  sineaseOut: function(timeExpended, start, distance, duration) {
    return distance * ((timeExpended = timeExpended / duration - 1) * timeExpended * timeExpended + 1) + start;
  }
};
// module.exports = tween;