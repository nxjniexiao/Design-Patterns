function Singleton(name) {
  this.name = name;
  // this.instance = null; // 错误?? this.instance为实例属性 (不需要)
}
Singleton.prototype.getName = function() {
  console.log(this.name);
  return this.name;
};
/* 第一种 */
// Singleton.getInstance = function(name) {
//   if (!this.instance) {
//     // this.instance 为构造函数的属性
//     this.instance = new Singleton(name);
//   }
//   return this.instance;
// };
/* 第二种 */
Singleton.getInstance = (function() {
  var instance = null;
  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();
var a = Singleton.getInstance("nie1");
var b = Singleton.getInstance("nie2");
console.log(a === b); // true
console.log(a); // { name: 'nie1' }
console.log(b); // { name: 'nie1' }
