var createFuncs = function() {
  var res = [];
  for (var i = 0; i < 5; i++) {
    res[i] = function() {
      console.log(i);
    };
  }
  return res;
};
var res = createFuncs();
res[0](); // 5
res[1](); // 5

/* 方案一 */
/* 返回闭包 */
createFuncs = function() {
  var res = [];
  for (var i = 0; i < 5; i++) {
    res[i] = (function(i) {
      return function() {
        console.log(i);
      };
    })(i);
  }
  return res;
};
res = createFuncs();
res[0](); // 0
res[1](); // 1

/* 方案二 */
/* 把 res[i] = function(){} 放在闭包中 */
createFuncs = function() {
  var res = [];
  for (var i = 0; i < 5; i++) {
    (function(i) {
      res[i] = function() {
        console.log(i);
      };
    })(i);
  }
  return res;
};
res = createFuncs();
res[0](); // 0
res[1](); // 1
