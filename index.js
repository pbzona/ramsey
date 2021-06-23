const LD = require('./src/LD');
const FlagStatusTracker = require('./src/FlagStatusTracker');
const Reporter = require('./src/Reporter');
const Table = require('./src/Table');
const populateSummary = require('./src/Summary');

// Configure the flag tracker
const Tracker = new FlagStatusTracker();

var callback = function (error, data) {
  if (error) {
    console.error(error);
  } else {
    Tracker.processFlags(data);

    populateSummary(LD.projectKey, LD.environmentKey, Tracker.total);
    Tracker.printReports();
  }
};

LD.FF.getFeatureFlagStatuses(LD.projectKey, LD.environmentKey, callback);
