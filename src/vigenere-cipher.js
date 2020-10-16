//const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(inverted) {
    this.alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
    this.isInverted = (typeof inverted == "undefined" || inverted)
      ? false
      : true;
  }

  createArraysFromMessageAndKey(message, key) {
    let messageArray = [...message.toUpperCase()];
    let repeatTimes = Math.ceil(message.length / key.length);
    let keyArray = [...key.toUpperCase().repeat(repeatTimes)];

    messageArray.forEach((char, index) => {
      if (!/[A-Z]/.test(char)) {
        keyArray.splice(index, 0, char)
      }
    });

    keyArray = keyArray.slice(0, message.length);
    const arrays = { message: messageArray, key: keyArray };

    return arrays;
  }

  encrypt(message, key) {
    if (!arguments || arguments.length !== 2) throw new Error();

    const arrays = this.createArraysFromMessageAndKey(message, key);

    let encryptedArray = arrays.message.map((char, index) => {
      if (/[A-Z]/.test(char)) {
        let firstIndex = this.alphabet.indexOf(char);
        let secondIndex = this.alphabet.indexOf(arrays.key[index]);
        let encryptedIndex = (firstIndex + secondIndex) % 26

        char = this.alphabet[encryptedIndex];
      }
      return char;
    });

    const resultEncryption = this.isInverted
      ? encryptedArray.reverse().join("")
      : encryptedArray.join("");

    return resultEncryption;

  }
  decrypt(encryptedMessage, key) {
    if (!arguments || arguments.length !== 2) throw new Error();

    const arrays = this.createArraysFromMessageAndKey(encryptedMessage, key);

    let decryptedArray = arrays.message.map((char, index) => {
      if (/[A-Z]/.test(char)) {
        let firstIndex = this.alphabet.indexOf(char);
        let secondIndex = this.alphabet.indexOf(arrays.key[index]);
        let decryptedIndex = (firstIndex - secondIndex + 26) % 26

        char = this.alphabet[decryptedIndex];
      }

      return char;
    });
    const decryptionResult = this.isInverted
      ? decryptedArray.reverse().join("")
      : decryptedArray.join("");

    return decryptionResult;
  }
}

module.exports = VigenereCipheringMachine;

