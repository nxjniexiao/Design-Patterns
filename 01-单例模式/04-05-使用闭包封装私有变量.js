var user = (function() {
  var _name = "nie";
  var _age = 18;
  return {
    getUserInfo() {
      return `Name: ${_name}, Age: ${_age}`;
    }
  };
})();
console.log(user.getUserInfo()); // Name: nie, Age: 18
