Function.prototype.before = function(beforefn) {
  var _self = this; // 保存原函数的引用
  return function() {
    beforefn.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};
Function.prototype.after = function(afterfn) {
  var _self = this; // 保存原函数的引用
  return function() {
    var res = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return res;
  };
};
function func() {
  console.log("func");
}
function beforefn() {
  console.log("befor func");
}
function afterfn() {
  console.log("after func");
}
var newFunc = func.after(afterfn).before(beforefn);
newFunc();// befor func => func => after func
