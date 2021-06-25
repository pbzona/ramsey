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
        // Realistically we're not going to recommend an active flag for removal
        return flag.status !== 'active';
      })
      .filter((flag) => {
        // Remove permanent flags - people clearly will not want to clean those up
        return flag.temporary;
      })
      .filter((flag) => {
        // Only include flags that have at least some of the criteria for removal
        return flag.priority > 0;
      })
      .sort((a, b) => b.priority - a.priority);

    console.log(candidates.slice(0, 5));

    // console.log(candidates.slice(100, 120));
    // const i = InactiveAndTemporaryRule.evaluate(this.flagList);
    // console.log(i);
  }
}

module.exports = PriorityController;
