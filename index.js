const LD = require('./src/LD');
const FlagStatusTracker = require('./src/FlagStatusTracker');
const Reporter = require('./src/Reporter');
const Table = require('./src/Table');

// Configure the flag tracker
const Tracker = new FlagStatusTracker();

var callback = function (error, data) {
  if (error) {
    console.error(error);
  } else {
    Tracker.processFlags(data);
    Tracker.printReports();
  }
};

LD.FF.getFeatureFlagStatuses(LD.projectKey, LD.environmentKey, callback);

const t = new Table(['col 1', 'col 2']);

t.push(['val a', 'val b']);
t.push(['val a', 'val b']);
t.push(['val a', 'val b']);
const renderedTable = t.render();

const div = document.getElementById('table-div');
div.appendChild(renderedTable);
