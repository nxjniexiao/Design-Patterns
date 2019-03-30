## 发布-订阅模式 / 观察者模式

**发布-订阅模式**又叫**观察者模式**，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。<br>

在 JavaScript 开发中，我们一般用**事件模型**来替代传统的发布-订阅模式。

### 1. 现实中的发布-订阅模式

+ 发布者：售楼处
+ 订阅者：想买房的小明、小红等人

售楼处有新房源时，会通过购房者留下的电话把消息发布给有需求的购房者。<br>

模式优点如下：
+ 1) 购房者(**订阅者**)不需要主动给售楼处(**发布者**)打电话；
+ 2) 购房者和售楼处之间没有强耦合在一起：
   + 有新购房者时，留下电话即可；
   + 售楼处的变动，如员工离职，公司搬迁等，只要电话簿在，售楼处便能通知到购房者。

优点说明如下：
+ 1) 发布-订阅模式可以广泛应用于异步编程，来代替传递回调函数的方法，如订阅 ajax 请求的 success、error 等事件；
+ 2) 发布-订阅模式让两个对象松耦合地联系在一起：
   + 有新订阅者时，发布者的代码不需要任何修改；
   + 发布者需要改变时，也不会影响之前的订阅者，只要约定的事件名没有变化。

### 2. 观察者模式（《JS高级程序设计》）

观察者模式由两类对象组成：主体和观察者。
+ **主体负责发布事件**；
+ **观察者通过订阅这些时间来观察该主体**。

观察者模式的一个关键概念：
+ **主体**并不知道**观察者**的任何事情，也就是说它可以独自存在并正常运作，即使观察者不存在；
+ **观察者**知道**主体**，且能注册事件的回调函数(事件处理程序)。

涉及 DOM 元素上时，DOM 元素便是主体，你的事件处理代码便是观察者。

### 3. 实现

发布-订阅模式可以用一个全局的 Event 对象来实现，订阅者不需要了解消息来自哪个发布者，发布者也不知消息会推送给那些订阅者，Event 作为一个类似“中介者”的角色，把订阅者和发布者联系起来。<br>
见如下代码：
```js
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
```