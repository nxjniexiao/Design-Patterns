var strategies = {
  isNonEmpty: function(value, msg) {
    if (value.trim() === "") {
      return msg;
    }
  },
  minLength: function(value, minLen, msg) {
    if (value.trim().length < minLen) {
      return msg;
    }
  },
  isPhoneNumber: function(value, msg) {
    if (!/^1[3|5|8][0-9]{9}$/.test(value.trim())) {
      return msg;
    }
  }
};
