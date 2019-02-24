var Express = function() {
  var _middlewares = [];
  return {
    use: use,
    run: run
  };

  function use(fn) {
    _middlewares.push(fn);
  }

  function run() {
    var _self = this;
    var _args = arguments;
    // _middlewares 中的函数从左至右执行，因此使用 reduceRight 从右至左包装函数
    var wrapperedFn = _middlewares.reduceRight(
      function(pre, curr) {
        return function() {
          [].splice.call(_args, 2, 1, pre); // 把 pre 作为 next 传入
          console.log(_args);
          return curr.apply(_self, _args);
        };
      },
      function() {
        console.log("Done!");
        console.log('req = ', _args[0]);
        console.log('res = ', _args[1]);
      }
    );
    return wrapperedFn(arguments);
  }
};

var fn1 = function(req, res, next) {
  console.log("fn1...");
  req.payload = req.payload + '-fn1';
  res.payload = res.payload + '-fn1';
  // next();
  setTimeout(next, 1000);
};
var fn2 = function(req, res, next) {
  console.log("fn2...");
  req.payload = req.payload + '-fn2';
  res.payload = res.payload + '-fn2';
  // next();
  setTimeout(next, 1000);
};
var fn3 = function(req, res, next) {
  console.log("fn3...");
  req.payload = req.payload + '-fn3';
  res.payload = res.payload + '-fn3';
  // next();
  setTimeout(next, 1000);
};
var app = Express();
app.use(fn1);
app.use(fn2);
app.use(fn3);
app.run({payload: 'req'}, {payload: 'res'});
