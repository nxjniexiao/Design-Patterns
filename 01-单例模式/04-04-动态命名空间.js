var nxj = {};
nxj.namespace = function(name) {
  var nameArr = name.split(".");
  var curr = nxj; // 最外层
  for (var i = 0, len = nameArr.length; i < len; i++) {
    if (!curr[nameArr[i]]) {
      curr[nameArr[i]] = {};
    }
    curr = curr[nameArr[i]]; // 深入一层
  }
};
nxj.namespace("a");
nxj.namespace("A");
nxj.namespace("a.b");

console.log(nxj); // { namespace: [Function], a: { b: {} }, A: {} }
