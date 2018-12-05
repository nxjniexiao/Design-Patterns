// Validator 负责接收用户的请求，并委托给 strategy 对象
var Validator = function() {
  this.rules = [];
};
// 增加规则
Validator.prototype.addRule = function(dom, rulesDescArr) {
  /**
   * @param {Object} dom dom 对象
   * @param {Array} rulesDescArr 规则数组，如：
   * [
        {strategy:'isNonEmpty', msg:'用户名不能为空！'}, 
        {strategy:'minLength:6', msg:'用户名长度不能少于6位！'}
      ]
   */
  // 创建闭包，注意闭包和变量的坑。解决方法：
  // 1. 用立即执行的匿名函数包裹循环体；
  // 2. for 循环体中使用 let/const 定义变量(ES6)。
  var _this = this;
  for (var i = 0, len = rulesDescArr.length; i < len; i++) {
    (function(ruleDesc) {
      var strategy = ruleDesc.strategy;
      var msg = ruleDesc.msg;
      // 把闭包放至 rules 数组中
      _this.rules.push(function() {
        var value = dom.value;
        var args = strategy.split(":");
        var strategyName = args.shift(); // 取出第一项：策略名称 strategyName
        args.unshift(value); // 把 value 插入至 args 数组第一项
        args.push(msg); // 把 msg 追加至 args 数组最后一项
        return strategies[strategyName].apply(dom, args);
      });
    })(rulesDescArr[i]);
  }
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
