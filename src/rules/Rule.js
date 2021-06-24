class Rule {
  constructor(fn) {
    this.fn = fn;
  }

  evaluate(flagData) {
    return flagData.filter(this.fn);
  }
}

module.exports = Rule;
