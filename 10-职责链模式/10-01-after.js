Function.prototype.after = function(fn) {
  var _self = this;
  return function() {
    var ret = _self.apply(this, arguments);
    if (ret === 'NEXT_NODE') {
      return fn.apply(this, arguments);
    }
    return ret;
  }
};
function f1 () {
  console.log('1');
  return 'NEXT_NODE';
}
function f2 () {
  console.log('2');
  return 'NEXT_NODE';
}
function f3 () {
  console.log('3');
}
var fn = f1.after(f2).after(f3);
fn();