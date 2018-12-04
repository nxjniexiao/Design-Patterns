/* 重点：JS 中，函数也是对象 */
var strategies = {
  A: function(salary) {
    return salary * 2;
  },
  B: function(salary) {
    return salary * 1;
  }
};
// 计算奖金函数
function getBonus(salary, level) {
  return strategies[level](salary);
}
// 测试
var bonus = getBonus(2000, "A");
console.log(bonus); // 4000
bonus = getBonus(2222, "B");
console.log(bonus); // 2222
