## 职责链模式

### 1. 定义

职责链模式的定义是：使多个对象都有机会处理请求，从而避免请求的**发送者**和**接受者**之间的耦合关系：<br>

`Request` --> `A` --> `B` --> `C` --> `D`。

### 2. 面向对象的职责链

#### 2.1 构造函数 Chain

首先定义一个构造函数 `Chain`:
```js
// 构造函数 Chain
// fn 为需要被包装的函数
// nextNode 为链中的下一个节点
var Chain = function(fn) {
  this.fn = fn;
  this.nextNode = null;
};
```
#### 2.2 Chain.prototype

给 Chain 的原型添加方法:
```js
// 指定链中的下一个节点
Chain.prototype.setNextNode = function(nextNode) {
  return (this.nextNode = nextNode); //返回下一个节点
};
// 处理并传递请求
Chain.prototype.handleRequest = function() {
  var ret = this.fn.apply(this, arguments);
  if (ret === "NEXT_NODE") {
    return (
      this.nextNode &&
      this.nextNode.handleRequest.apply(this.nextNode, arguments)
    );
  }
  return ret;
};
```

#### 2.3 异步职责链

给 Chain 的原型添加方法:
```js
// 异步职责链，手动把请求传递给职责链中的下一个节点
Chain.prototype.next = function() {
  return (
    this.nextNode && this.nextNode.handleRequest.apply(this.nextNode, arguments)
  );
};
```
