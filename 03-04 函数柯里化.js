/* 柯里化 */
function currying(fn) {
  var args = [];
  return function() {
    var len = arguments.length;
    if (len) {
      [].push.apply(args, arguments); // arguments不是数组，不能使用 args.push(arguments)
      return arguments.callee;// 指向拥有 arguments 对象的函数
    } else {
      // 不传参数
      return fn.apply(this, args);
    }
  };
}
// 求和
function cost() {
  var totalCost = 0;
  for (var i = 0, len = arguments.length; i < len; i++) {
    totalCost += arguments[i];
  }
  console.log(totalCost);
  return totalCost;
}
cost(100, 200, 300);
var costCurrying = currying(cost);
console.log(costCurrying(100, 200));// 未真正求和
costCurrying(300);// 未真正求和
costCurrying();// 求和 600
costCurrying(400);
costCurrying();// 求和 1000
