const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chain: [],
  getLength() {
    return this.split("~~").length;
  },
  addLink(value) {
    if (Array.isArray(this.chain)) {
      this.chain.push(`( ${value} )`);
    }
    return this;
  },
  removeLink(position) {
    if (!Number.isInteger(position) || position < 0) {
      this.chain = [];
      throw Error;
    }
    this.chain.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this.chain = this.chain.reverse();
    return this;
  },
  finishChain() {
    const finalChain = this.chain.join("~~");
    this.chain = [];
    return finalChain;
  }
};

module.exports = chainMaker;

//console.log(chainMaker.addLink(function () { }).addLink('2nd').addLink('3rd').removeLink(2).reverseChain().finishChain());
//'( 3rd )~~( function() {} )');