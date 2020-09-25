const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {

  const catEars = /["']\^\^["']/g;
  let catsArr = JSON.stringify(matrix).match(catEars);

  return (catsArr && catsArr.length)
    ? catsArr.length
    : 0;
};
