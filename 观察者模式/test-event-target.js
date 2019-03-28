var EventTarget = require('./event-target');

var eventTarget = new EventTarget();

// 添加处理程序
function logMessage1(event) {
  console.log(event.message, ' from logMessage1');
}
function logMessage2(event) {
  console.log(event.message, ' from logMessage2');
}
eventTarget.addHandler('log', logMessage1);
eventTarget.addHandler('log', logMessage2);

// 触发 log 事件
eventTarget.fire({ type: 'log', message: 'log...' });
// log...  from logMessage1
// log...  from logMessage2

// 移除 logMessage1
eventTarget.removeHandler('log', logMessage1);

// 触发 log 事件
eventTarget.fire({ type: 'log', message: 'log...' });
// log...  from logMessage2
