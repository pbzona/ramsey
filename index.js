require('dotenv').config()
const LD = require('./src/LD');
const FlagStatusTracker = require('./src/FlagStatusTracker');

// Configure the flag tracker
const Tracker = new FlagStatusTracker();

var callback = function(error, data) {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    Tracker.processFlags(data)
    Tracker.printSummary();
    Tracker.printRatios();
    Tracker.printTimeSinceLastRequest(10); //Configure number of results to show here
  }
};

LD.FF.getFeatureFlagStatuses(LD.projectKey, LD.environmentKey, callback);
