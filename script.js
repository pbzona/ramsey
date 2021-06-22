const LaunchDarklyApi = require('launchdarkly-api');

// Configure the client
const LDClient = LaunchDarklyApi.ApiClient.instance;
const Token = LDClient.authentications['Token'];
Token.apiKey = 'api-fec18196-0288-4ddf-a1cc-61047e8cfd7e';

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
