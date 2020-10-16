//const CustomError = require("../extensions/custom-error");
module.exports = class DepthCalculator {
  calculateDepth(array) {
    let depth = 1;
    let depthArrays = array.filter(element => Array.isArray(element))
    if (depthArrays.length) {
      depthArrays = depthArrays.flat();
      depth += this.calculateDepth(depthArrays);
    }

    return depth;
  }
};

//const depthCalc = new DepthCalculator();

//console.log(depthCalc.calculateDepth([1, 2, 3, [1], 4, 5, [1]])); //2
//console.log(depthCalc.calculateDepth([1, 2, 3, 4, 5, [1, []]])); //3