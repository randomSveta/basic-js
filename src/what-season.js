const CustomError = require("../extensions/custom-error");

module.exports = function getSeason(date) {

  if (!date) return "Unable to determine the time of year!";
  if (Object.prototype.toString.call(date) !== "[object Date]") throw Error;
  const seasons = ["winter", "spring", "summer", "autumn (fall)"];

  const month = date.getMonth();

  switch (month) {
    case 11:
    case 0:
    case 1:
      season = seasons[0];
      break;
    case 2:
    case 3:
    case 4:
      season = seasons[1];
      break;
    case 5:
    case 6:
    case 7:
      season = seasons[2];
      break;
    case 8:
    case 9:
    case 10:
      season = seasons[3];
      break;

    default:
      break;
  }

  return season;
};
