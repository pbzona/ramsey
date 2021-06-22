var formatRelative = require('date-fns/formatRelative');
const Flag = require('./Flag');
const Reporter = require('./Reporter');

class FlagStatusTracker {
  constructor() {
    this.active = 0;
    this.inactive = 0;
    this.launched = 0;
    this.new = 0;

    this.total = 0;

    this.flags = [];
    this.flagsToShow = 5; // Controls the number of flags to show in time since last evaluated
  }

  processFlags(statusData) {
    const { items } = statusData;
    for (let item of items) {
      // Create a new minimal flag object, easier to work with
      let f = new Flag(
        this.getFlagKey(item.links.parent.href),
        item.lastRequested,
        item.name
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
      environment: process.env.LD_ENVIRONMENT_KEY,
      flags: this.total,
    });

    Reporter.printEnvFlagStats({
      new: ['New', this.new, this.getPercent(this.new)],
      active: ['Active', this.active, this.getPercent(this.active)],
      launched: ['Launched', this.launched, this.getPercent(this.launched)],
      inactive: ['Inactive', this.inactive, this.getPercent(this.inactive)],
    });
  }

  printRatios() {
    const launchedToActive = (this.launched / this.active).toFixed(2);
    const inactiveToActive = (this.inactive / this.active).toFixed(2);

    Reporter.printRatios([
      ['Launched to active', launchedToActive],
      ['Inactive to active', inactiveToActive],
    ]);
  }

  printTimeSinceLastRequest(num) {
    const flagsCopy = this.flags.filter((f) => f.status !== 'new');
    flagsCopy.sort(this.lastRequestedSort);

    const lastNFlags = flagsCopy.slice(0, num);
    const lastNFlagsArray = [];

    for (let i of lastNFlags) {
      const timeReadable =
        i.lastRequested == null
          ? 'no data'
          : formatRelative(new Date(i.lastRequested), new Date());
      lastNFlagsArray.push([i.key, timeReadable]);
    }

    Reporter.printLongestSinceEvaluated(lastNFlagsArray);
  }

  printReports() {
    this.printSummary();
    this.printRatios();
    this.printTimeSinceLastRequest(this.flagsToShow);
  }

  // Utility methods
  getFlagKey(href) {
    return href.split('/').slice(-1).pop();
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
