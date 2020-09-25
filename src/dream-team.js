const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  const letters = [];
  const regExp = /[a-zA-Z]/
  if (Array.isArray(members) && members.length > 0) {
    members.forEach(name => {
      if (name && typeof name == "string") {
        if (regExp.test(name.trim()[0])) {
          letters.push(name.trim()[0].toUpperCase());
        }
      }
    });

  } else {
    return false;
  }

  return letters.sort().join("");
};
