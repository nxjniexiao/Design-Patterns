Function.prototype.after = function(fn) {
  var _self = this;
  return function() {
    var ret = _self.apply(_self, arguments);
    if (ret === 'NEXT_NODE') {
      return fn.apply(_self, arguments);
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