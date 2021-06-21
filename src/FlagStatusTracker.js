var formatRelative = require('date-fns/formatRelative')
const Flag = require('./Flag');
const Reporter = require('./Reporter');

class FlagStatusTracker {
  constructor() {
    this.active = 0;
    this.inactive = 0;
    this.launched = 0;
    this.new = 0;

    this.total = 0;

    this.flags = []
  }

  processFlags(statusData) {
    const { items } = statusData;
    for (let item of items) {
      // Create a new minimal flag object, easier to work with
      let f = new Flag(
        this.getFlagKey(item.links.parent.href), item.lastRequested, item.name
      );

      // Flag status counter
      this[item.name] += 1;

      // Track all flags for further processing
      this.flags.push(f);
    }
    this.total = items.length;
  }

  printSummary() {
    Reporter.printOverview({
      project: process.env.LD_PROJECT_KEY,
      flags: this.total
    });

    Reporter.printEnvFlagStats({
      new: ['New', this.new, this.getPercent(this.new)],
      active: ['Active', this.active, this.getPercent(this.active)],
      launched: ['Launched', this.launched, this.getPercent(this.launched)],
      inactive: ['Inactive', this.inactive, this.getPercent(this.inactive)]
    });
  }

  printRatios() {
    console.log('FLAG RATIOS:');
    console.log(`Launched to Active: ${(this.launched / this.active).toFixed(2)}`);
    console.log(`Inactive to Active: ${(this.inactive / this.active).toFixed(2)}`);
    this.skipLine()
  }

  printTimeSinceLastRequest(num) {
    const flagsCopy = this.flags.filter(f => f.status !== 'new');
    flagsCopy.sort(this.lastRequestedSort);

    const lastNFlags = flagsCopy.slice(0, num);

    console.log('FLAGS BY TIME SINCE LAST EVALUATION:');
    for (let i of lastNFlags) {
      const timeReadable = i.lastRequested == null ? 'no data' : formatRelative(new Date(i.lastRequested), new Date())
      console.log(`${i.key}\t\t\t${timeReadable}`)
    }
    this.skipLine();
  }

  // Utility methods
  skipLine() {
    console.log('');
  }

  getFlagKey(href) {
    return href.split('/').slice(-1).pop()
  }

  getPercent(flagStat) {
    return `${(flagStat / this.total).toFixed(2) * 100}%`;
  }

  lastRequestedSort(a, b) {
    var x = new Date(a.date);
    var y = new Date(b.date);

    if (x < y) {
        return 1;
    } else if (x === y) {
        return 0;
    } else {
        return -1;
    }
  }
}

module.exports = FlagStatusTracker;