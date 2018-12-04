Function.prototype.myBind = function() {
  var self = this;// 保存原函数
  var context = [].shift.apply(arguments);// 取出 arguments 中的第一项（会改变arguments）
  var args = [].slice.apply(arguments);// 把类数组 arguments 转成数组
  // 返回一个闭包
  return function(){
    return self.apply(context, [].concat.apply(args, arguments));// concat:合并前后两次传入的arguments
  }
}
var obj = {
  name: 'nie'
}
function func (a,b,c,d){
  console.log(this.name);
  console.log([a,b,c,d]);
}
var func1 = func.myBind(obj, 1, 2);
func1(3, 4);// nie [ 1, 2, 3, 4 ]