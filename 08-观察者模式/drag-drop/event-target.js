/**
 * EventTarget：管理事件的对象
 */
function EventTarget() {
  // handlers 用于存储事件处理程序
  this.handlers = {};
}
EventTarget.prototype = {
  // 把对象直接赋给 prototype 时，需要手动指定其 constructor 的值
  constructor: EventTarget,

  // 注册指定类型事件(type)的事件处理程序(handler)
  addHandler: function(type, handler) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  },

  // 注销指定类型事件(type)的事件处理程序(handler)
  removeHandler: function(type, handler) {
    var handlerArr = this.handlers[type];
    if (handlerArr instanceof Array) {
      for (var i = 0, len = handlerArr.length; i < len; i++) {
        if (handler === handlerArr[i]) {
          handlerArr.splice(i, 1);
          break;
        }
      }
    }
  },

  // 触发事件
  fire: function(event) {
    // 给 event 对象设置 target 属性
    if (!event.target) {
      event.target = this;
    }
    var type = event.type;
    var handlerArr = this.handlers[type];
    if (handlerArr instanceof Array) {
      for (var i = 0, len = handlerArr.length; i < len; i++) {
        handlerArr[i](event);
      }
    }
  }
};
// module.exports = EventTarget;
