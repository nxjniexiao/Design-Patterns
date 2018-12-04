// Validator 负责接收用户的请求，并委托给 strategy 对象
var Validator = function() {
  this.rules = [];
};
// 增加规则
Validator.prototype.addRule = function(dom, ruleDesc, msg) {
  // 创建闭包
  function ruleAdded() {
    var value = dom.value;
    var args = ruleDesc.split(":");
    var ruleName = args.shift(); // 取出第一项：策略名称 ruleName
    args.unshift(value); // 把 value 插入至 args 数组第一项
    args.push(msg); // 把 msg 追加至 args 数组最后一项
    return strategies[ruleName].apply(dom, args);
    // if (/:/.test(ruleDesc)) {
    //   var descArr = ruleDesc.split(":");
    //   ruleName = descArr[0];
    //   var length = descArr[1];
    //   return strategies[ruleName](value, length, msg);
    // }
    // ruleName = ruleDesc;
    // return strategies[ruleName](value, msg);
  }
  this.rules.push(ruleAdded); // 把闭包放至 rules 数组中
};
// 检查是否满足所有规则
Validator.prototype.check = function() {
  for (var i = 0, len = this.rules.length; i < len; i++) {
    var msg = this.rules[i]();
    if (msg) {
      return msg; // 返回错误信息，结束循环
    }
  }
};
