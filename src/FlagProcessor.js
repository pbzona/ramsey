const Flag = require('./Flag');
const PriorityController = require('./PriorityController');
const fetch = require('node-fetch');

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
    this.flagList = [];
    this.flagsToShow = 5; // Controls the number of flags to show in time since last evaluated

    this.priorityController = new PriorityController();

    this.getAllFlags = this.getAllFlags.bind(this);
    this.processAllFlags = this.processAllFlags.bind(this);
    this.getAllFlagStatuses = this.getAllFlagStatuses.bind(this);
    this.processAllFlagStatuses = this.processAllFlagStatuses.bind(this);
    this.getAllCodeRefs = this.getAllCodeRefs.bind(this);
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
        let { key, name, creationDate, temporary, tags } = flag;
        let f = new Flag(key, name, new Date(creationDate), temporary, tags);
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
        this.flags[key].lastRequested = new Date(flag.lastRequested);
      }

      this.getAllCodeRefs();
    }
  }

  getAllCodeRefs() {
    const url =
      'https://app.launchdarkly.com/api/v2/code-refs/statistics/support-service';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'LD-API-Version': 'beta',
        Authorization: '',
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        for (let flag in json.flags) {
          this.flags[flag].codeRefs = json.flags[flag][0]['hunkCount'];
        }
      })
      .catch((err) => console.error('error:' + err));

    this.convertFlagList();
  }

  convertFlagList() {
    for (let key in this.flags) {
      this.flagList.push(this.flags[key]);
    }
    this.priorityController.provideFlags(this.flagList);
    this.priorityController.applyRules();
  }

  getFlagList() {
    return this.flagList;
  }
}

module.exports = FlagProcessor;
