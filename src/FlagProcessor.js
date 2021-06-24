const Flag = require('./Flag');

class FlagProcessor {
  constructor(config) {
    this.client = config.client;
    this.project = config.project;
    this.environment = config.environment;

    this.active = 0;
    this.inactive = 0;
    this.launched = 0;
    this.new = 0;

    this.total = 0;

    this.flags = {};
    this.flagsToShow = 5; // Controls the number of flags to show in time since last evaluated

    this.getAllFlags = this.getAllFlags.bind(this);
    this.processAllFlags = this.processAllFlags.bind(this);
    this.getAllFlagStatuses = this.getAllFlagStatuses.bind(this);
    this.processAllFlagStatuses = this.processAllFlagStatuses.bind(this);
  }

  init() {
    this.getAllFlags();
    // this.mergeFlags();
  }

  getAllFlags() {
    const opts = {
      env: [this.environment],
      summary: true,
    };

    this.client.FF.getFeatureFlags(this.project, opts, this.processAllFlags);
  }

  processAllFlags(err, data, response) {
    if (err) {
      console.error(err);
      throw new Error(err);
    } else {
      for (let flag of data.items) {
        let { key, name, creationDate, temporary } = flag;
        let f = new Flag(key, name, creationDate, temporary);
        this.flags[key] = f;
      }
      this.getAllFlagStatuses();
    }
  }

  getAllFlagStatuses() {
    this.client.FF.getFeatureFlagStatuses(
      this.project,
      this.environment,
      this.processAllFlagStatuses
    );
  }

  processAllFlagStatuses(err, data) {
    function getFlagKey(href) {
      return href.split('/').slice(-1).pop();
    }

    if (err) {
      console.error(err);
      throw new Error(err);
    } else {
      for (let flag of data.items) {
        const key = getFlagKey(flag.links.parent.href);
        this.flags[key].status = flag.name;
        this.flags[key].lastRequested = flag.lastRequested;
      }

      console.log(this.flags);
    }
  }
}

module.exports = FlagProcessor;
