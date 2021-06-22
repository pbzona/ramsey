const LaunchDarklyApi = require('launchdarkly-api');
const Table = require('./src/Table');

// Configure the client
const LDClient = LaunchDarklyApi.ApiClient.instance;
const Token = LDClient.authentications['Token'];
Token.apiKey = '';

// Retrieve configuration options
const projectKey = 'support-service';
const environmentKey = 'pzona';

// Define the object to export
const ffApi = new LaunchDarklyApi.FeatureFlagsApi();

var callback = function (error, data) {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log(data);
    // Tracker.processFlags(data);
    // Tracker.printReports();
  }
};

ffApi.getFeatureFlagStatuses(projectKey, environmentKey, callback);

// ========

const t = new Table(['col 1', 'col 2']);

t.push(['val a', 'val b']);
const renderedTable = t.render();

const div = document.getElementById('table-div');
div.appendChild(renderedTable);
