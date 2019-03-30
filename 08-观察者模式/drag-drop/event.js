var Event = (function() {
  var handlers = {},
    addHandler,
    removeHandler,
    fire;

  // 添加事件处理程序
  function addHandler(type, handler) {
    if (!handlers[type]) {
      handlers[type] = [];
    }
    handlers[type].push(handler);
  }

  // 移除事件处理程序
  function removeHandler(type, handler) {
    var handlerArr = handlers[type];
    if (!handlerArr) {
      return;
    }
    for (var i = 0, len = handlerArr.length; i < len; i++) {
      if (handlerArr[i] === handler) {
        handlerArr.splice(i, 1);
        break;
      }
    }
  }

  // 触发事件
  function fire(event) {
    var type = event.type;
    var handlerArr = handlers[type];
    if (handlerArr instanceof Array) {
      for (var i = 0, len = handlerArr.length; i < len; i++) {
        handlerArr[i](event);
      }
    }
  }
  return {
    addHandler: addHandler,
    removeHandler: removeHandler,
    fire: fire
  };
})();

// 测试用
// 添加处理程序
function logMessage1(event) {
  console.log(event.message, " from logMessage1");
}
function logMessage2(event) {
  console.log(event.message, " from logMessage2");
}
Event.addHandler("log", logMessage1);
Event.addHandler("log", logMessage2);

// 触发 log 事件
Event.fire({ type: "log", message: "log..." });
// log...  from logMessage1
// log...  from logMessage2

// 移除 logMessage1
Event.removeHandler("log", logMessage1);

// 触发 log 事件
Event.fire({ type: "log", message: "log..." });
// log...  from logMessage2
