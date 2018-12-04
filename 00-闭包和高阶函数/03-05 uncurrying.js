/* uncurrying    泛化 this */
Function.prototype.uncurrying = function() {
  var _self = this;// 获取原函数的引用
  return function() {
    var context = [].shift.apply(arguments);// 获取 arguments 中的第一项
    return _self.apply(context, arguments);
  };
}
/** 另一个实现 */
Function.prototype.uncurryingAnother = function(){
  var _self = this;
  return function() {
    return Function.prototype.call.apply(_self, arguments);
  };
}
// 测试
var push = Array.prototype.push.uncurryingAnother();
var obj = {
  length: 2,
  0: 'a',
  1: 'b'
}
push(obj, 'c', 'd');
console.log(obj);// { '0': 'a', '1': 'b', '2': 'c', '3': 'd', length: 4 }