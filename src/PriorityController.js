const InactiveAndTemporaryRule = require('./rules/InactiveAndTemporary');

class PriorityController {
  constructor() {
    this.flagList = [];
    this.rules = [InactiveAndTemporaryRule];
  }

  provideFlags(flagList) {
    this.flagList = flagList;
  }

  applyRules() {
    const candidates = this.flagList
      .filter((flag) => {
        return flag.status === 'inactive' || flag.status === 'launched';
      })
      .sort((a, b) => b.priority - a.priority);

    console.log(candidates.slice(100, 120));
    // const i = InactiveAndTemporaryRule.evaluate(this.flagList);
    // console.log(i);
  }
}

module.exports = PriorityController;
