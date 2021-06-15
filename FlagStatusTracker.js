var formatRelative = require('date-fns/formatRelative')
const Flag = require('./Flag');

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
    console.log(`PROJECT: ${process.env.LD_PROJECT_KEY}`);
    console.log(`- Total flags:\t ${this.total}`);
    this.skipLine();
    console.log(`ENVIRONMENT: ${process.env.LD_ENVIRONMENT_KEY}`);
    console.log(`- New:\t\t${this.summarize(this.new)}`);
    console.log(`- Active:\t${this.summarize(this.active)}`);
    console.log(`- Launched:\t${this.summarize(this.launched)}`);
    console.log(`- Inactive:\t${this.summarize(this.inactive)}`);
    this.skipLine()
  }

  summarize(flagStat) {
    const percentage = (flagStat / this.total).toFixed(2) * 100;
    return `${percentage}%\t(${flagStat})`;
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