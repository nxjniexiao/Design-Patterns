var createObj = function() {
  return {
    name: "nie"
  };
};
var obj1 = createObj();
var obj2 = createObj();
console.log(obj1 === obj2); // false

/* 单例模式 */
function getSingle(fn) {
  var res;
  return function() {
    return res || (res = fn.apply(this, arguments));
  };
}
var createObjSingle = getSingle(createObj);
var obj3 = createObjSingle();
var obj4 = createObjSingle();
console.log(obj3 === obj4); // true
