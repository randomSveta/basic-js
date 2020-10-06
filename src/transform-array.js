const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {

  if (!Array.isArray(arr)) throw Error;

  const transformedArray = [...arr];

  const discardNext = "--discard-next"; //--discard-next excludes the next element of the array from the transformed array.
  const discardPrev = "--discard-prev"; // --discard-prev excludes the previous element of the array from the transformed array.
  const doubleNext = "--double-next"; // --double-next doubles the next element of the array in the transformed array.
  const doublePrev = "--double-prev"; // --double-prev doubles the previous element of the array in the transformed array.

  let deletedIndex = -1;

  while (transformedArray.includes(discardPrev)
    || transformedArray.includes(doublePrev)
    || transformedArray.includes(discardNext)
    || transformedArray.includes(doubleNext)) {

    let arrLength = transformedArray.length;

    let sortedIndexes = [
      ["indexDP", transformedArray.indexOf(discardPrev)],
      ["indexDBP", transformedArray.indexOf(doublePrev)],
      ["indexDN", transformedArray.indexOf(discardNext),],
      ["indexDBN", transformedArray.indexOf(doubleNext)]]
      .filter(action => ~action[1])
      .sort((a, b) => a[1] - b[1])

    const actionIndex = sortedIndexes[0];

    transformedArray.splice(actionIndex[1], 1);

    switch (actionIndex[0]) {
      case "indexDP":
        if (deletedIndex !== actionIndex[1]
          && actionIndex[1] !== 0) {
          transformedArray.splice(actionIndex[1] - 1, 1);
          deletedIndex = actionIndex[1] - 1;
        }
        break;
      case "indexDBP":
        if (deletedIndex !== actionIndex[1] && actionIndex[1] !== 0) transformedArray.splice(actionIndex[1] - 1, 0, transformedArray[actionIndex[1] - 1]);
        break;

      case "indexDN":
        if (actionIndex[1] !== arrLength - 1) {
          transformedArray.splice(actionIndex[1], 1);
          deletedIndex = actionIndex[1];
        }
        break;

      case "indexDBN":
        if (actionIndex[1] !== arrLength - 1) transformedArray.splice(actionIndex[1], 0, transformedArray[actionIndex[1]]);
        break;
      default:
        break;
    }
  };
  return transformedArray
}