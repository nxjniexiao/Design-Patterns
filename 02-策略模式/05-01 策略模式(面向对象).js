/* 策略模式：定义一系列算法，把它们一个个封装起来，并且使他们可以相互替换 */
// 1. 把绩效的计算规则封装在对应的策略类里面
var PerformanceA = function() {};
PerformanceA.prototype.calculate = function(salary) {
  return salary * 2;
};
var PerformanceB = function() {};
PerformanceB.prototype.calculate = function(salary) {
  return salary * 1;
};
// 2. 定义奖金类
var Bonus = function(salary, strategy) {
  this.salary = salary; // 工资
  this.strategy = strategy; // 绩效计算规则
};
Bonus.prototype.setSalary = function(salary) {
  this.salary = salary;
};
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
};
Bonus.prototype.getBonus = function() {
  // 3. 把计算奖金的操作委托给对应的策略类
  return this.strategy.calculate(this.salary);
};
// 测试
var bonus = new Bonus(2000, new PerformanceA());
console.log(bonus.getBonus()); // 4000
bonus.setSalary(2222);
bonus.setStrategy(new PerformanceB());
console.log(bonus.getBonus()); // 2222
