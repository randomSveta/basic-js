const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  let additionalString = '';
  if (options.hasOwnProperty("addition")) {
    additionalString = Array.from({ length: options.additionRepeatTimes || 1 }, () => `${options.addition}`).join(`${options.additionSeparator || "|"}`);
  }

  let finalString = Array.from({ length: options.repeatTimes || 1 }, () => `${str}${additionalString}`).join(`${options.separator || "+"}`);

  return finalString;
};