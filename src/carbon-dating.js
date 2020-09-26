const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

module.exports = function dateSample(sampleActivity) {

  if (isNaN(parseFloat(sampleActivity))
    || !sampleActivity
    || typeof sampleActivity != "string"
    || sampleActivity <= 0
    || sampleActivity > MODERN_ACTIVITY) return false;

  const k = 0.693 / HALF_LIFE_PERIOD;
  const elapsedTime = Math.ceil(Math.log(MODERN_ACTIVITY / +sampleActivity) / k);

  return elapsedTime;
};
